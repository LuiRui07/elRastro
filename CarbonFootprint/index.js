const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
require("dotenv").config({ path: "./config.env" });
const app = express();
const axios = require("axios");

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


const port = 5005;
app.use(express.json());

const huellaRouter = require("./routes/footRouter.js")
app.use('/huellaC',huellaRouter );
mongoose.connect(
  "mongodb+srv://grupoWeb:grupoWeb@cluster0.syetq9a.mongodb.net/elRastro").then(()=>
    console.log("Hemos conectado con mongoDB")
  ).catch((error)=>
    console.error(error)
  )

app.get("/",(req,res) =>{
  res.send("Esta es la API")}
)
app.listen(port, console.log("Servidor CarbonFootprint escuchando en el puerto ", port))