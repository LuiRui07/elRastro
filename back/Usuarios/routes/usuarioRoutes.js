const express = require("express");
const router = express.Router();
const axios = require("axios");
const usuariosSchema = require("../models/usuarios.js");
const usuarios = require("../models/usuarios.js");
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create, comprobado con Postman 
router.post("/", (req, res) => {
  const user = usuariosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all, comprobado con Postman
router.get("/", (req, res) => {
  usuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete, comprobado con Postman 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update, comprobado con Postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreCompleto, direccion} = req.body;
  usuariosSchema
    .updateOne({ _id: id }, { $set: { nombreCompleto, direccion} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//LLAMADAS INTERNAS-------------------------------------------------------------------------------
// get por parte de nombre, comprobado con Postman
router.get("/nombre/:nombre", (req, res) => {
  const { nombre } = req.params;
  usuariosSchema
    .find({ nombreCompleto: { $regex: nombre, $options: "i" } })
    .then((data) => 
    {
      if (data.length === 0) {
        return res.json({ message: "No se ha encontrado ningún usuario con ese nombre." });
      }
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

// get por direccion, comprobado con Postman
router.get("/direccion/:direccion", (req, res) => {
  const { direccion } = req.params;

  usuariosSchema
    .find({ direccion: { $regex: direccion, $options: "i" } })
    .then((data) => {
      if (data.length === 0) {
        return res.json({ message: "No se ha encontrado ningún usuario con esa direccion." });
      }
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//LLAMADAS EXTERNAS-------------------------------------------------------------------------------

//get compradores de un articulo con indentificador x, REVISAR
router.get("/compradores/:productoId", (req, res) => {
  const { productoId } = req.params;
  axios.get('http://localhost:5001/productos/' + productoId)
  .then((response) => {
    const {data} = response;
    const {message} = data;
    if(data.length === 0){
      return res.json({message: 'No se ha encontrado ningún producto con ese id.'})
    }else if(data.length > 1){
      return res.json({message: 'Hay más de un producto con ese id.'})
    }
    var compradores = [];
    var puja = null;
    for(let i = 0; i < data.length; i++){
      puja = data[i].pujaMasAlta;
      axios.get('http://localhost:5000/pujas/' + puja._id)
      .then((response) => {
        const {data} = response;
        const {message} = data;
        compradores.push(data[0].comprador);
      }) 
    }
    res.json(compradores);
  })

});
//get usuarios a x distancia de ti, ESPERAR A QUE SE HAGA EL DE DISTANCIA CON EL SERVICIO EXTERNO



module.exports = router