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
var ventas_total_carro = new Array()
var clientes_total_carro = new Array()
var clientes_numero_carro = []

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

      const patente = json["patente_carro"]
      const client = json["client"]
      const count = json.count_sopaipillas

      if(ventas_total_carro.includes(json.patente_carro)){
        ventas_total_carro[patente] = ventas_total_carro[patente] + 1

      }else if(!clientes_total_carro.includes(json.client)){
        clientes_total_carro.push(patente)
        clientes_total_carro[patente] = clientes_total_carro[patente] + 1

      }else if(!ventas_total_carro.includes(json.patente_carro)){
        ventas_total_carro.push(patente)
        ventas_total_carro[patente] = 1
      }
      
      /*else if(clientes_total_carro[json["patente_carro"]].includes(json["client"])){
        clientes_total_carro[json["client"]] = clientes_total_carro[json["client"]] + 1
        
      }*/

      console.log(`Ventas totales: ${ventas_total_carro[patente]}`)
      console.log(`Clientes totales: ${clientes_total_carro[patente]}`)

    },
  })
  .catch(console.error)
};

//asdlaskdj
app.get('/ventadiaria', (req, res) => {
  console.log(`Ventas totales: ${ventas_total_carro}`)
  console.log(`Clientes totales: ${clientes_total_carro}`)
  res.send(ventas_total_carro)
  res.send(clientes_total_carro)
})
/* PORTS */

app.listen(port,host,()=>{
    console.log(`API-Blocked run in: http://localhost:${port}.`)
    main()
});