const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    pujaMasAlta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pujas',
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
    fechaDeCierre: {
        type: Date,
        required: false
    },
    peso: {
        type: Number,
        required: true
    },
});

module.exports = mongoose.model("productos", productosSchema);
