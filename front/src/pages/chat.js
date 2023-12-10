import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import axios from 'axios';
import UserImage from '../media/user.jpg';
import '../css/chat.css';

const Chat = () => {
    const [mensajes, setMensajes] = useState([]);
    const [producto, setProducto] = useState([]);
    const idRemitente = useParams().idRemitente;
    const idDestinatario = useParams().idDestinatario;
    const idProducto = useParams().idProducto;
    const [nuevoMensaje, setNuevoMensaje] = useState('');

    useEffect(() => {
      cargarMensajes();
      cargarProducto();
    }, [idProducto, idRemitente, idDestinatario]);  
    
    const cargarMensajes = () => {
        console.log(idProducto, idRemitente, idDestinatario)
        axios.get(`http://localhost:5010/mensajes/${idProducto}/${idRemitente}/${idDestinatario} `)
          .then(response => {
            console.log(response.data);
            if (response.data !== null) {
              setMensajes(response.data);
            }
          })
          .catch(error => {
            console.error('Error al obtener datos del backend:', error);
          });
    };

    const cargarProducto = () => {
      axios.get(`http://localhost:5001/productos/${idProducto}`)
        .then(response => {
          console.log(response.data);
          if (response.data !== null) {
            setProducto(response.data);
          }
        })
        .catch(error => {
          console.error('Error al obtener datos del backend:', error);
        });
    };

    const enviarMensaje = () => {
        axios.post(`http://localhost:5010/mensajes`, {
            remitente: idRemitente,
            destinatario: idDestinatario,
            texto: nuevoMensaje,
            fechaEnvio: Date.now(),
            productoId: idProducto,
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
        <div style={{alignItems: 'center'}}>
          <Navbar />
          <h1 style={{marginLeft: '20%', marginTop: '5%', marginBottom: '0'}} > Artículo: {producto.nombre}</h1>
          <div className="containerChat">
            <div className="mensajes">
              {mensajes.length > 0 ? (
                mensajes.map((mensaje, index) => (
                  <div key={index} id="mensaje"className={mensaje.remitente === idRemitente ? 'enviado' : 'recibido'}>
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