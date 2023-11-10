const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const pujasSchema = require("../models/pujas.js");
const axios = require("axios");
//LLAMADAS CRUD-------------------------------------------------------------------------------
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
//LLAMADAS INTERNAS-------------------------------------------------------------------------------
// get la puja mas alta para un producto 
router.get("/pujas-mas-alta/:productoId", (req, res) => {
  const { productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId) })
    .sort({ precio: -1 }) //Ordena en en precio descendente
    .limit(1)
    .then((pujaMasAlta) => {
      if (pujaMasAlta.length === 0) {
        return res.json({ message: "No existe puja para ese producto" });
      }
      res.json(pujaMasAlta[0]);
    })
    .catch((error) => res.json({ message: error }));
});
// get todos los productos a los que ha ofertado un usuario
router.get("/pujas-realizadas/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  pujasSchema
    .find({ comprador: new ObjectId(usuarioId) })
    .sort({ fecha: -1 }) //Ordena en en fecha descendente
    .then((pujasRealizadas) => {
      if (pujasRealizadas.length === 0) {
        return res.json({ message: "El usuario no ha realizado ninguna puja." });
      }
      res.json(pujasRealizadas);
    })
    .catch((error) => res.json({ message: error }));
});
// devolver cantidad de pujas para un producto con id x
router.get("/cantidad-pujas/:productoId", (req, res) => {
  const { productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId) })
    .then((pujas) => {
      if (pujas.length === 0) {
        return res.json({ message: "No hay pujas para este producto." });
      }
      res.json(pujas.length);
    })
    .catch((error) => res.json({ message: error }));
});

//Que pujas ha hecho un usuario de id x en un producto de id 
router.get("/puja-usuario-producto/:usuarioId/:productoId", (req, res) => {
  const { productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId), comprador: new ObjectId(usuarioId) })
    .then((pujas) => {
      if (pujas.length === 0) {
        return res.json({ message: "No hay pujas para este producto y esta persona." });
      }
      res.json(pujas.length);
    })
    .catch((error) => res.json({ message: error }));
});
//LLAMADAS EXTENRAS-------------------------------------------------------------------------------
//Que pujas ha hecho un usuario con nombre x
router.get("/puja-usuario/:nombre", (req, res) => {
  const { nombre } = req.params;
  axios.get(`http://localhost:5002/usuarios/nombre/${nombre}`).then((response) => {
    const { _id } = response.data[0];
    pujasSchema
      .find({ comprador: new ObjectId(_id) })
      .then((pujas) => {
        if (pujas.length === 0) {
          return res.json({ message: "No hay pujas para este usuario." });
        }
        res.json(pujas);
      })
      .catch((error) => res.json({ message: error }));
  });
});

//Que pujas se han hecho sobre un producto con nombre x, y si hay mas de un producto con ese nombre, se devuelve un array con, todas las pujas del primero, todas las pujas del segundo..
router.get("/puja-producto/:nombre", async (req, res) => {
  const { nombre } = req.params;
  let devolver = [];
  await axios.get(`http://localhost:5001/productos/productos-por-nombre/${nombre}`).then(async (response) => {

    for (let i = 0; i < response.data.length; i++) {
      const { _id } = response.data[i];
      await pujasSchema
        .find({ producto: new ObjectId(_id) })
        .then((pujas) => {

          if (pujas.length !== 0) {
            agregar = {
              nombre: response.data[i].nombre,
              pujas: pujas
            }
            devolver.push(agregar);
          }
        })

    }


  }).catch((error) => res.json({ message: error }));


  if (devolver.length === 0) {
    return res.json({ message: "No hay pujas para productos ccon este nombre." });
  } else {
    res.json(devolver);
  }

});

module.exports = router;


