const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();
const Producto = require("./models/productos.js");
const axios = require("axios");


const port = 5001;
app.use(express.json());
app.use(cors({
  origin: 'https://el-rastro-nine.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const productoRoutes = require("./routes/productoRoutes.js");
const productos = require("./models/productos.js");
app.use('/productos', productoRoutes);
mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.syetq9a.mongodb.net/elRastro").then(() =>
    console.log("Hemos conectado con mongoDB")
  ).catch((error) =>
    console.error(error)
  )

const intervalo = 0.2 * 60 * 1000; // 3 minutos en milisegundos
setInterval(revisarProductos, intervalo);

async function revisarProductos() {
  try {
    console.log("Revisando productos...");
    const productos2 = await productos.find({});
    for (let producto of productos2) {
      if (new Date() > new Date(producto.fechaDeCierre)) {
        console.log(`El producto con ID ${producto._id} ha finalizado.`);
        const pujas = await axios.get(`https://front-elrastro.vercel.app/pujas/cantidad-pujas/${producto._id}`);
        if (pujas.data == 0) {
          console.log(`El producto con ID ${producto._id} no tiene pujas.`);
          await axios.put(`https://front-elrastro.vercel.app/productos/desertico/${producto._id}`).then((response) => {
            console.log(response.data);
          }
          ).catch((error) => console.error(error));

        }
      }
    }
  } catch (error) {
    console.error("Error al revisar las pujas:", error);
  }
}

app.get("/", (req, res) => {
  res.send("Esta es la API");
});

app.listen(port, console.log("Servidor de Productos escuchando en el puerto ", port));
