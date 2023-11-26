import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Inicio.css';

function Inicio() {
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
    <div>
      <nav className="navbar">
        <a href="/">Inicio</a>
        <a href="#nosotros">Nosotros</a>
        <a href="#servicios">Servicios</a>
        <a href="#contacto">Contacto</a>
      </nav>
      <header>
        <h1>elRastro</h1>
        <p>
          Bienvenido a elRastro
        </p>
        <ul>
          {data && data.map((producto, index) => (
            <li key= {index}>{producto.nombre}</li>
          ))}
        </ul>
      </header>

    </div>
  );
}

export default Inicio;
