import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Inicio.css';
import '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import Logo from '../media/logo.jpeg';
import UserImage from '../media/user.jpg';




function Inicio() {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5001/productos')
      .then(response => {
        if (response.data !== null){
          setData(response.data); 
          console.log('Datos del backend:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  return (
    <div style={{ textAlign: 'center'}}>
      <nav className="navbar" style={{alignItems: 'center'  }}>
        <img src={Logo} style={{ width: '80px', height: '80px', borderRadius: '90px', marginRight: 'auto' }} alt="Logo" />
        <a style={{ color: 'white' }}>Buzon</a>
        <a style={{ color: 'white' }}>Perfil</a>
        <a href='/'>
          <img src={UserImage} style={{ width: '50px', height: '50px', borderRadius: '90px', marginRight: "1%" }} alt="User" />
        </a>
      </nav>
      <nav className='navbar'>
        <a style={{color: "white"}}>Categorias </a>
        <a style={{color: "white"}}>Coches </a>
        <a style={{color: "white"}}>Motos </a>
        <a style={{color: "white"}}>Moda </a>
        <a style={{color: "white"}}>Tecnología </a>
      </nav>
 
      <header className="elRastro">
        <h1>elRastro</h1>
        <p>
          Bienvenido a elRastro
        </p>
      </header>
        <SearchBar/>
        <ul>
           {data && data.map((producto, index) => (
            <li key= {index}>{producto.nombre}</li>
           ))}

        </ul>
     

    </div>
  );
}

export default Inicio;
