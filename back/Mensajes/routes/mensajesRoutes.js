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
    .orderBy({ fecha: -1 })
    .catch((error) => res.json({ message: error }));

});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  mensajesSchema
    .find({ destinatario: id })
    .sort({ fecha: -1 })
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json({ message: 'No se ha encontrado ningún mensaje con ese id.' });
      }
    })
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
  const { vendedor, comprador, mensaje } = req.body;
  productosSchema
    .updateOne({ _id: id }, { $set: { vendedor, comprador, mensaje } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get mensajes relacionados a un producto del vendedor y del comprador
router.get("/mensajes/:idProducto/:idUsuario/:idComprador", (req, res) => {
  const idUsuario = req.params.idUsuario;
  const idComprador = req.params.idComprador;
  const idProducto = req.params.idProducto;
  console.log(idUsuario, idComprador, idProducto);
  const mensajes = mensajesSchema.find({ enviador: { $in: [idUsuario, idComprador] }, productoId: idProducto }).sort({ fecha: -1 });

  mensajes.then((data) => {
    if (data.length) {
      res.json(data);
    } else {
      res.json({ message: "No se ha encontrado ningún mensaje con ese id." });
    }
  });
});

module.exports = router;


