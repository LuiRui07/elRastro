import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import Logo from '../media/logo.jpeg';
import UserImage from '../media/user.jpg';
import Navbar from '../components/Navbar';
import smoothState from "smoothstate";
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

  const handleSearch = (searchTerm) => {

  };

  return (
    <div style={{ textAlign: 'center' }} className='d-flex flex-column align-items-centerr'>
      <Navbar />
      mensajes
      {mensajes !== null ? mensajes.map((mensaje, index) => (
        <div className="card" key={index}>
          <div className="card-body">
            <h5 className="card-title">{mensaje.titulo}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{mensaje.fecha}</h6>
            <p className="card-text">{mensaje.mensaje}</p>
          </div>
        </div>)) : (<p>No hay mensajes</p> 
      )}
      </div>
  );
}

export default Buzon;