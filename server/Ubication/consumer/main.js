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
var json = {}
var stock = []

app.post("/ubication",(req,res) => {
  const main = async () => {
    const consumer = kafka.consumer({ groupId: "ubication" });
    console.log("Entra Ubication")
    await consumer.connect();
    await consumer.subscribe({ topic: "ubication", fromBeginning: true });
  
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        //value = message.value
        if(partition == 0){
          console.log("Este carrito no fue denunciado")
          console.log(value) 
        }
        else if(partition == 1)
        {
          console.log("Este carrito fue denunciado, ES PROFUGO ATRAPENLOC CTMRE")
          console.log(value)
        }
        else
        {
          console.log("Estoy en la shit.")
        }
      },
    })
  }
});

app.listen(port,host,()=>{
    console.log(`API-Blocked run in: http://localhost:${port}.`)
    main()
});