import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../hooks/UserContentHook';



function MisProductos() {
  const [productos, setData] = useState([]);
  const [pujas, setPujas] = useState([]);
  const [productosPujados, setProductosPujados] = useState({});
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.user !== null) {
    axios.get('https://mi-repo-ten.vercel.app/productos/productos-ofertados/' + user.user.id)
      .then(response => {
        setData(response.data);
        console.log('Datos del backend:', response.data);
      })
      .catch(error => {
        console.error('Error al obtener datos del backend:', error);
      });
  }}, []);

  useEffect(() => {
    axios.get('https://mi-repo-ten.vercel.app/pujas/pujas-realizadas/' + user.user.id)
        .then(response => {
            setPujas(response.data);
            console.log('Datos del backend Pujas:', response.data);
        })
        .catch(error => {
            console.error('Error al obtener datos del backend:', error);
        });
    }, []);
    
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

    {pujas.length > 0 && (
            <h1 class="display-2" style={{marginTop: "2%", marginBottom: "2%"}}>Tus Pujas</h1>
    )}

    <div className="mt-4 w-75 carrousel">
        <div className="d-flex flex-row overflow-x-auto overflow-y-hidden">
            {pujas.length > 0 ? (
                pujas.map((puja, index) => {
                    axios.get('https://mi-repo-ten.vercel.app/productos/' + puja.producto)
                        .then(response => {
                            setProductosPujados(prevState => ({
                                ...prevState,
                                [puja.producto]: response.data
                            }));
                            console.log('Datos del backend para', puja.producto, ':', response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener datos del backend:', error);

                        });

                        const productoActual = productosPujados[puja.producto] || {};
                        console.log('Producto actual:', productoActual)
                    return (
                            <a
                            className="col-md-5 text-decoration-none text-colour-black cartaProductos"
                            href={`/paginaConcreta/${puja.producto}`}
                            key={index}
                        >
                        
                        <div className=" ">
                            <div className="row g-0">
                                <div className="col-md-6 d-flex flex-column text-start distancia">
                                    <h5 className="tipoLetraPrecios fw-bolder text-body">
                                        {puja.precio} €
                                        {puja._id === productoActual.pujaGanadora && ( 
                                                          <img 
                                                          style={{ width: "7%" }} 
                                                          src={Date.parse(productoActual.fechaDeCierre) < Date.now() 
                                                              ? "https://media.istockphoto.com/id/691856234/vector/flat-round-check-mark-green-icon-button-tick-symbol-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=hXL5nXQ2UJlh4yzs2LyZC4GtctQG0fs-mk30GPPbhbQ=" 
                                                              : "https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Eo_circle_yellow_checkmark.svg/1024px-Eo_circle_yellow_checkmark.svg.png"} 
                                                          alt={Date.parse(productoActual.fechaDeCierre) < Date.now() ? "tick" : "tick2"} 
                                                      />
                                        )}
                                        {puja._id !== productoActual.pujaGanadora && (
                                              <img 
                                              style={{ width: "7%" }} 
                                              src={Date.parse(productoActual.fechaDeCierre) < Date.now() 
                                                  ? "https://as2.ftcdn.net/v2/jpg/02/50/79/73/1000_F_250797393_yLNptJKu7T6NSm3c70tidf2fEBUq6yNu.jpg" 
                                                  : "https://img.freepik.com/premium-vector/yellow-cross-illustration_637394-1884.jpg?w=2000"} 
                                              alt={Date.parse(productoActual.fechaDeCierre) < Date.now() ? "tick" : "tick2"} 
                                          />
                                        )}
                                    </h5>
                                    {productoActual.nombre} 
                                    <p
                                        className="fw-normal tipoLetraPrecios text-body-tertiary"
                                        style={{
                                            display: "-webkit-box",
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: "vertical",
                                            overflow: "hidden",
                                        }}
                                    >
                                        {new Date(puja.fechaDeCreacion).toLocaleDateString("es-ES", {
                                            year: "numeric",
                                            month: "numeric",
                                            day: "numeric",
                                            hour: "numeric",
                                            minute: "numeric",
                                            second: "numeric",
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </a>
                )})  
            ) : (
                <h1 className='mt-4 tituloElRastro'>Aún no has pujado. ¡Anímate!</h1>
            )}
        </div>
    </div>

    </div>
    );
}

export default MisProductos;