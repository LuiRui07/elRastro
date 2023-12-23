const mongoose = require("mongoose")


const valoracionesSchema = new mongoose.Schema({
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    vendedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    comentario: {
            type: String,
            required: true
        },
    valoracion: {
            type: Number, //maximum 5
            required: true

        }
});
module.exports = mongoose.model("valoraciones", valoracionesSchema);
