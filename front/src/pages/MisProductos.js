import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../hooks/UserContentHook';



function MisProductos() {
  const [productos, setData] = useState([]);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.user !== null) {
    axios.get('http://localhost:5001/productos/productos-ofertados/' + user.user.id)
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
    <h2>Tus Productos a la venta.</h2>
    {productos !== null ? (  
      productos.map((producto, index) => (         
        <a className="col-md-4 text-decoration-none text-colour-black cartaProductos" href={`/paginaConcreta/${producto._id}`} key={index}>
          <div className="card mb-4 tarjetaProducto">
            <img src={producto.imagenes.length > 0 ? producto.imagenes[0] : 'imagenPorDefecto.jpg'} className="card-img-top imagenProducto" alt="..." />
            <div className="card-body">
              <h5 className="card-title tipoLetraPrecios fw-bolder">{producto.nombre}</h5>
              <p className="card-text fw-normal tipoLetraPrecios text-body-tertiary" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {producto.precioInicial} €
              </p>
            </div>
          </div>
        </a>
      ))
    ) : (
      <p>No has publicado nada. ¡Anímate!</p>
    )}
  </div>
  );
}

export default MisProductos;