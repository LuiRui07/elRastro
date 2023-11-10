const express = require("express");
const router = express.Router();
const axios = require("axios");
const usuariosSchema = require("../models/usuarios.js");
const usuarios = require("../models/usuarios.js");

// create 
router.post("/", (req, res) => {
  const user = usuariosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  usuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update 
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  usuariosSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get por parte de nombre
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

//Productos comprados por un usuario con nombre x


module.exports = router