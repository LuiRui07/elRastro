const mongoose = require("mongoose")

const articleSchema = new mongoose.Schema({
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
    }
});

module.exports = mongoose.model("productos", articleSchema);
