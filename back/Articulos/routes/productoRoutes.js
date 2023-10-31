const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const pujasSchema = require("../models/productos.js");

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

// get productos ofertados por un usuario
router.get("/productos-ofertados/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  pujasSchema
    .find({ vendedor: new ObjectId(usuarioId)})
    .sort({ fecha: -1 }) //Ordena en en fecha descendente
    .then((productosOfertados) => {
      if (productosOfertados.length === 0) {
        return res.json({ message: "El usuario no ha ofertado ningún producto." });
      }
      res.json(productosOfertados);
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

// get productos ofertados por un usuario
router.get("/productos-ofertados/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  pujasSchema
    .find({ vendedor: usuarioId })
    .sort({ fecha: -1 }) //Ordena en en fecha descendente
    .then((productosOfertados) => {
      if (productosOfertados.length === 0) {
        return res.json({ message: "El usuario no ha ofertado ningún producto." });
      }
      res.json(productosOfertados);
    })
    .catch((error) => res.json({ message: error }));
});

module.exports = router;


