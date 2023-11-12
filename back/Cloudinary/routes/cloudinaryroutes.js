const express = require("express");
const router = express.Router();
const axios = require("axios");
const cloudinary = require('cloudinary');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

cloudinary.config({ 
  cloud_name: 'dj8csnofh', 
  api_key: '597548295124334', 
  api_secret: 'pLabEZCvj0zgN9yfWAJM1IvUmxA' 
});

// Subir una imagen 
router.post('/subir', upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta la imagen en la solicitud' });
    }

    const imagen = req.file;

    const resultado = await cloudinary.uploader.upload(imagen.path);

    console.log(resultado); // Imprime los detalles de la imagen subida en la consola
    res.json(resultado); // Devuelve los detalles de la imagen subida como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al subir la imagen a Cloudinary' });
  }
});

// Borrar una imagen
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

// Actualizar una imagen en Cloudinary
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

// Obtener toda la lista de imágenes en Cloudinary
router.get('/listarImagenes', async (req, res) => {
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

//Obtener lista de imagenes en Cloudinary de un formato
router.get('/listar/:format', async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      type: 'upload', // Filtra para obtener solo imágenes
      format: req.params.format // Filtra para obtener solo imágenes de un formato específico
    });

    console.log(resultado.resources); // Imprime la lista de imágenes en la consola
    res.json(resultado.resources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});


//Obtener lista de imagenes en Cloudinary de una carpeta
router.get('/listar/:folder', async (req, res) => {
  try {
    const resultado = await cloudinary.api.resources({
      type: 'upload', // Filtra para obtener solo imágenes
      folder: req.params.folder 
    });

    console.log(resultado.resources); // Imprime la lista de imágenes en la consola
    res.json(resultado.resources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});

//Obtener lista de imagenes en Cloudinary con un tamaño espefífico
router.get('/listar/:width/:height', async (req, res) => {
  try {
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);
    let resources = [];

    const resultado = await cloudinary.api.resources({
      type: 'upload'
    });
    resources = resources.concat(resultado.resources);

    const filteredResources = resources.filter(resource => {
      return resource.width === width && resource.height === height;
    });

    console.log(filteredResources); // Imprime la lista de imágenes con el tamaño específico en la consola
    res.json(filteredResources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});

module.exports = router;