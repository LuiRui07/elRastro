const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    direccion: {
        type: String,
        required: false
        },
    descripcion: {
        type: String,
        required: false
        },
    precioInicial: {
        type: Number,
        required: false
        },
    precioActual: {
        type: Number,
        required: false
    },
    categorias: {
        type: String,
        required: false
    },
    fechaDeCreacion: {
        type: Date,
        required: false
    }
});

module.exports = mongoose.model("productos", productosSchema);
