
const express = require('express');
const router = express.Router();
const Valoracion = require('../models/valoraciones');
const axios = require('axios');
// Obtener todas las valoraciones, comprobado con Postman
router.get('/', async (req, res) => {
  try {
    const valoraciones = await Valoracion.find();
    res.json(valoraciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una valoración específica, comprobado con Postman
router.get('/:id', getValoracion, (req, res) => {
  res.json(res.valoracion);
});

// Crear una nueva valoración, comprobado con Postman
router.post('/', async (req, res) => {
  const valoracion = new Valoracion({
    comprador: req.body.comprador,
    vendedor: req.body.vendedor,
    comentario: req.body.comentario,
    valoracion: req.body.valoracion
  });

  try {
    const newValoracion = await valoracion.save();
    res.status(201).json(newValoracion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
} );

// Actualizar una valoración, comprobado con Postman
router.put('/:id', async (req, res) => {
  try {
    const valoracion = await Valoracion.findById(req.params.id);

    if (!valoracion) {
      return res.status(404).json({ message: 'La valoración no fue encontrada' });
    }

    // Actualizar los campos de la valoración con los valores proporcionados en el cuerpo de la solicitud
    valoracion.comprador = req.body.comprador || valoracion.comprador;
    valoracion.vendedor = req.body.vendedor || valoracion.vendedor;
    valoracion.comentario = req.body.comentario || valoracion.comentario;
    valoracion.valoracion = req.body.valoracion || valoracion.valoracion;

    // Guardar la valoración actualizada en la base de datos
    const updatedValoracion = await valoracion.save();

    res.json(updatedValoracion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una valoración, comprobado con Postman
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Valoracion.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'La valoración no fue encontrada' });
    }

    res.json({ message: 'La valoración fue eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware para obtener una valoración por su ID
async function getValoracion(req, res, next) {
  let valoracion;
  try {
    valoracion = await Valoracion.findById(req.params.id);
    if (valoracion == null) {
      return res.status(404).json({ message: 'Valoración no encontrada' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.valoracion = valoracion;
  next();
}

//Obtener valoracion que ha dejado una persona a otra
router.get('/valoracion/:idVendedor/:idComprador', async (req, res) => {
  const { idVendedor, idComprador } = req.params;
    console.log('idVendedor:', idVendedor);
    console.log('idComprador:', idComprador);
    const valoracion = await Valoracion.findOne({ vendedor: idVendedor, comprador: idComprador })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));


});

module.exports = router;
