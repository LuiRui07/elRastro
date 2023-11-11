const mongoose = require("mongoose")


const usuariosSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: true
    },
    numero: {
        type: String,
        required: true
    },
    codigoPostal: {
        type: String,
        required: true
    },
    ciudad: {
        type: String,
        required: true
    },
    provincia: {
        type: String,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    
});
module.exports = mongoose.model("usuarios", usuariosSchema);
