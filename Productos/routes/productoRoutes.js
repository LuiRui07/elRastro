const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const productosSchema = require("../models/productos.js");
const axios = require("axios");
router.use(express.json());
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create, comprobado con Postman
router.post("/", (req, res) => {
  try {
    // Asegúrate de que req.body.vendedor sea un ObjectId válido
    const vendedorObjectId = new ObjectId(req.body.vendedor);

    // Crea un nuevo producto con las propiedades del cuerpo de la solicitud
    const nuevoProducto = new productosSchema({
      ...req.body,
      vendedor: vendedorObjectId,
    });

    // Guarda el producto en la base de datos
    const productoGuardado =  nuevoProducto.save();

    res.json(productoGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// get all, comprobado con Postman
router.get("/", (req, res) => {
  productosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));

});

// get por id, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .findById(id)
    .then((data) =>{
      if(data){
        res.json(data)
      }else{
        res.json({message: 'No se ha encontrado ningún producto con ese id.'})
      }})
    .catch((error) => res.json({ message: error }));
});


// delete , comprobado con Postman
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update , comprobado con Postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const vendedor = new ObjectId(req.body.vendedor);
  const pujaGanadora = new ObjectId(req.body.pujaGanadora);
  const { descripcion , precioInicial, categorias, fechaDeCreacion, nombre, fechaDeCierre, peso, desertico } = req.body;
  productosSchema
    .updateOne({ _id: id }, { $set: { desertico, vendedor, pujaGanadora, descripcion , precioInicial, categorias, fechaDeCreacion, nombre, fechaDeCierre, peso} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});
//LLAMADAS INTERNAS-------------------------------------------------------------------------------
// get productos ofertados por un usuario con un id x, comprobado con Postman
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

// get productos filtrados por categoria, comprobado con Postman
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


//Get de productos por parte de nombre, comprobado con Postman
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

//LLAMADAS EXTENRAS-------------------------------------------------------------------------------\
//2

//Get de productos con parte o el nombre completo de vendedor, comprobado con Postman
router.get('/productos-usuario/:nombre', (req, res) => {
  const {nombre} = req.params;
  axios.get('https://el-rastro-six.vercel.app/usuarios/nombre/' + nombre)
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

//get productos ordenados por pujas en categoria x, PROBADO EN POSTMAN Y NO FUNCIONA?? PROBLEMA CON LOS ESPACIOS??
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

      await axios.get('https://el-rastro-six.vercel.app/pujas/cantidad-pujas/' + data[i]._id)
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

// hacer su atributo desertico true, es decir
// En ese caso, se
// iniciará automáticamente una nueva subasta, con la misma duración, y con un precio salida un 10%
// inferior al inicial
router.put("/desertico/:id", (req, res) => {
  const { id } = req.params;
  productosSchema
    .findOne({ _id: id })
    .then((data) => {
      if(data){
        console.log(Date.now() + (data.fechaDeCierre - data.fechaDeCreacion))
        console.log(new Date(Date.now() + (data.fechaDeCierre - data.fechaDeCreacion)))
        productosSchema
        .updateOne({ _id: id }, { $set: { desertico: true, precioInicial: data.precioInicial * 0.9, fechaDeCierre: (new Date(Date.now() + (data.fechaDeCierre - data.fechaDeCreacion))), fechaDeCreacion: new Date() } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
      }else{
        res.json({message: 'No se ha encontrado ningún producto con ese id.'})
      }
    })

});

module.exports = router;


