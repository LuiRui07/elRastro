const express = require("express");
const router = express.Router();
const axios = require("axios");
router.use(express.json());
const huellaModel = require("../models/huellaModel.js");
const API_KEY = "Xm5gLqrLw95f6ujRVn9tQ";
//LLAMADAS CRUD-------------------------------------------------------------------------------
//Get all
router.get("/", (req, res) => {
    huellaModel
        .find()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Get
router.get("/:id", (req, res) => {
    const { id } = req.params;
    huellaModel
        .findById(id)
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Post
router.post("/", (req, res) => {
    const huella = huellaModel(req.body);
    huella
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Delete
router.delete("/:id", (req, res) => {
    const { id } = req.params;
    huellaModel
        .deleteOne({ _id: id })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//Update
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { distancia, peso, distanciaMIN, distanciaMAX, pesoMIN, pesoMAX } = req.body;
    huellaModel

        .updateOne({ _id: id }, { $set: { distancia, peso, distanciaMIN, distanciaMAX, pesoMIN, pesoMAX } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
});
//LLAMADAS INTERNAS-------------------------------------------------------------------------------


//Buscar si con los KG y con la DISTANCIA hay algun atributo en la bdd que coincida, es decir, distacia>=distanciaMIN && distancia<=distanciaMAX && peso>=pesoMIN && peso<=pesoMAX
router.get('/huellaCarbono/:distancia/:peso', async (req, res) => {
    const { distancia } = req.params;
    const { peso } = req.params;
    huellaModel
        .find({ distanciaMIN: { $lte: distancia }, distanciaMAX: { $gte: distancia }, pesoMIN: { $lte: peso }, pesoMAX: { $gte: peso } })
        .sort({ distancia: 1 })
        .then((data) => {
            if (data.length === 0) {
                return res.json({ message: "No se ha encontrado ningún producto con esos datos." });
            }
            res.json(data[0]);
        })
        .catch((error) => res.json({ message: error }));


});


//Calcular huella carbono en G
router.get('/huellaCarbonoCosto/:idUsuario/:idProducto', async (req, res) => {
    axios.get('http://localhost:5004/mapa/coordenadasUsuario/' + req.params.idUsuario).then((respuesta) => {
        const latitudUsuario = respuesta.data.latitud;
        const longitudUsuario = respuesta.data.longitud;
        console.log(respuesta.data);
        axios.get('http://localhost:5004/mapa/coordenadasProducto/' + req.params.idProducto).then((respuesta) => {
            const latitudProducto = respuesta.data.latitud;
            const longitudProducto = respuesta.data.longitud;
            axios.get('http://localhost:5004/mapa/distancia/' + latitudUsuario + '/' + longitudUsuario + '/' + latitudProducto + '/' + longitudProducto).then((respuesta) => {

                const distancia = respuesta.data.distance;
                axios.get('http://localhost:5001/productos/' + req.params.idProducto).then((respuesta) => {
                    const peso = respuesta.data.peso;
                    axios.get('http://localhost:5005/huellaC/huellaCarbono/' + distancia + '/' + peso).then((respuesta) => {
                        if (respuesta.data.length !== 0 && respuesta.data.message !== "No se ha encontrado ningún producto con esos datos.") {
                            res.json(respuesta.data.huella);
                        } else {
                            //Agregar a la bdd
                            const options = {
                                url: "https://www.carboninterface.com/api/v1/estimates",
                                method: "POST",
                                headers: {
                                  Authorization: `Bearer ${API_KEY}`,
                                  ContentType: "application/json",
                                },
                                data: {
                                  type: "shipping",
                                  weight_value: peso,
                                  weight_unit: "g",
                                  distance_value: distancia/1000,
                                  distance_unit: "km",
                                  transport_method: "truck",
                                },
                              };
                             axios(options)
                             .then((response) => {
                                // {
                                //     data: {
                                //       id: 'ad793815-eb17-43b8-bb68-73b8f4a0323b',
                                //       type: 'estimate',
                                //       attributes: {
                                //         distance_value: 157,
                                //         weight_unit: 'g',
                                //         transport_method: 'truck',
                                //         weight_value: 100,
                                //         distance_unit: 'km',
                                //         estimated_at: '2023-11-11T14:21:19.992Z',
                                //         carbon_g: 1,
                                //         carbon_lb: 0,
                                //         carbon_kg: 0,
                                //         carbon_mt: 0
                                //       }
                                //     }
                                //   }
                                //Accedemos a los g de carbono
                               const carbonFootprint = response.data.data.attributes.carbon_g;
                          
                               res.json({ carbonFootprint });
                               axios.post('http://localhost:5005/huellaC/', {
                                distancia: distancia,
                                peso: peso,
                                distanciaMIN: distancia - 10,
                                distanciaMAX: distancia + 10,
                                pesoMIN: peso - 2000,
                                pesoMAX: peso + 2000,
                                huella: carbonFootprint
                            })
                             })
                             .catch((error) => {
                               console.error(error);
                             });
                            
                    }})
                })
            })
        })
    })
});

//Calcular precio de huella carbono en euros
router.get("/getPrecio/:cantidadEnGramos", (req, res) => {
    const { cantidadEnGramosDeCarbono } = req.params;
    res.json({ precio: cantidadEnGramosDeCarbono * 0.5 });
});


module.exports = router;


