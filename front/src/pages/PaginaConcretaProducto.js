import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import UserImage from '../media/user.jpg';

const PaginaConcretaProducto = () => {
  const [articulo, setArticulo] = useState({});
  const [vendedor, setVendedor] = useState({});
  const [latitud, setLatitud] = useState(0);
  const [longitud, setLongitud] = useState(0);
  const id = useParams().id;

  useEffect(() => {
    axios.get(`http://localhost:5001/productos/${id}`)
      .then(response => {
        if (response.data !== null) {
          setArticulo(response.data);
          console.log('Datos del backend:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:5004/mapa/coordenadasProducto/` + id)
      .then(response => {
        if (response.data !== null) {
          setLatitud(response.data.latitud);
          setLongitud(response.data.longitud);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  useEffect(() => {
    console.log(articulo);
    axios.get(`http://localhost:5002/usuarios/${articulo.idVendedor}`)
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

  return (
    <div>
      <Navbar />

      <div className='w-50 bg-white centrarConMargenes mt-4 tarjetaProducto'>
        <div>
          <div>
            <img src={UserImage} style={{ width: '50px', height: '50px', borderRadius: '90px', marginRight: "1%" }} alt="User" />
            <p></p>
          </div>
        </div>
        <div>
          <h1>{articulo.nombre}</h1>
        </div>
      </div>

      <div>
        <iframe
          width="600"
          height="450"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitud},${latitud}&layer=mapnik`}
          allowFullScreen
        ></iframe>
      </div>

      <div className='w-75 centrarConMargenes mt-4'>
        <h2>Imágenes del Producto</h2>
        <div className='d-flex flex-row'>
          {articulo.imagenes &&
            articulo.imagenes.map((imagen, index) => (
              <img key={index} src={imagen} alt={`Imagen ${index + 1}`} style={{ width: '150px', height: '150px', marginRight: '10px' }} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PaginaConcretaProducto;
