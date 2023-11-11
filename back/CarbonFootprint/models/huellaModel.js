const mongoose = require("mongoose")


const huellaModel = new mongoose.Schema({
    distancia: {
        type: Number,
        required: true
    },
    peso: {
        type: Number,
        required: true
    },
    distanciaMIN: {
        type: Number,
        required: true
    },
    distanciaMAX: {
        type: Number,
        required: true
    },
    pesoMIN: {
        type: Number,
        required: true
    },
    pesoMAX: {
        type: Number,
        required: true
    },
    huella: {
        type: Number,
        required: true
    }
});
module.exports = mongoose.model("carbonos", huellaModel);
