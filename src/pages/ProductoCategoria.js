import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../css/Inicio.css';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProductoCategoria = () => {
  const [articulos, setData] = useState([]);
  const { categoria } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5001/productos/productos-categoria/${categoria}`)
      .then(response => {
        if (response.data !== null) {
          setData(response.data);
          console.log('Datos del backend:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, [categoria]);

  return (
    <div >
      <Navbar />
        {/* Asegúrate de ajustar el título según tus necesidades */}
        {articulos.length > 0 && (
            <h1 className='mt-4 tituloElRastro'>Productos relacionados con: {categoria}</h1>
        )}


    {/* La sección de productos relacionados con la categoría */}
    <div className="mt-4 w-75 carrousel">
        <div className="d-flex flex-row overflow-x-auto overflow-y-hidden">
            {articulos.length > 0 ? (
                articulos.map((articulo, index) => (
                    <a
                        className="col-md-5 text-decoration-none text-colour-black cartaProductos"
                        href={`/paginaConcreta/${articulo._id}`}
                        key={index}
                    >
                        <div className=" ">
                            <div className="row g-0">
                                <div className="col-md-10 mt-4 item-center">
                                    {articulo.imagenes.length > 0 && (
                                        <img
                                            src={articulo.imagenes[0]}
                                            className="imagenProducto"
                                            alt="..."
                                        />
                                    )}
                                </div>
                                <div className="col-md-6 d-flex flex-column text-start distancia">
                                    <h5 className="tipoLetraPrecios fw-bolder text-body">
                                        {articulo.nombre} 
                                    </h5>
                                    <p
                                        className="fw-normal tipoLetraPrecios text-body-tertiary"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {articulo.precioInicial} €
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))
            ) : (
                <h1 className='mt-4 tituloElRastro'>Lo sentimos, no hay productos relacionados con: {categoria}</h1>
            )}
        </div>
    </div>
    </div>
    );
}

export default ProductoCategoria;
