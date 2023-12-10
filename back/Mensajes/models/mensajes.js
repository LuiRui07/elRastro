const mongoose = require("mongoose")

const mensajesSchema = new mongoose.Schema({
    texto: {
        type: String,
        required: true
    },
    remitente: {
        type: String,
        required: true,
    },
    fechaEnvio: {
        type: Date,
        required: true,
    },
    productoId: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model("mensajes", mensajesSchema);
