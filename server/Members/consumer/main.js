'use strict';
/* IMPORTS */
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const { Kafka } = require("kafkajs");

//-------------------------------------------

/* CONFIGS */
//server.server();
const app = express()
dotenv.config()
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())
app.use(cors())

var port = process.env.PORT || 8000;
var host = process.env.PORT || '0.0.0.0';

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

var value = null
var members = [];
var entra = 0;
var miembros_premium = []
var miembros_nopremium = []
const main = async () => {
  const consumer = kafka.consumer({ groupId: "members" });
  console.log("Entra main")
  await consumer.connect();
  await consumer.subscribe({ topic: "members", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      entra = Math.floor(Math.random()*7)
      console.log(entra)
      console.log(partition)
      var miembro = JSON.parse(message.value.toString());
      if(partition == 1)
      {
        if(entra < 4){
          console.log('Miembro premium validado')
          console.log(miembro)
          miembros_premium.push(miembro)
        }else{
          console.log('Miembro premium no validado')
          console.log(miembro)
        }
      }
      else if(partition == 0)
      {
        if(entra < 5){
          console.log('Miembro no premium validado')
          console.log(miembro)
          console.log("PARTICION:", partition)
          miembros_nopremium.push(miembro)
        }else{
          console.log('Miembro no premium no validado')
          console.log(miembro)
        }
      }
    },
  })
}

app.get('/listmemberpre', (req,res) => {
  console.log(miembros_premium)
  res.json(miembros_premium)
})

app.get('/listmembernopre', (req,res) => {
  console.log(miembros_nopremium)
  res.json(miembros_nopremium)
})

app.listen(port,host,()=>{
  console.log(`Registro de miembros in: http://localhost:${port}.`)
  main()
});