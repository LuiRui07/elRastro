import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserImage from '../media/user.jpg';
import Navbar from '../components/Navbar';


const Chat = () => {
    const [Vendedor, setVendedor] = useState({});
    const [Comprador, setComprador] = useState({});
    const [mensajes, setMensajes] = useState([]);
    const idComprador = useParams().id;
    const idVendedor = useParams().id;
  
    useEffect(() => {
        Axios.get(`http://localhost:5002/usuarios/${idComprador}`)
            .then(response => {
                if (response.data !== null) {
                    setComprador(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:5002/usuarios/${idVendedor}`)
            .then(response => {
                if (response.data !== null) {
                    setVendedor(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:5007/mensajes/${idComprador}/${idVendedor}`)
            .then(response => {
                if (response.data !== null) {
                    setMensajes(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, []);

  
    return (
      <div>
        <Navbar />
        <div className="w-50 bg-white centrarConMargenes mt-4 tarjetaChat">
          <div className="containerChat">
            {messages.map((message, index) => (
              <div key={index} className={message.sender === 'comprador' ? 'mensajeComprador' : 'mensajeVendedor'}>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit}>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              rows="3"
            />
            <button type="submit" className="button-36" role="button">
              Enviar
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default Chat;