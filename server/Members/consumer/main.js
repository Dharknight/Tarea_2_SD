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

const main = async () => {
  const consumer = kafka.consumer({ groupId: "members" });
  console.log("Entra main")
  await consumer.connect();
  await consumer.subscribe({ topic: "members", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      //value = message.value
      console.log(partition)
      if(partition == 1)
      {
      var miembro = JSON.parse(message.value.toString());
      console.log(miembro)
      console.log("PARTICION:", partition)
      }
      else if(partition == 0)
      {
        console.log("PARTICION:", partition)
        var miembro = JSON.parse(message.value.toString());
        console.log(miembro)
      }
    },
  })
}
app.listen(port,host,()=>{
  console.log(`Registro de miembros in: http://localhost:${port}.`)
  main()
});