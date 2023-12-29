const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" });
const app = express();
const corsOptions = {
  origin: 'https://el-rastro-nine.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  headers: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization']
};

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

const port = 5004;
app.use(express.json());

const productoRoutes = require("./routes/mapRouter.js")
app.use('/mapa', productoRoutes);


app.get("/",(req,res) =>{
  res.send("Esta es la API de OpenStreetMap")}
)
app.listen(port, console.log("Servidor de OpenStreetMap escuchando en el puerto ", port))