const { Router } = require('express');
const router = Router();
const TipoEquipo = require('../models/TipoEquipo');

//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información


//*************CREAR****************

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('Tipo Equipo recibida', req.body);


  
  let tipoEquipo = new TipoEquipo();
  tipoEquipo.nombre = req.body.nombre;
  tipoEquipo.estado = req.body.estado;
  tipoEquipo.fechaCreacion = new Date();
  tipoEquipo.fechaActualizacion = new Date();


  //await = esperar la respuesta
  tipoEquipo = await tipoEquipo.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(tipoEquipo);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando en la base el tipo de equipo');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){
  try {
    const tipoEquipo = await TipoEquipo.find();
    res.send(tipoEquipo);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando tipoEquipo');
  }
});


//********************************ACTUALIZA**************************
router.put('/:tipoEquipoId',async function(req, res){

try {

  //req.params = toma el valor de usuario que estan enviando del front
  console.log('tipoEquipo recibida', req.body, req.params);


  let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);

  if (!tipoEquipo){
    return res.send('tipoEquipo no existe');
  }
//findOne =permite buscar un dato en especifico en una lista

  tipoEquipo.nombre = req.body.nombre;
  tipoEquipo.estado = req.body.estado;
  tipoEquipo.fechaActualizacion = new Date();

  //await = esperar la respuesta
  tipoEquipo = await tipoEquipo.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(tipoEquipo);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos al actualizar tipoEquipo');
}

  
});



module.exports = router;