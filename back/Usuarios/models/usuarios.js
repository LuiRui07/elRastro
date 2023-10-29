const mongoose = require("mongoose")


const usuariosSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: false
    }
});
module.exports = mongoose.model("usuarios", usuariosSchema);
