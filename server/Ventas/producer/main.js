"use strict";
/* IMPORTS */
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { Kafka } = require("kafkajs");

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

var port = process.env.PORT || 3000;
var host = process.env.PORT || '0.0.0.0';
///////////////////////////////////////////////////////////////

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});

app.post("/sales", (req, res) => {
  console.log("sales");
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const { client, count_sopaipillas, hora, stock, ubicacion, patente_carro } = req.body;

      let sale = {
        client: client,
        count_sopaipillas: count_sopaipillas,
        hora: hora,
        stock: stock,
        ubicacion: ubicacion,
        patente_carro:patente_carro
      }
      
      console.log("Este carrito ha sido denunciado, es profugo")

      const topicMessages = [
        {
          // Stock debe estar leyendo constantes consultas
          topic: 'sales',
          messages: [{value: JSON.stringify(sale)}]
        },
        {
          // Stock debe estar leyendo constantes consultas
          topic: 'stock',
          messages: [{value: JSON.stringify(sale)}]
        }
      ]
      await producer.sendBatch({topicMessages})
      console.log("Envie", JSON.stringify(sale))

      await producer.disconnect();
      //await admin.disconnect();
      res.json(sale);
      console.log('Venta registrada')
  })();
});



  ///////////////////////////////////////////////////////////////  


app.get("/", (req, res) => {
  res.send("ola api");
});


/* PORTS */

app.listen(port,host, () => {
  console.log(`API run in: http://localhost:${port}.`);
});
