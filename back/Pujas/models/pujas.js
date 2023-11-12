const mongoose = require("mongoose")


const pujasSchema = new mongoose.Schema({
    comprador: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: false,
        },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    fechaDeCreacion: {
        type: Date,
        required: true
    }
});
module.exports = mongoose.model("pujas", pujasSchema);
