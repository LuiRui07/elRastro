import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import UserImage from '../media/user.jpg';

const Chat = () => {
    const [mensajes, setMensajes] = useState([]);
    const idVendedor = useParams().id;
    const [nuevoMensaje, setNuevoMensaje] = useState('');

    useEffect(() => {
        cargarMensajes();
      }, []);
    
      const cargarMensajes = () => {
        Axios.get(`http://localhost:5000/mensajes/${idVendedor}`)
          .then(response => {
            if (response.data !== null) {
              setMensajes(response.data);
            }
          })
          .catch(error => {
            console.error('Error al obtener datos del backend:', error);
          });
      };

    const enviarMensaje = () => {
        Axios.post(`http://localhost:5000/mensajes`, {
            destinatario: idVendedor,
            texto: nuevoMensaje,
            fechaEnvio: Date.now()
        })
          .then(response => {
            cargarMensajes();
            setNuevoMensaje('');
          })
          .catch(error => {
            console.error('Error al enviar mensaje:', error);
          });
      };
  
      return (
        <div>
          <Navbar />
          <div className="containerChat">
            <div className="mensajes">
              {mensajes.length > 0 ? (
                mensajes.map((mensaje, index) => (
                  <div key={index} className={mensaje.destinatario === idVendedor ? 'mensaje enviado' : 'mensaje recibido'}>
                    {mensaje.texto}
                  </div>
                ))
              ) : (
                <p>No hay mensajes.</p>
              )}
            </div>
            <div className="nuevo-mensaje">
              <textarea
                value={nuevoMensaje}
                onChange={(e) => setNuevoMensaje(e.target.value)}
                placeholder="Escribe tu mensaje..."
              />
              <button onClick={enviarMensaje}>Enviar</button>
            </div>
          </div>
        </div>
      );
    };
    
    export default Chat;