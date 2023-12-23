import React from 'react';
import axios from 'axios';
import { UserContext } from '../hooks/UserContentHook';
import { useContext } from 'react';
import Swal from 'sweetalert2'
import { useState } from 'react';
import estilosCrearUsuario from '../css/estilosCrearUsuario.css';
const CrearUsuario = () => {
    const user = useContext(UserContext);
    const [showAlert, setShowAlert] = useState(false);

    const handleClick = () => {
      setShowAlert(true);
    };
    const funcionGuardar = (e) => {
        e.preventDefault();
        const nombreCompleto = e.target.nombreCompleto.value;
        const calle = e.target.calle.value;
        const numero = e.target.numero.value;
        const codigoPostal = e.target.codigoPostal.value;
        const ciudad = e.target.ciudad.value;
        const provincia = e.target.provincia.value;
        const pais = e.target.pais.value;
        const correo = e.target.correo.value;
        const usuario = {
            nombreCompleto: nombreCompleto,
            calle: calle,
            numero: numero,
            codigoPostal: codigoPostal,
            ciudad: ciudad,
            provincia: provincia,
            pais: pais,
            correo: correo,
            valoracion: 0,
            numeroValoraciones: 0
        }
        axios.post('http://localhost:5002/usuarios/', usuario)
            .then((response) => {
                const { data } = response;
                const { message } = data;
                console.log(data);
                if (message === "Ya existe un usuario con ese correo.") {
                    Swal.fire({
                        title: 'Error!',
                        text: 'Ya hay un usuario creado con este correo, intenta loogear o crear otro usuario con otro correo',
                        icon: 'error',
                        confirmButtonText: 'Venga va',
                        didClose: () => {
                            window.location.href = "http://localhost:3000/";
                        }
                    });
                    
                } else {
                    Swal.fire({
                        title: 'Usuario Creado',
                        text: 'Ya esta todo listo, se te redirigira a la pagina principal, una vez que refresces se te deslogeara automaticamente',
                        icon: 'success',
                        confirmButtonText: 'Bombazo',
                        didClose: () => {
                            user.setUser({
                                id: data._id,
                                email: data.correo,
                                name: data.nombreCompleto,
                            });
                            localStorage.setItem("id", data._id);
                            window.location.href = "http://localhost:3000/";}
                        
                      })

                }
            })
            .catch((error) => console.log(error));
    }
    return (
        <div>
            <h1>Crear Usuario</h1>
            <form onSubmit={funcionGuardar}>
                <label>Nombre completo</label>
                <input type="text" name="nombreCompleto" required  />
                <label>Calle</label>
                <input type="text" name="calle" required />
                <label>Numero</label>
                <input type="text" name="numero" required />
                <label>Codigo Postal</label>
                <input type="text" name="codigoPostal" required />
                <label>Ciudad</label>
                <input type="text" name="ciudad" required />
                <label>Provincia</label>
                <input type="text" name="provincia" required />
                <label>Pais</label>
                <input type="text" name="pais" required />
                <lablel>Correo</lablel>
                <input type="text" name="correo" required />

                <button>Crear</button>
            </form>
        </div>
    );
}

export default CrearUsuario;