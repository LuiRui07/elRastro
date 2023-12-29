const mongoose = require("mongoose")

const productosSchema = new mongoose.Schema({
    imagenes: [
        {
          type: String,
        },
      ],
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        },
    pujaGanadora: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'pujas',
        required: false,
        nullalbe: true
        },
    descripcion: {
        type: String,
        required: true
        },
    precioInicial: {
        type: Number,
        required: true
        },
    categorias: {
        type: String,
        required: true
    },
    fechaDeCreacion: {
        type: Date,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    fechaDeCierre: {
        type: Date,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    desertico: {
        type: Boolean,
        required: true,
        default: false
    },
});

module.exports = mongoose.model("productos", productosSchema);
