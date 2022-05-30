const { Router } = require('express');
const router = Router();
const Usuario = require('../models/Usuario');

//crear nuevo usuario
//req = por medio del cual se envian los parametros
//res = por medio del cual se recibe la información


//CREAR

//async = le dice al servidor que espere hasta que se tenga la respuesta
router.post('/',async function(req, res){

try {
  console.log('Objeto recibido', req.body);

//findOne =permite buscar un dato en especifico en una lista

const existeUsuario = await Usuario.findOne({email: req.body.email});
console.log
if (existeUsuario){
  return res.send('El Email ya existe');
};


  
  let usuario = new Usuario();
  usuario.nombre = req.body.nombre;
  usuario.email = req.body.email;
  usuario.estado = req.body.estado;
  usuario.fechaCreacion = new Date();
  usuario.fechaActualizacion = new Date();


  //await = esperar la respuesta
  usuario = await usuario.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(usuario);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos el usuario');
}

  
});

//*********RECUPERA DATOS O LISTAR DATOS ***************************
router.get('/',async function(req, res){
  try {
    const usuarios = await Usuario.find();
    res.send(usuarios);
  } catch (error) {
    console.log(error);
    res.send('Ocurrio un error listando usuarios');
  }
});


//********************************ACTUALIZA**************************
router.put('/:usuarioId',async function(req, res){

try {

  //req.params = toma el valor de usuario que estan enviando del front
  console.log('Objeto recibido', req.body, req.params);


  let usuario = await Usuario.findById(req.params.usuarioId);

  if (!usuario){
    return res.send('Usuario no existe');
  }
//findOne =permite buscar un dato en especifico en una lista

const existeUsuario = await Usuario
                            .findOne({email: req.body.email, _id: { $ne: usuario.id}});
console.log
if (existeUsuario){
  return res.send('El Email ya existe');
};

usuario.email = req.body.email;
usuario.nombre = req.body.nombre;
usuario.estado = req.body.estado;
usuario.fechaActualizacion = new Date();
  


  //await = esperar la respuesta
  usuario = await usuario.save();
  // lo que hace este res es enviar al front todos los datos que se generan a traves de guardar usuario
  res.send(usuario);
} catch (error) {
  console.log(error);
  res.send('Ocurrio un error guardando la base de datos al actualizar Usuario');
}

  
});



module.exports = router;
