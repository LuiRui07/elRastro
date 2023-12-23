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

// Obtener una imagen de Cloudinary con su id
router.get('/obtener/:public_id', async (req, res) => { 
  try {
    const { public_id } = req.params; 
    const resultado = await cloudinary.image(public_id); // Obtiene la imagen de Cloudinary
    console.log(resultado); // Imprime los detalles de la imagen en la consola
    res.json(resultado); // Devuelve los detalles de la imagen como respuesta
  } catch (error) { 
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la imagen de Cloudinary' });
  }
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
router.put('/actualizar/:public_id',upload.single('imagen'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Falta la imagen en la solicitud' });
    }

    const public_id = req.params.public_id;

    // Obtén la información de la imagen existente en Cloudinary
    const imagenExistente = await cloudinary.api.resource(public_id);

    if (!imagenExistente) {
      return res.status(404).json({ error: 'La imagen no existe en Cloudinary' });
    }

    // Sube la nueva imagen
    const resultado = await cloudinary.uploader.upload(req.file.path);

    // Borra la imagen anterior
    await cloudinary.uploader.destroy(public_id);

    console.log(resultado); // Imprime los detalles de la nueva imagen en la consola
    res.json(resultado); // Devuelve los detalles de la nueva imagen como respuesta
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
router.get('/filtrar-formato/:format', async (req, res) => {
  try {
    const format = req.params.format;
    let resources = [];

    const resultado = await cloudinary.api.resources({
        type: 'upload', 
    }); 

    const filteredResources = resultado.resources.filter(resource => {
      return resource.format === format;
    });

    console.log(filteredResources); // Imprime la lista de imágenes en la consola
    res.json(filteredResources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});


//Obtener lista de imagenes en Cloudinary de una carpeta
router.get('/filtrar-carpeta/:folder', async (req, res) => {
  try {
    const folder = req.params.folder;
    let resources = [];

    const resultado = await cloudinary.api.resources({
        type: 'upload', 
    }); 

    const filteredResources = resultado.resources.filter(resource => {
      return resource.folder === folder;
    });

    console.log(filteredResources); // Imprime la lista de imágenes en la consola
    res.json(filteredResources); // Devuelve la lista de imágenes como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la lista de imágenes de Cloudinary' });
  }
});

//Obtener lista de imagenes en Cloudinary con un tamaño espcífico
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