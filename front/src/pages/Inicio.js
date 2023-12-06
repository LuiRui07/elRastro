import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import SearchBar from '../components/SearchBar';
import Logo from '../media/logo.jpeg';
import UserImage from '../media/user.jpg';
import Navbar from '../components/Navbar';
import smoothState from "smoothstate";



function Inicio() {
  const [articulos, setData] = useState([]);



  useEffect(() => {
    axios.get('http://localhost:5001/productos')
      .then(response => {
        if (response.data !== null) {
          setData(response.data);
          console.log('Datos del backend:', response.data);
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  const handleSearch = (searchTerm) => {

  };

  return (
    <div style={{ textAlign: 'center' }} className='d-flex flex-column align-items-centerr'>
      <Navbar />

      <header className="elRastro">
        <h1 className='mt-4 tituloElRastro'>elRastro</h1>
        <p className=' tipoLetraEphesis'>
          Bienvenido a elRastro, tu sitio de compra y venta de productos de segunda mano favorito.
        </p>
      </header>
      <SearchBar onSearch={handleSearch} />

      <h1 className='tipoLetraEphesis text-start w-75  centrarh1'>Lo mejor al mejor precio</h1>
      <div className="mt-4 w-75 carrousel ">
        <div className="d-flex flex-row overflow-x-auto overflow-y-hidden ">
          {
            articulos.map((articulo, index) => (
              <a className="col-md-5 text-decoration-none text-colour-black cartaProductos" href={`/paginaConcreta/${articulo._id}`} key={index}>
                <div className=" " >
                  <div className="row g-0">
                    <div className="col-md-10 mt-4 item-center">
                      {/* Muestra la primera imagen asociada al artículo */}
                      {articulo.imagenes.length > 0 && <img src={articulo.imagenes[0]} className="img-fluid rounded-start float-start" alt="..." />}
                    </div>
                    <div className="col-md-6 d-flex flex-column text-start distancia">
                      <h5 className="tipoLetraPrecios fw-bolder text-body">{articulo.precioInicial} euros</h5>
                      <p className="fw-normal tipoLetraPrecios text-body-tertiary">{articulo.descripcion}</p>
                    </div>
                  </div>
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Inicio;