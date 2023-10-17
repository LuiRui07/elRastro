const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" });
const app = express();


const port = process.env.PORT || 5000;
app.use(express.json());

const productoRoutes = require("./routes/productoRoutes.js")
app.use('/productos', productoRoutes);
mongoose.connect(
  process.env.ATLAS_URI).then(()=>
    console.log("Hemos conectado con mongoDB, BOMBA")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)
app.listen(port, console.log("Servidor escuchando en el puerto ", port))