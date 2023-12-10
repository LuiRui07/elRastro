const mongoose = require("mongoose")

const mensajesSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    remitente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
    },
    destinatario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
    },
    fechaEnvio: {
        type: Date,
        required: true,
    },
    productoId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true,
    },

});

module.exports = mongoose.model("mensajes", mensajesSchema);
