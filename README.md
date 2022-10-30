# SD-Homeworks2
## Integrantes: Abel Baulloza y Diego Carrillo .
**Instrucciones y uso**

Para realizar una peticion para el ingreso de un nuevo miembro al gremio se debe ejecutar la siguiente peticion POST.
http://localhost:3000/new_member

Agregando el sigueinte json en el body de la peticion.
{
  "name": "abel",
  "lastname": "baulloza almeida",
  "dni": "20.245.835-1",
  "mail": "abel.baulloza@mail.udp.cl",
  "patente": "CGZY30",
  "premium": 0  ## 0 para posible miembro no premium y 1 para un posible miembro premium
}

Para realizar una peticion para el registro de una venta asociada a un carrito se debe ejecutar la sigueinte peticion POST.
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

Para realizar una peticion para la posible denuncia de un carrito se debe ejecutar la sigueinte peticion POST.
http://localhost:3003/ubication

Agregar el siguiente json en el body de al peticion
{
  "patente":"CGZY30",
  "ubicacion": "1,1"
}
