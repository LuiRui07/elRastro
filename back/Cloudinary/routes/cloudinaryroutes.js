const express = require("express");
const router = express.Router();
const axios = require("axios");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dj8csnofh', 
  api_key: '597548295124334', 
  api_secret: 'pLabEZCvj0zgN9yfWAJM1IvUmxA' 
});

// Rutas relacionadas con Cloudinary
router.post('/subir', async (req, res) => {
  try { 
    // Asegúrate de que el campo de entrada en el formulario tenga el atributo 'name' adecuado, por ejemplo, 'imagen'.
    if (!req.files || !req.files.imagen) {
      return res.status(400).json({ error: 'Falta la imagen en la solicitud' });
    }

    const imagen = req.files.imagen;
    console.log(imagen.tempFilePath);
    const resultado = await cloudinary.v2.uploader.upload(imagen.tempFilePath);

    console.log(resultado); // Imprime los detalles de la imagen subida en la consola
    res.json(resultado); // Devuelve los detalles de la imagen subida como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
  }
});
  
router.delete('/eliminar/:public_id', async (req, res) => {
    const {public_id }= req.params;
    try {
      const result = await cloudinary.uploader.destroy(public_id); // Elimina la imagen por su public_id
      console.log(result); // Imprime los detalles de la eliminación en la consola
      res.json(result); // Devuelve los detalles de la eliminación como respuesta
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar la imagen de Cloudinary' });
    }
});

// Ruta para actualizar una imagen en Cloudinary
router.put('/actualizar/:public_id', async (req, res) => {
  const { public_id } = req.params;
  try {
    if (!req.files || !req.files.nueva_imagen) {
      return res.status(400).json({ error: 'No se ha proporcionado una nueva imagen para actualizar' });
    }

    const nuevaImagen = req.files.nueva_imagen;
    const resultado = await cloudinary.uploader.upload(nuevaImagen.tempFilePath, { public_id });

    console.log(resultado); // Imprime los detalles de la imagen actualizada en la consola
    res.json(resultado); // Devuelve los detalles de la imagen actualizada como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la imagen en Cloudinary' });
  }
});

// Ruta para obtener una lista de imágenes en Cloudinary
router.get('/listar', async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      type: 'upload', // Filtra para obtener solo imágenes
    });

    console.log(resultado.resources); // Imprime la lista de imágenes en la consola
    res.json(resultado.resources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});

module.exports = router;