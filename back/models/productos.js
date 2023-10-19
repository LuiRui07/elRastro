const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    vendedor: {
        type: String,
        required: true,
        
        },
    direccion: {
        type: String,
        required: true
        },
    descripcion: {
        type: String,
        required: true
        },
    precioInicial: {
        type: Number,
        required: true
        },
    precioActual: {
        type: Number,
        required: false
    },
    categorias: {
        type: String,
        required: true
    },
    fechaDeCreacion: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("productos", productosSchema);
