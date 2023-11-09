const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productosSchema = require("../models/productos.js");
const axios = require("axios");
router.use(express.json());

// create, comprobado y funciona
router.post("/", (req, res) => {
  const user = productosSchema(req.body);
  user
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get all, compronado y funciona
router.get("/", (req, res) => {
  productosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

// get por id comprobado y funciona
router.get("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get productos ofertados por un usuario con un id x, comprobado y funciona
router.get("/productos-ofertados/:usuarioId", (req, res) => {
  const { usuarioId } = req.params;
  productosSchema
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

// get productos filtrados por categoria, comprobado y funciona
router.get("/productos-categoria/:categoria", (req, res) => {
  const { categoria } = req.params;
  productosSchema
    .find({ categorias: { $in: [categoria] } })
    .sort({ fecha: -1 }) //Ordena en en fecha descendente
    .then((productosCategoria) => {
      if (productosCategoria.length === 0) {
        return res.json({ message: "No hay productos de esta categoría." });
      }
      res.json(productosCategoria);
    })  
    .catch((error) => res.json({ message: error }));
});

// delete , comprobado y funciona
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update , comprobado y funciona
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { vendedor,descripcion , precioInicial, precioActual, categorias, fechaDeCreacion, nombre } = req.body;
  productosSchema
    .updateOne({ _id: id }, { $set: { vendedor,descripcion , precioInicial, precioActual, categorias, fechaDeCreacion, nombre} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get productos dados por un usuario con un nombre x
router.get('/productos-usuario/:nombre', (req, res) => {
  const {nombre} = req.params;
  axios.get('http://localhost:5000/usuarios/nombre/${nombre}')
  .then((response) => {
    const {data} = response;
    const {message} = data;
    if(message){
      return res.json({message: message})
    }
    const {usuarios} = data;
    const {id} = usuarios[0];
    productosSchema
    .find({vendedor: new ObjectId(id)})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  })
})
module.exports = router;


