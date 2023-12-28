const express = require("express");
const router = express.Router();
const axios = require("axios");
const usuariosSchema = require("../models/usuarios.js");
const usuarios = require("../models/usuarios.js");
//LLAMADAS CRUD-------------------------------------------------------------------------------
// create, comprobado con Postman 
router.post("/", (req, res) => {
  const user = usuariosSchema(req.body);
  axios.get('http://localhost:5002/usuarios/correo/' + user.correo).then((response) => {
    const { data } = response;
    const { message } = data;
    if (message === "No se ha encontrado ningún usuario con ese correo.") {
      user
        .save()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    } else {
      return res.json({ message: "Ya existe un usuario con ese correo." });
    }
  }
  ).catch((error) => res.json({ message: error }));
});




// get all, comprobado con Postman
router.get("/", (req, res) => {
  usuariosSchema
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// get, comprobado con Postman
router.get("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// delete, comprobado con Postman 
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  usuariosSchema
    .deleteOne({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

// update, comprobado con Postman
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { nombreCompleto, calle, numero, codigoPostal, ciudad, provincia, pais, valoraciones, numeroValoraciones} = req.body;
  usuariosSchema
    .updateOne({ _id: id }, { $set: { nombreCompleto, calle, numero, codigoPostal, ciudad, provincia, pais,valoraciones, numeroValoraciones} })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//LLAMADAS INTERNAS-------------------------------------------------------------------------------

// get por correo, comprobado con Postman
router.get("/correo/:correo", (req, res) => {
  const { correo } = req.params;
  usuariosSchema
    .find({ correo: { $regex: correo, $options: "i" } })
    .then((data) => {
      if (data.length === 0) {
        return res.json({ message: "No se ha encontrado ningún usuario con ese correo." });
      } else if(data.length > 1){
        return res.json({ message: "Hay más de un usuario con ese correo." });
      }
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

//agregar valoracion a usuario, teniendo las anteriores, multiplicando la media por l;a cantidad de valoraciones que tenga  y despues sumando la nueva multiplicacion para despues dividir por el numero de valoraciones mas uno, tambien aumentando el numeor de valoraciones
router.put("/valoracion/:id", (req, res) => {
  const { id } = req.params;
  const { valoracionEnviar } = req.body;
  usuariosSchema
    .findById(id)
    .then((data) => {
      const { valoracion, numeroValoraciones } = data;
      const nuevaValoracion = (valoracion * numeroValoraciones + valoracionEnviar) / (numeroValoraciones + 1);
      usuariosSchema
        .updateOne({ _id: id }, { $set: { valoracion: nuevaValoracion, numeroValoraciones: numeroValoraciones + 1 } })
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }));
    })
    .catch((error) => res.json({ message: error }));
});

// get por parte de nombre, comprobado con Postman
router.get("/nombre/:nombre", (req, res) => {
  const { nombre } = req.params;
  usuariosSchema
    .find({ nombreCompleto: { $regex: nombre, $options: "i" } })
    .then((data) => {
      if (data.length === 0) {
        return res.json({ message: "No se ha encontrado ningún usuario con ese nombre." });
      }
      res.json(data);
    })
    .catch((error) => res.json({ message: error }));
});

// get por direccion, comprobado con Postman
router.get("/direccion/:direccion", (req, res) => {
  const { direccion } = req.params;

  usuariosSchema
    .find({ calle: { $regex: direccion, $options: "i" } })
    .then((data) => {
      if (data.length === 0) {
        return res.json({ message: "No se ha encontrado ningún usuario con esa direccion." });
      }
      res.json(data); 
    })
    .catch((error) => res.json({ message: error }));
});

//LLAMADAS EXTERNAS-------------------------------------------------------------------------------

//get subastadores de un articulo con indentificador x, comprobado con Postman
router.get("/compradores/:productoId", (req, res) => {
  const { productoId } = req.params;
  axios.get('http://localhost:5003/pujas')
  .then((response) => {
    const {data} = response;
    const {message} = data;
    var pujadores = [];
    var pujador = null;
    for(let i = 0; i < data.length; i++){ 
      if (data[i].producto == productoId){
        pujador = data[i].comprador;
        usuariosSchema.findById(pujador)
        .then((data) => {
          pujadores.push(data);
        })
      }
    }
    res.json(pujadores);
  })  

});

//get usuarios a x distancia de ti, ESPERAR A QUE SE HAGA EL DE DISTANCIA CON EL SERVICIO EXTERNO, comprobado con Postman
router.get("/distancia/:usuarioID/:distancia", async (req, res) => {
  const { distancia } = req.params;
  const devolver2 = [];
  const { usuarioID } = req.params;
  await axios.get('http://localhost:5002/usuarios/' + usuarioID)
    .then((response) => {
      usuariosSchema.find().then(async (todosLosUsuarios) => {
        const datosUsuario = response.data;
        const { calle, numero, codigoPostal, ciudad, provincia, pais } = datosUsuario;
        const direccion = calle + " " + numero + ", " + codigoPostal + ", " + ciudad + ", " + provincia + ", " + pais;
        await axios.get('http://localhost:5004/mapa/direccionCoordenadas/' + direccion)
          .then(async (coordenadas) => {
            const latUsuario = coordenadas.data.lat;
            const lonUsuario = coordenadas.data.lon;

            for(let i = 0; i < todosLosUsuarios.length; i++){
              const { calle, numero, codigoPostal, ciudad, provincia, pais } = todosLosUsuarios[i];
              const direccion2 = calle + " " + numero + ", " + codigoPostal + ", " + ciudad + ", " + provincia + ", " + pais;
               await axios.get('http://localhost:5004/mapa/direccionCoordenadas/' + direccion2)
                .then(async (coord) => {
                  const latUsuario2 = coord.data.lat;
                  const lonUsuario2 = coord.data.lon;
                   axios.get(`https://router.project-osrm.org/route/v1/driving/${lonUsuario},${latUsuario};${lonUsuario2},${latUsuario2}?overview=false`)
                    .then((respuesta) => {
                      const { distance } = respuesta.data.routes[0];
                      if (distance <= distancia) {
                        devolver2.push(todosLosUsuarios[i]);
                      }
                    })
                    .catch((error) => {res.json({ message: error })});
                }
                ).catch((error) => res.json({ message: error }));
            }
          res.json(devolver2);
          })

          })

        })

    });

//AUXILIARES-------------------------------------------------------------------------------
//Get de propietario de producto con ID x, devuelve el producto entero y de ahi podemos pillar el vendedor, auxiliar
router.get('/propietario/:productoId', (req, res) => {
  const { productoId } = req.params;
  axios.get('http://localhost:5001/productos/' + productoId)
    .then((response) => {
      const { data } = response;
      const { message } = data;
      if (message) {
        return res.json({ message: message })
      }
      if (data.length === 0) {
        return res.json({ message: 'No se ha encontrado ningún producto con ese id.' })
      } else if (data.length > 1) {
        return res.json({ message: 'Hay más de un producto con ese id.' })
      }
      usuariosSchema.findById(data.vendedor)
        .then((data) => {
          res.json(data);
        })
    })
    
    
})  



module.exports = router