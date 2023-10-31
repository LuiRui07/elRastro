const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productosSchema = require("../models/pujas.js");

// create 
router.post("/", (req, res) => {
  const user = productosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  productosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get todos los productos a los que ha ofertado un usuario
router.get("/pujas-realizadas/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  productosSchema
    .find({ comprador: new ObjectId(usuarioId)})
    .sort({ fecha: -1 }) //Ordena en en fecha descendente
    .then((pujasRealizadas) => {
      if (pujasRealizadas.length === 0) {
        return res.json({ message: "El usuario no ha realizado ninguna puja." });
      }
      res.json(pujasRealizadas);
    })
    .catch((error) => res.json({ message: error }));
});

// delete 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update 
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  productosSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


