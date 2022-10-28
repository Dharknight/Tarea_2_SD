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
var cpremium = [];
var cpnopremium = [];
var value = null;

var kafka = new Kafka({
  clientId: "my-app",
  brokers: ["kafka:9092"],
});
3
app.post("/new_member", (req, res) => {
  (async () => {
      const producer = kafka.producer();
      //const admin = kafka.admin();
      await producer.connect();
      const { name, lastname, dni, mail, patente, premium } = req.body;
      let member = {
        name: name,
        lastname: lastname,
        dni: dni,
        mail: mail,
        patente: patente,
        premium: premium,
      }
      value = JSON.stringify(member);
      if(member["premium"] == 1){
        cpremium.push(value);
        const topicMessages = [
          {
            // Stock debe estar leyendo constantes consultas
            topic: 'members',
            partition : 1,
            messages: [{value: JSON.stringify(member), partition: 1}]
          },
          //{
          //  topic:"members",
          //  messages:[{value:JSON.stringify(member)}]
          //}  
        ]
          await producer.sendBatch({ topicMessages })
        }else{
          cpnopremium.push(value);
          const topicMessages = [
            {
              // Stock debe estar leyendo constantes consultas
              topic: 'members',
              messages: [{value: JSON.stringify(member), partition: 0}]
            },
            /*{
                // Stock debe estar leyendo constantes consultas
                topic: 'stock',
                messages: [{value: JSON.stringify(member)}]
            }*/
          ]
          await producer.sendBatch({ topicMessages })
        }
  
        await producer.disconnect();
  
        res.json("Agregado");
  
        console.log("Miembro registrado");
        console.log("Miembros Normales:" ,cpnopremium.length)
        console.log("Miembros Premium:" , cpremium.length)
        if(cpnopremium != null )
        {
          console.log("Listado Clientes premium:")
          console.log(cpremium)
        }
        if(cpnopremium != null )
        {
          console.log("Listado de clientes No Premium:")
          console.log(cpnopremium)
        }
        
      })();
  
  });
  
  /* PORTS */
  
  app.listen(port,host, () => {
    console.log(`API run in: http://localhost:${port}.`);
  });
