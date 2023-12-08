
const express = require('express');
const router = express.Router();
const Valoracion = require('../models/valoraciones');
const axios = require('axios');
// Obtener todas las valoraciones
router.get('/', async (req, res) => {
  try {
    const valoraciones = await Valoracion.find();
    res.json(valoraciones);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Obtener una valoración específica
router.get('/:id', getValoracion, (req, res) => {
  res.json(res.valoracion);
});

// Crear una nueva valoración
router.post('/', async (req, res) => {
  const valoracion = new Valoracion({
    comprador: req.body.idUsuario,
    vendedor: req.body.idVendedor,
    comentario: req.body.comentario,
    valoracion: req.body.valoracion
  });
  await axios.put(`http://localhost:5002/usuarios/valoracion/${req.body.idVendedor}`, {
    valoracionEnviar: req.body.valoracion
  })
  try {
    const newValoracion = await valoracion.save();
    res.status(201).json(newValoracion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar una valoración
router.patch('/:id', getValoracion, async (req, res) => {
  if (req.body.Comprador != null) {
    res.valoracion.Comprador = req.body.Comprador;
  }
  if (req.body.Vendedor != null) {
    res.valoracion.Vendedor = req.body.Vendedor;
  }
  if (req.body.Mensaje != null) {
    res.valoracion.Mensaje = req.body.Mensaje;
  }
  if (req.body.Estrellas != null) {
    res.valoracion.Estrellas = req.body.Estrellas;
  }

  try {
    const updatedValoracion = await res.valoracion.save();
    res.json(updatedValoracion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar una valoración
router.delete('/:id', getValoracion, async (req, res) => {
  try {
    await res.valoracion.remove();
    res.json({ message: 'Valoración eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
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

module.exports = router;
