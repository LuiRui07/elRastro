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
    .find({ categorias: { $regex: categoria, $options: "i" } })
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

//2
router.get('/productos-usuario/:nombre', (req, res) => {
  const {nombre} = req.params;
  axios.get('http://localhost:5002/usuarios/nombre/' + nombre)
  .then((response) => {
    const {data} = response;
    const {message} = data;
    //  if(message){
    //    return res.json({message: message})
    //  }
    if(data.length === 0){
      return res.json({message: 'No se ha encontrado ningún usuario con ese nombre.'})
    }else if(data.length > 1){
      return res.json({message: 'Hay más de un usuario con ese nombre.'})
    }

    const {_id} = data[0];
    productosSchema
    .find({vendedor: new ObjectId(_id)})
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
  })
})

//get productos ordenados por pujas en categoria x, hecho y funciona, estaria bien segunda comprobacion.
router.get('/productos-ordenados-por-pujas/:categoria', (req, res) => {
  const {categoria} = req.params;
  productosSchema.find({ categorias: { $regex: categoria, $options: "i" } })
  .then(async (data) => {
    if(data.length === 0){
      return res.json({message: 'No hay productos de esta categoría.'})
    }
    var productosArray = [];
    for(let i = 0; i < data.length; i++){
      productoI = {
        _id: data[i]._id,
        nombre: data[i].nombre,
        descripcion: data[i].descripcion,
        precioInicial: data[i].precioInicial,
        precioActual: data[i].precioActual,
        categorias: data[i].categorias,
        fechaDeCreacion: data[i].fechaDeCreacion,
        vendedor: data[i].vendedor,
        cantidadPujas: 0
      }

      await axios.get('http://localhost:5000/pujas/cantidad-pujas/' + data[i]._id)
      .then((response) => {

        const {data} = response;
        const {message} = data;
        if(message){
          return res.json({message: message})
        }
        productoI.cantidadPujas = data;
        productosArray.push(productoI)
      })

    }
    productosArray.sort((a,b) => {
      if(a.cantidadPujas > b.cantidadPujas){
        return -1;
      }else if(a.cantidadPujas < b.cantidadPujas){
        return 1;
      }else{
        return 0;
      }
    })
    res.json(productosArray)
  })
})

//Get de productos por parte de nombre.
router.get('/productos-por-nombre/:nombre', (req, res) => {
  const {nombre} = req.params;
  productosSchema.find({ nombre: { $regex: nombre, $options: "i" } })
  .then((data) => {
    if(data.length === 0){
      return res.json({message: 'No hay productos con ese nombre.'})
    }
    res.json(data)
  })
})
module.exports = router;


