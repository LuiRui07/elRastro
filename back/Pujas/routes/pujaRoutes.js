const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const pujasSchema = require("../models/pujas.js");

// create 
router.post("/", (req, res) => {
  const user = pujasSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all
router.get("/", (req, res) => {
  pujasSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pujasSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get todos los productos a los que ha ofertado un usuario
router.get("/pujas-realizadas/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  pujasSchema
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

// get la puja mas alta para un producto 
router.get("/pujas-mas-alta/:productoId", (req, res) => {
  const { productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId)})
    .sort({ precio: -1 }) //Ordena en en precio descendente
    .limit(1)
    .then((pujaMasAlta) => {
      if (pujaMasAlta.length === 0) {
        return res.json({ message: "No existe puja para ese producto" });
      }
      res.json(pujaMasAlta[0] );
    })
    .catch((error) => res.json({ message: error }));
});

// delete 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  pujasSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update 
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name, age, email } = req.body;
  pujasSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


