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
    <div style={{ textAlign: 'center' }} >
      <Navbar />
        {productos.length > 0 && (
            <h1 class="display-2" style={{marginTop: "2%", marginBottom: "2%"}}>Tus Productos</h1>
        )}


    {/* La sección de productos relacionados con la categoría */}
    <div className="mt-4 w-75 carrousel">
        <div className="d-flex flex-row overflow-x-auto overflow-y-hidden">
            {productos.length > 0 ? (
                productos.map((articulo, index) => (
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
                <h1 className='mt-4 tituloElRastro'>Aún no has subido nada. ¡Anímate!</h1>
            )}
        </div>
    </div>
    </div>
    );
}

export default MisProductos;