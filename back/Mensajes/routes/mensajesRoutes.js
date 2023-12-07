const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const mensajesSchema = require("../models/mensajes.js");
const axios = require("axios");
router.use(express.json());
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create, comprobado con Postman
router.post("/", (req, res) => {
  const user = mensajesSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all, comprobado con Postman
router.get("/", (req, res) => {
  mensajesSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

// get por id, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  mensajesSchema
    .findById(id)
    .then((data) =>{
      if(data){
        res.json(data)
      }else{
        res.json({message: 'No se ha encontrado ningún producto con ese id.'})
      }})
    .catch((error) => res.json({ message: error }));
});

router.get("/mensajes/:idComprador/:idVendedor", (req, res) => {
  const { idComprador, idVendedor } = req.params;
  mensajesSchema
    .find({ idComprador: { $regex: idComprador, $options: "i" } , idVendedor: { $regex: idVendedor, $options: "i" }})
    .then((data) =>{
      if(data){
        res.json(data)
      }else{
        res.json({message: 'No se ha encontrado ningún producto con ese id.'})
      }})
    .catch((error) => res.json({ message: error }));
});


// delete , comprobado con Postman
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  mensajesSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update , comprobado con Postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { vendedor, comprador, mensaje} = req.body;
  productosSchema
    .updateOne({ _id: id }, { $set: {vendedor, comprador, mensaje} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


