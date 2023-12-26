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
  try {
    
    const remitenteObjectId = new ObjectId(req.body.remitente);
    const destinatarioObjectId = new ObjectId(req.body.destinatario);
    const productoObjectId = new ObjectId(req.body.productoId);
    
    const nuevoMensaje = new mensajesSchema({
      ...req.body,
      remitente: remitenteObjectId,
      destinatario: destinatarioObjectId,
      productoId: productoObjectId,
    });

    const mensajeGuardado =  nuevoMensaje.save();

    res.json(mensajeGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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

router.get("/buzon/:idUsuario", async (req, res) => {
  const idUsuario = new ObjectId(req.params.idUsuario);

  mensajesSchema
    .aggregate([
        {
            $match: {
                $or: [
                    { destinatario: idUsuario },
                    { remitente: idUsuario }
                ]
            }
        },
        {
            $group: {
                _id: { $ifNull: ["$productId", "NoDefinido"] },
                mensajes: { $push: "$$ROOT" }
            }
        },
        {
            $project: {
                _id: 1,
                mensajesOrdenados: {
                    $sort: { "fechaEnvio": -1 }
                }
            }
        }
    ])
    .then((data) => {
        if (data && data.length > 0) {
            res.json(data);
        } else {
            res.json({ message: "No tienes mensajes" });
        }
    })
    .catch((error) => res.json({ message: error }));
});



//Get mensajes relacionados a un producto del vendedor y del comprador
router.get("/:idProducto/:idRemitente/:idDestinatario", (req, res) => {
  const idRemitente = new ObjectId(req.params.idRemitente);
  const idDestinatario = new ObjectId(req.params.idDestinatario);
  const idProducto = new ObjectId(req.params.idProducto);
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


