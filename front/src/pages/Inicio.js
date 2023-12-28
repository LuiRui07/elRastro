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



function Inicio() {
  const [articulos, setData] = useState([]);
  const [filteredArticulos, setFilteredArticulos] = useState(articulos);
  const user = useContext(UserContext);

  useEffect(() => {
    axios.get('http://localhost:5001/productos')
      .then(response => {
        if (response.data !== null) {
          if (user.user !== null) {
            const filteredData = response.data.filter((articulo) => articulo.vendedor !== user.user.id);
            setData(filteredData);
            setFilteredArticulos(filteredData);
            console.log('Datos del backend:', filteredData);
          } else {
            console.log('Usuario no logueado');
            setData(response.data);
            setFilteredArticulos(response.data);
            console.log('Datos del backend:', response.data);
          }  
        }
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim() === '') {
      // Si el término de búsqueda está vacío, muestra todos los productos
      setFilteredArticulos(articulos);
    } else {
      // Filtra los productos por coincidencia con el término de búsqueda
      const filteredData = articulos.filter((articulo) =>
        articulo.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredArticulos(filteredData);
    }
  };

  return (
    <div style={{ textAlign: 'center' }} className='d-flex flex-column align-items-centerr'>
      <Navbar />
      <header className="elRastro">
        <h1 className='mt-4 tituloElRastro'>elRastro</h1>
        <p className=' tipoLetraTrebuchet'>
          Bienvenido a elRastro, tu sitio de compra y venta de productos de segunda mano favorito.
        </p>
      </header>
      <SearchBar onSearch={handleSearch} />

          <h1 className='tipoLetraTrebuchet text-start w-75  centrarh1'>Lo mejor al mejor precio:</h1>
          <div className="mt-4 w-75 carrousel ">
            <div className="d-flex flex-row overflow-x-auto overflow-y-hidden ">
              {
                filteredArticulos.map((articulo, index) => (
                  <a className="col-md-5 text-decoration-none text-colour-black cartaProductos" href={`/paginaConcreta/${articulo._id}`} key={index}>
                    <div className=" " >
                      <div className="row g-0">
                        <div className="col-md-10 mt-4 item-center">
                          {/* Muestra la primera imagen asociada al artículo pero limitada a cierto tamaño */}
                          {articulo.imagenes.length > 0 && <img src={articulo.imagenes[0]} className="imagenProducto" alt="..." />}
                        </div>
                        <div className="col-md-6 d-flex flex-column text-start distancia">
                          <h5 className="tipoLetraPrecios fw-bolder text-body"> {articulo.nombre}</h5>
                          <p className="fw-normal tipoLetraPrecios text-body-tertiary" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{articulo.precioInicial} €</p>
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