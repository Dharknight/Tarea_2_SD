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
var carritos_patente_noprofugos = []
var carritos_patente_profugos = []

const main = async () => {
  const consumer = kafka.consumer({ groupId: "ubication" });
  console.log("Entra Ubication")
  await consumer.connect();
  await consumer.subscribe({ topic: "ubication", fromBeginning: true });
  console.log("EL SIGUIENTE ES EL MESSAGE")
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("CONDICIONES SIGUIENTES")

      if(partition == 0){
        var algo = JSON.parse(message.value.toString());
        var info = {
          patente:algo.patente_carro,
          ubicacion: algo.ubicacion,
          time: algo.time
        }

        console.log("Este carrito no fue denunciado")
        //console.log(algo)
        if(carritos_patente_noprofugos.length == 0){
          carritos_patente_noprofugos.push(info)
        }
        for(var i in carritos_patente_noprofugos){
          if(carritos_patente_noprofugos[i].patente == info.patente){
            if((info.time - carritos_patente_noprofugos[i].time) > 60){
              console.log(`Carrito con patente ${carritos_patente_noprofugos[i].patente} desapareció`)
              carritos_patente_noprofugos.splice(i,1)
            }else{
              carritos_patente_noprofugos[i].ubicacion = info.ubicacion
              console.log(`Carrito con patente ${carritos_patente_noprofugos[i].patente} está en la ubicacion ${carritos_patente_noprofugos[i].ubicacion}`)
              carritos_patente_noprofugos[i].time = info.time 
            }
          }else{
            carritos_patente_noprofugos.push(info)
            console.log(`Carrito con patente ${carritos_patente_noprofugos[i].patente} está en la ubicacion ${carritos_patente_noprofugos[i].ubicacion}`)
          }
        }
        console.log(carritos_patente_noprofugos)
      }
      else if(partition == 1)
      {
        var algo = JSON.parse(message.value.toString());
        var info2 = {
          patente: algo.patente,
          ubicacion: algo.ubicacion
        }
        console.log("Este carrito fue denunciado, ES PROFUGO ATRAPENLOC CTMRE")
          //console.log(algo)
          if(carritos_patente_profugos.length == 0){
            carritos_patente_profugos.push(info2)
          }
          for(var i in carritos_patente_profugos){
            if(carritos_patente_profugos[i].patente == info2.patente){
              console.log(carritos_patente_profugos)
            }else{
              carritos_patente_profugos.push(info2)
              console.log('Carritos prófugos')
              console.log(carritos_patente_profugos)
              break;
            }
          }
      }
    },
  })
  console.log("Sali del Mesagge")
}


app.listen(port,host,()=>{
  console.log(`Registro de miembros in: http://localhost:${port}.`)
  main()
});