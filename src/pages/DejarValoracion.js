import React from "react";
import axios from "axios";
import EstrellasDejarValoracion from "../components/EstrellasDejarValoracion";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
function DejarValoracion() {
    const idUsuario = localStorage.getItem('id');
    const { idVendedor, idArticulo } = useParams();
    const [usuario, setUsuario] = useState(null);
    const [p, setP] = useState(null);

    useEffect(() => {
        axios.get(`https://mi-repo-ten.vercel.app/usuarios/${idVendedor}`)
        .then(response => {
            console.log(response.data);
            if (response.data !== null) {
                setUsuario(response.data);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
        });

        axios.get(`https://mi-repo-ten.vercel.app/productos/${idArticulo}`)
        .then(response => {
            console.log(response.data);
            if (response.data !== null) {
                setP(response.data);
            }
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
        });
    }

    , []);

    
  return (
    <div>
        <Navbar />
        {usuario !== null && p !== null && 
        
        <div>
            
            <h2>Dejar valoración a {usuario.nombreCompleto}</h2> y a su producto {p.nombre}
        </div>
}
        <EstrellasDejarValoracion idUsuario={idUsuario} idVendedor={idVendedor}/>
    </div>
  );
}

export default DejarValoracion;