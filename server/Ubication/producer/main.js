"use strict";
/* IMPORTS */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");
const { json } = require("body-parser");

//-------------------------------------------

/* CONFIGS */
//server.server();
const app = express();
dotenv.config();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

var value = null
var port = process.env.PORT || 3000;
var host = process.env.PORT || '0.0.0.0';
///////////////////////////////////////////////////////////////

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/ubication", (req, res) => {
  (async () => {
      const producer = kafka.producer();

      await producer.connect();
      const { patente,ubicacion } = req.body;
      var denuncia = Math.floor(Math.random()*2)
      var time = Math.floor(new Date() / 1000);

      let ubication = {
        patente:patente,
        ubicacion: ubicacion,
        denuncia: denuncia,
        time: time
      }

      //value = JSON.stringify(ubication)
      if(ubication["denuncia"] == 1){
        console.log("Este carrito ha sido denunciado, es profugo")

         const topicMessages = [{
            topic: 'ubication',
            partition:1,
            messages:[{value:JSON.stringify(ubication),partition: 1}]
          },
        ]
        await producer.sendBatch({topicMessages})
        console.log("Envie", JSON.stringify(ubication))
      }else{
        console.log("Carrito Limpio.")

         const topicMessages = [
         {
          topic: 'ubication',
          partition:0,
          messages:[{value:JSON.stringify(ubication),partition: 0}]
         },
         //{
         //  topic: "ubication",
         //  messages: [{value: JSON.stringify(ubication)}]
         //}
       ]
       await producer.sendBatch({topicMessages})
       console.log("Envie", ubication)
     }
     await producer.disconnect();
     res.json(ubication);
    })();
  });
      ///////////////////////////////////////////////////////////////  

/* PORTS */

app.listen(port,host, () => {
  console.log(`API run in: http://localhost:${port}.`);
});
