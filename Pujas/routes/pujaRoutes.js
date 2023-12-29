const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const pujasSchema = require("../models/pujas.js");
const axios = require("axios");
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create, comprobado en Postman
router.post("/", (req, res) => {
  const user = pujasSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all, comprobado en Postman
router.get("/", (req, res) => {
  pujasSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  pujasSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete, comprobado con Postman
router.delete("/:id", (req, res) => {
  const { id } = req.params.id;
  pujasSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update, comprobado con Postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { comprador, producto, precio, fechaDeCreacion } = req.body;
  pujasSchema
    .updateOne({ _id: id }, { $set: { comprador, producto, precio, fechaDeCreacion } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//LLAMADAS INTERNAS-------------------------------------------------------------------------------
// get la puja mas alta para un producto, comprobado con Postman
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
// get todas las pujas a los que ha ofertado un usuario, comprobado con Postman
router.get("/pujas-realizadas/:usuarioId", async (req, res) => {
  const { usuarioId } = req.params;

  try {
    // Agrupa las pujas por producto y selecciona la máxima puja para cada producto
    const pujasMaximas = await pujasSchema.aggregate([
      {
        $match: { comprador: new ObjectId(usuarioId) }
      },
      {
        $group: {
          _id: "$producto", // Agrupar por producto
          max_puja: { $max: "$precio" } // Obtener la máxima puja para cada producto
        }
      }
    ]);

    if (pujasMaximas.length === 0) {
      return res.json({ message: "El usuario no ha realizado ninguna puja." });
    }

    // Para cada máxima puja, obtén los detalles completos de esa puja
    const pujasDetalladas = await Promise.all(
      pujasMaximas.map(async (pujaMaxima) => {
        const puja = await pujasSchema.findOne({ producto: pujaMaxima._id, precio: pujaMaxima.max_puja, comprador: new ObjectId(usuarioId) });
        return puja;
      })
    );

    res.json(pujasDetalladas);

  } catch (error) {
    res.json({ message: error.message });
  }
});


// devolver cantidad de pujas para un producto con id x, comprobado con Postman
router.get("/cantidad-pujas/:productoId", (req, res) => {
  const { productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId) })
    .then((pujas) => {
      if (pujas.length === 0) {
        return res.json(0);
      }
      res.json(pujas.length);
    })
    .catch((error) => res.json({ message: error }));
});

//Que pujas ha hecho un usuario de id x en un producto de id x, comprobado con Postman
router.get("/puja-usuario-producto/:usuarioId/:productoId", (req, res) => {
  const { usuarioId, productoId } = req.params;
  pujasSchema
    .find({ producto: new ObjectId(productoId), comprador: new ObjectId(usuarioId) })
    .then((pujas) => {
      if (pujas.length === 0) {
        return res.json({ message: "No hay pujas para este producto y esta persona ." });
      }
      res.json(pujas);
    })
    .catch((error) => res.json({ message: error }));
});
//LLAMADAS EXTERNAS-------------------------------------------------------------------------------
//Que pujas ha hecho un usuario con nombre x, comprobado con Postman
router.get("/puja-usuario/:nombre", async (req, res) => {
  try {
    const { nombre } = req.params;
    const response = await axios.get(`https://el-rastro-six.vercel.app/usuarios/nombre/${nombre}`);
    const { _id } = response.data[0];

    const pujas = await pujasSchema.find({ comprador: new ObjectId(_id) });

    if (pujas.length === 0) {
      return res.json({ message: "No hay pujas para este usuario." });
    }

    res.json(pujas);
  } catch (error) {
    res.json({ message: error.message });
  }
});

//Que pujas se han hecho sobre un producto con nombre x, y si hay mas de un producto con ese nombre, se devuelve un array con, todas las pujas del primero, todas las pujas del segundo..
//Comprobado con Postman
router.get("/puja-producto/:nombre", async (req, res) => {
  const { nombre } = req.params;
  let devolver = [];
  await axios.get(`https://el-rastro-six.vercel.app/productos/productos-por-nombre/${nombre}`)
  .then(async (response) => {
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
    return res.json({ message: "No hay pujas para productos con este nombre." });
  } else {
    res.json(devolver);
  }

});

module.exports = router;
