const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" });
const app = express();
const axios = require("axios");


const port = 5008;
app.use(express.json());
app.use(cors());

const valoracionesRouter = require("./routes/valoracionesRoutes.js")
app.use('/valoraciones', valoracionesRouter);
mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.syetq9a.mongodb.net/elRastro").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)
app.listen(port, console.log("Servidor de Valoraciones escuchando en el puerto ", port))