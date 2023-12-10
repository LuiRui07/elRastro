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

// get by MensajeId, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  mensajesSchema
    .findById(id)
    .then((data) => {
      if (data) {
        res.json(data);
      } else {
        res.json({ message: "No se ha encontrado ningún mensaje con ese id." });
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
  const { texto, remitente, fechaEnvio, productoId, destinatario } = req.body;
  mensajesSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          texto: texto,
          remitente: remitente,
          destinatario: destinatario,
          fechaEnvio: fechaEnvio,
          productoId: productoId,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//Get mensajes relacionados a un usuario, comprobado con Postman
router.get("/buzon/:idUsuario", async (req, res) => {
  try {
    const idUsuario = req.params.idUsuario;

    // Espera a que se complete la solicitud axios antes de continuar
    const response = await axios.get('http://localhost:5001/productos/productos-ofertados/' + idUsuario);
    const productos = response.data;

    // Consulta los mensajes relacionados con los productos obtenidos
    const mensajes = await mensajesSchema.find({ productoId: { $in: productos } }).sort({ fecha: -1 });

    if (mensajes.length) {
      res.json(mensajes);
    } else {
      res.json({ message: "No existen mensajes para este usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

//Get mensajes relacionados a un producto del vendedor y del comprador
router.get("/:idProducto/:idRemitente/:idDestinatario", (req, res) => {
  const idRemitente = req.params.idRemitente;
  const idDestinatario = req.params.idDestinatario;
  const idProducto = req.params.idProducto;
  console.log(idRemitente, idDestinatario, idProducto);
  const mensajes = mensajesSchema.find({ remitente: { $in: [idDestinatario, idRemitente] }, productoId: idProducto, destinatario: { $in: [idDestinatario, idRemitente] } }).sort({ fecha: -1 });

  mensajes.then((data) => {
    if (data.length) {
      res.json(data);
    } else {
      res.json({ message: "No se ha encontrado ningún mensaje con ese id." });
    }
  });
});

module.exports = router;


