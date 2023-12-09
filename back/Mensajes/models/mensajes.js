const mongoose = require("mongoose")

const mensajesSchema = new mongoose.Schema({
    texto: {
          type: String,
          required: true
        },
    destinatario: {
        type: String,
        required: true,
        },
    fechaEnvio : {
        type: Date,
        required: true,
        },
});

module.exports = mongoose.model("mensajes", mensajesSchema);
