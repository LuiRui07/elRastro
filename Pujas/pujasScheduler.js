const { enviarCorreo } = require("./mailer");
const Puja = require("./models/pujas");
const axios = require("axios");


async function revisarPujas() {
    console.log("Revisando pujas...");
    try {
        const pujas = await Puja.find({});

        for (let puja of pujas) {
            // Realiza la solicitud para obtener detalles del producto
            const response = await axios.get(`https://el-rastro-six.vercel.app/productos/${puja.producto}`);
            const producto = response.data;

            // Verifica si la fecha ha terminado
            if (new Date() > new Date(producto.fechaDeCierre)) { 
                console.log(`La puja con ID ${puja._id} y producto ID ${puja.producto} ha finalizado.`);
                const comprador = await axios.get(`https://el-rastro-six.vercel.app/usuarios/${puja.comprador}`);
                const correo1 = comprador.data.correo;
                console.log(correo1);
                const vendedor = await axios.get(`https://el-rastro-six.vercel.app/usuarios/${producto.vendedor}`);
                const correo2 = vendedor.data.correo;
                console.log(correo2);
                await enviarCorreo(correo1, "Has ganado una puja! Revisalo aqui: https://el-rastro-nine.vercel.app");
                await enviarCorreo(correo2, "Tu puja ha finalizado! Revisalo aqui; https://el-rastro-nine.vercel.app");
            }
        }
    } catch (error) {
        console.error("Error al revisar las pujas:", error);
    }
}
 

module.exports = {
    revisarPujas
};
