const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
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
    },
    nombre: {
        type: String,
        required: false
    },
});

module.exports = mongoose.model("productos", productosSchema);
