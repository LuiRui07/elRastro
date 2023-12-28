import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../hooks/UserContentHook';



function Buzon() {
  const [mensajes, setData] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.user !== null) {
    axios.get('http://localhost:5010/mensajes/buzon/' + user.user.id)
      .then(response => {
        setData(response.data);
        console.log('Datos del backend:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }}, []);

  return (
    <div style={{ textAlign: 'center' }}>
    <Navbar />
    <h1 class="display-2" style={{marginTop: "2%", marginBottom: "2%"}}>Mensajes</h1>
    {mensajes !== null ? (
      mensajes.map((mensaje, index) => (
        <div className="card" key={index} onClick={() => window.location.href = `/chat/${mensaje.productoId}/${mensaje.remitente}/${mensaje.destinatario}`}>
          <div className="card-body">
            <h5 className="card-title">{mensaje.texto}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {new Date(mensaje.fechaEnvio).toLocaleDateString("es-ES", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </h6>
            <p className="card-text">{mensaje.mensaje}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No hay mensajes</p>
    )}
  </div>
  );
}

export default Buzon;