
const express = require('express');
const cloudinary = require('cloudinary').v2;
const app = express();
require("dotenv").config({ path: "./config.env" });

     
const port = process.env.PORT;
app.use(express.json());

// Configuración de Cloudinary
cloudinary.config({ 
  cloud_name: 'dj8csnofh', 
  api_key: '597548295124334', 
  api_secret: 'pLabEZCvj0zgN9yfWAJM1IvUmxA' 
});

const cloudinaryroutes = require("./routes/cloudinaryroutes.js")
app.use('/cloudinary', cloudinaryroutes);

app.get("/",(req,res) =>{
    res.send("Esta es la API de Cloudinary")}
)

app.listen(port, () => {
  console.log(`Servidor Cloudinary en ejecución en el puerto ${port}`);
});