<em> Tarea 2-SD </em>
  <p align="left">
   <img src="https://img.shields.io/badge/STATUS-TERMINADO-blue">  <img src="https://img.shields.io/badge/LICENSE-FREE-green">
   </p>
   
<h1 align='center'>Tarea 2 <h1>
  <h3> Integrantes: Abel Baulloza y Diego Carrillo .</h3>
  <h3>**Instrucciones y uso**</h3>

📁 Acceso al proyecto

**Descargar el archivo desde el repositorio de github o hacer un clone mediante consola de comandos.**

🛠️ Abre y ejecuta el proyecto.
  
**Antes de trabajar, es necesario estar dentro de la carpeta instalada.**
**Luego de estar en el fichero se debe ejecutar el archivo docker-compose**

```
  $sudo docker-compose up --build
```

<p>Ejecutado y levantados todos los servicios creados en el docker-compose se puede ya realizar las peticiones al servidor.</p>
  
<p>Para realizar una peticion para el ingreso de un nuevo miembro al gremio se debe ejecutar la siguiente peticion POST.</p>
  
```
  http://localhost:3000/new_member
  
  Agregando el siguiente json en el body de la peticion.
  {
    "name": "abel",
    "lastname": "baulloza almeida",
    "dni": "20.245.835-1",
    "mail": "abel.baulloza@mail.udp.cl",
    "patente": "CGZY30",
    "premium": 0  ## 0 para posible miembro no premium y 1 para un posible miembro premium
  }
  
```
<p>Para revisar la lista de miembros premium aceptados en el gremio se debe realizar la siguiente peticion get al servidor.</p>
  
```
  http://localhost:8000/listmemberpre
  
```
  
<p>Para revisar la lista de miembros no premium aceptados en el gremio se debe realizar la siguiente peticion get al servidor.</p>
  
```
  http://localhost:8000/listmembernopre
  
```
  
<p>Para realizar una peticion para el registro de una venta asociada a un carrito se debe ejecutar la siguiente peticion POST.</p>
  
```
  http://localhost:3001/sales

  Agregar el siguiente json en el body de la peticion
  {
    "client": "abel",
    "count_sopaipillas": 3,
    "hora": "14:45",
    "stock": 5,
    "ubicacion": "2,1",
    "patente_carro": "CGZY30"
  }
  
```
  
<p>Para obtener las ventas totales, clientes totales y promedio de ventas a cada cliente por cada carrito se debe ejecutar la siguiente peticion GET.</p>
  
```
  http://localhost:8001/ventadiaria
  
```


<p>Para realizar una peticion para la posible denuncia de un carrito se debe ejecutar la siguiente peticion POST.</p>
  
```
  http://localhost:3003/ubication

  Agregar el siguiente json en el body de al peticion
  {
    "patente":"CGZY30",
    "ubicacion": "1,1"
  }
  
```
  
  
## Autores

| [<img src="https://www.geekmi.news/__export/1644190196029/sites/debate/img/2022/02/06/zenitsu4.jpg_172596871.jpg" width=115><br><sub>Abel Baulloza</sub>](https://github.com/Dharknight) |  [<img src="https://www.unotv.com/uploads/2020/08/loco-valdes.jpg" width=115><br><sub>Diego Carrillo</sub>](https://github.com/Carro1331) |
| :---: | :---: |
