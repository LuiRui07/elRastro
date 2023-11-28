import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Inicio.css';
import '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import Logo from '../media/logo.jpeg';


function Categorias() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/productos')
      .then(response => {
        setData(response.data); 
        console.log('Datos del backend:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center'}}>
      <nav className="navbar">
        <img src={Logo} style={{ width: '80px', height: '80px'}} ></img>
        <a href="/">Inicio</a>
        <a href="#categorias">Categorias</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Perfil</a>
      </nav>
      <header>
        <h1>elRastro</h1>
        <p>
          Bienvenido a elRastro
        </p>
        <SearchBar/>
        <ul>
          {data && data.map((producto, index) => (
            <li key= {index}>{producto.nombre}</li>
          ))}
        </ul>
      </header>

    </div>
  );
}

export default Categorias;
