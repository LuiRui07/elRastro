const mongoose = require("mongoose")

const mensajesSchema = new mongoose.Schema({
    mensajes: {
          type: String,
          required: true
        },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        },
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        },
    fechaEnvio : {
        type: Date,
        required: true,
        },
});

module.exports = mongoose.model("productos", productosSchema);
