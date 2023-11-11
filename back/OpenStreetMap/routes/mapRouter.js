const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());

//Get coordenadas de una dirección
router.get('/direccionCoordenadas/:direccion', async (req, res) => {
    const { direccion } = req.params;
    try {
        const respuesta = await axios.get(`https://nominatim.openstreetmap.org/search?q=${direccion}&format=json&limit=1`)
        const lat = respuesta.data[0].lat
        const lon = respuesta.data[0].lon
        res.json({ lat, lon })
    } catch (error) {
        console.log(error)
    }

});

//Get dirección de unas coordenadas
router.get('/coordenadasDireccion/:lat/:lon', async (req, res) => {
    const { lat, lon } = req.params;
    try {
        const respuesta = await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`)
        const { road, house_number, postcode, city, state, country } = respuesta.data.address
        res.json({ road, house_number, postcode, city, state, country })
    } catch (error) {
        console.log(error)
    }

});

//Get coordenadas de una usuario dado su ID
router.get("/direccionUsuario/:id", async (req, res) => {
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
                .catch((error) => console.log(error))
        })
        .catch((error) => console.log(error))

});

//Get distancia en KM entre dos coordenadas
router.get('/distancia/:lat1/:lon1/:lat2/:lon2', async (req, res) => {
    const { lat1, lon1, lat2, lon2 } = req.params;
    try {
        const respuesta = await axios.get(`https://router.project-osrm.org/route/v1/driving/${lon1},${lat1};${lon2},${lat2}?overview=false`)
        const { distance } = respuesta.data.routes[0]
        res.json({ distance })
    } catch (error) {
        console.log(error)
    }

});

//Get coordenadas dada una id de un usuario
router.get('/coordenadasUsuario/:id', async (req, res) => {
    axios.get('http://localhost:5002/usuarios/' + req.params.id)
        .then((respuesta) => {
            const { nombreCompleto, calle, numero, codigoPostal, ciudad, provincia, pais } = respuesta.data;
            const direccion = calle + " " + numero + ", " + codigoPostal + ", " + ciudad + ", " + provincia + ", " + pais;
            axios.get('http://localhost:5004/mapa/direccionCoordenadas/' + direccion)
                .then((respuesta) => {
                    const { lat, lon } = respuesta.data;
                    res.json({ nombreCompleto, lat, lon })
                })
        });
});

//Get coordenadas dada una id de un producto
router.get('/coordenadasProducto/:id', async (req, res) => {
   axios.get('http://localhost:5002/usuarios/propietario/' + req.params.id)
        .then((respuesta) => {
            axios.get('http://localhost:5004/mapa/direccionUsuario/' + respuesta.data.vendedor)
                .then((respuesta) => {
                    const { latitud, longitud } = respuesta.data;
                    res.json({  latitud, longitud })
                })
        }).catch((error) => res.json({ message: error }));
      
});
module.exports = router;


