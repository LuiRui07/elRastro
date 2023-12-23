const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());

//Get coordenadas de una dirección, comprobado con Postman
router.get('/direccionCoordenadas/:direccion', async (req, res) => {
    const { direccion } = req.params;
    try {
        const respuesta = await axios.get(`https://nominatim.openstreetmap.org/search?q=${direccion}&format=json&limit=1`)

        const lat = respuesta.data[0].lat
        const lon = respuesta.data[0].lon
        res.json({ lat, lon })
    } catch (error) {
        res.json({ message: error });
    }

});

//Get dirección de unas coordenadas, comprobado con Postman
router.get('/coordenadasDireccion/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;
    try {
        const respuesta = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`)
        const { road, house_number, postcode, city, state, country } = respuesta.data.address
        res.json({ road, house_number, postcode, city, state, country })
    } catch (error) {
        res.json({ message: error });
    }

});

//Get coordenadas de un usuario dado su ID, comprobado con Postman
router.get("/coordenadasUsuario/:id", async (req, res) => {
    const { id } = req.params;
    axios.get('http://localhost:5002/usuarios/' + id)
        .then((respuesta) => {

            const calle = respuesta.data.calle;
            const numero = respuesta.data.numero;
            const codigoPostal = respuesta.data.codigoPostal;
            const ciudad = respuesta.data.ciudad;
            const provincia = respuesta.data.provincia;
            const pais = respuesta.data.pais;
            const direccion = calle + " " + numero + ", " + codigoPostal + ", " + ciudad + ", " + provincia + ", " + pais;
            axios.get('http://localhost:5004/mapa/direccionCoordenadas/' + direccion)
                .then((respuesta) => {
                    const latitud = respuesta.data.lat;
                    const longitud = respuesta.data.lon;
                    res.json({ latitud, longitud })
                })
                .catch((error) => res.json({ message: error }));
        })
        .catch((error) => res.json({ message: error }));

});

//Get distancia en KM entre dos coordenadas, comprobado con Postman
router.get('/distancia/:lat1/:lon1/:lat2/:lon2', async (req, res) => {
    const { lat1, lon1, lat2, lon2 } = req.params;
    try {
        const respuesta = await axios.get(`https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`)
        
        const { distance } = respuesta.data.routes[0]
        res.json({ distance })
    } catch (error) {
        res.json({ message: error });
    }

});

//Get direccion dada una id de un usuario, comprobado con Postman
router.get("/direccionUsuario/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const respuesta = await axios.get(`http://localhost:5002/usuarios/${id}`);
        
        const calle = respuesta.data.calle;
        const numero = respuesta.data.numero;
        const codigoPostal = respuesta.data.codigoPostal;
        const ciudad = respuesta.data.ciudad;
        const provincia = respuesta.data.provincia;
        const pais = respuesta.data.pais;

        const direccion = `${calle} ${numero}, ${codigoPostal}, ${ciudad}, ${provincia}, ${pais}`;

        res.json({ direccion });
    } catch (error) {
        res.json({ message: error });
    }
});


//Get coordenadas dada una id de un producto, comprobado con Postman
router.get('/coordenadasProducto/:id', async (req, res) => {
    try {
         const responseUsuario = await axios.get(`http://localhost:5002/usuarios/propietario/${req.params.id}`);
         const vendedorId = responseUsuario.data._id;
         const responseDireccionUsuario = await axios.get(`http://localhost:5004/mapa/direccionUsuario/${vendedorId}`);
         const { direccion } = responseDireccionUsuario.data;
         const responseCoordenadas = await axios.get(`http://localhost:5004/mapa/direccionCoordenadas/${direccion}`);
         const { lat, lon } = responseCoordenadas.data;
 
         res.json({ latitud: lat, longitud: lon });
     } catch (error) {
        res.json({ message: error });
     }
 });
module.exports = router;


