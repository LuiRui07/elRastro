const mongoose = require("mongoose")


const pujasSchema = new mongoose.Schema({
    comprador: {
        type: String,
        required: true
    },
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: false
    },
    precio: {
        type: Number,
        required: true
    },
    fechaDeCreacion: {
        type: Date,
        required: false
    }
});
module.exports = mongoose.model("pujas", pujasSchema);
