import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserImage from '../media/user.jpg';
import Navbar from '../components/Navbar';


const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setMessages([...messages, { text: newMessage, sender: 'comprador' }]);
      setNewMessage('');
    };
  
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