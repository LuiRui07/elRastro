const mongoose = require("mongoose")


const usuariosSchema = new mongoose.Schema({
    nombreCompleto: {
        type: String,
        required: true
    },
    calle: {
        type: String,
        required: false
    },
    numero: {
        type: String,
        required: false
    },
    codigoPostal: {
        type: String,
        required: false
    },
    ciudad: {
        type: String,
        required: false
    },
    provincia: {
        type: String,
        required: false
    },
    pais: {
        type: String,
        required: false
    },
    
});
module.exports = mongoose.model("usuarios", usuariosSchema);
