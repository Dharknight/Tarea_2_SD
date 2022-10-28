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

const consumer = kafka.consumer({ groupId: "group-sales" });


//kafka
/*var consumer = new Kafka.KafkaConsumer({
'group.id': 'kafka',
'metadata.broker.list': 'elkafka:9092',
}, {});

consumer.connect();
consumer.on('ready', () => {
    console.log('consumer ready..')
    consumer.subscribe(['test']);
    consumer.consume();
  }).on('data', function(data) {
    console.log(`received message: ${eventType.fromBuffer(data.value)}`);
  });
global.consumer = consumer;*/
/* VARIABLES */

//app.use(require('./api/find'))

/*app.get('/', (req, res) => {
  res.send('sale list')
  main();
})*/

var value = null
var json = {}
var algo = {};
var stock = [];
var ventas_total_por_patente = []
var patentes = []
var clientes = []
var cliente_y_patente = []
var clientes_total_por_patente = []
var promedio_ventas_a_cliente = []

const main = async () => {
  console.log("Entra sale")
  await consumer.connect()
  await consumer.subscribe({ topic: "sales", fromBeginning: true });

  console.log("producer");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      value = message.value
      console.log({
        value: message.value.toString(),
      })  
      json = JSON.parse(value)

      //VENTAS TOTALES DE SOPAIPILLAS POR CARRITO
      if(ventas_total_por_patente.length == 0){
        var info = {
          patente:json.patente_carro,
          count_sopaipillas:json.count_sopaipillas
        }
        ventas_total_por_patente.push(info)
      }
      for(var i in ventas_total_por_patente){
        var info2 = {
          patente:json.patente_carro,
          count_sopaipillas:json.count_sopaipillas
        }
        if(ventas_total_por_patente[i].patente == json.patente_carro){
          ventas_total_por_patente[i].count_sopaipillas = ventas_total_por_patente[i].count_sopaipillas + json.count_sopaipillas
        }else{
          ventas_total_por_patente.push(info2)
        }
      }

      //PROMEDIO DE VENTAS DE CADA CARRITO POR CLIENTE
      if(clientes.length == 0){
        var info3 = {
          patente:json.patente_carro,
          client:json.client,
          count_sopaipillas:json.count_sopaipillas
        }
        promedio_ventas_a_cliente.push(info3)
      }
      for(var j in promedio_ventas_a_cliente){
        if(promedio_ventas_a_cliente[i].patente == info3.patente && promedio_ventas_a_cliente[i].client == info3.client){

        }else if(promedio_ventas_a_cliente[i].patente == info3.patente && promedio_ventas_a_cliente[i].client != info3.client){

        }else if(promedio_ventas_a_cliente[i].patente != info3.patente && promedio_ventas_a_cliente[i].client == info3.client){

        }
      }

      //CLIENTES TOTALES POR CARRITO

      if(clientes_total_por_patente.length == 0){
        var info4 = {
          patente:json.patente_carro,
          count_client: 1
        }
        clientes.push(json.client)
        clientes_total_por_patente.push(info4)
      }
      for(var k in clientes_total_por_patente){
        var info5 = {
          patente: json.patente_carro,
          client: json.client
        }
        if(clientes_total_por_patente[k].patente == json.patente_carro){
          if(cliente_y_patente[k].client != json.client){
              clientes_total_por_patente[k].count_client++
          }
        }else{
          clientes_total_por_patente.push(info4)
          cliente_y_patente.push(info5)
        }
      }
      
      /*else if(clientes_total_carro[json["patente_carro"]].includes(json["client"])){
        clientes_total_carro[json["client"]] = clientes_total_carro[json["client"]] + 1
        
      }*/

      //console.log(`Clientes totales: ${clientes_total_carro[patente]}`)
      //console.log(`Ventas totales: ${ventas_total_carro[patente]}`)

    },
  })
  .catch(console.error)
};

//asdlaskdj
app.get('/ventadiaria', (req, res) => {
  console.log('Ventas totales por cada carrito')
  console.log(ventas_total_por_patente)
  console.log('Clientes totales por cada carrito')
  console.log(clientes_total_por_patente)
  //console.log(`Promedio de ventas a clientes: ${lasalkslas}`)
  //res.send(ventas_total_por_patente)
  //res.send(clientes_total_por_patente)
  //res.send(snajskajs)
})
/* PORTS */

app.listen(port,host,()=>{
    console.log(`API-Blocked run in: http://localhost:${port}.`)
    main()
});