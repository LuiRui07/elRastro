import React from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UserImage from '../media/user.jpg';
import Estrellas from '../components/Estrellas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const PaginaConcretaProducto = () => {
    const [categorias, setCategorias] = useState([]); // ['Electronica', 'Informatica', 'Hogar'
    const [articulo, setArticulo] = useState({});
    const [vendedor, setVendedor] = useState({});
    const [latitud, setLatitud] = useState(0);
    const [longitud, setLongitud] = useState(0);
    const [imagenes, setImagenes] = useState([]);
    const id = useParams().id;
    const [imagenActual, setImagenActual] = useState(0);

    const handleClickImagen = (index) => {
        setImagenActual(index);
    };
    useEffect(() => {
        Axios.get(`http://localhost:5001/productos/${id}`)
            .then(response => {
                if (response.data !== null) {
                    setArticulo(response.data);
                    setCategorias(response.data.categorias.split(','));
                    setImagenes(response.data.imagenes);
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
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            });
    }, [articulo]);

    useEffect(() => {
        axios.get(`http://localhost:5002/usuarios/${articulo.vendedor}`)
            .then(response => {
                if (response.data !== null) {
                    setVendedor(response.data);
                    console.log('Datos del backend:', response.data);
                }
            })
            .catch(error => {
                console.error('Error al obtener datos del backend:', error);
            })
    }, [articulo]);

    return (
        <div>
            <Navbar />
            <div className='w-50 bg-white centrarConMargenes mt-4 tarjetaProducto'>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <div className='d-flex flew-column align-items-center '>
                        <img src={UserImage} className='fotoProfile' alt="User" />
                        <div>
                            <h5 className='fs-4 fw-bolder ml-4 mr-4' >{vendedor.nombreCompleto}</h5>
                            <Estrellas valoracion={4} />
                        </div>

                    </div>
                    <div>
                        <button class="button-36" role="button">Contactar</button>
                    </div>
                </div>
                <div className='w-75 centrarConMargenes mt-4 d-flex flex-row'>
                    <div className='d-flex flex-row col-md-4 overflow-x-auto'>
                        <div className='d-flex flex-column overflow-y-auto overflow-x-hidden'>
                            {imagenes.map((imagen, index) => (
                                <img
                                    key={index}
                                    src={imagen}
                                    alt={`Imagen ${index + 1}`}
                                    className={`imagen ${index === imagenActual ? 'active imagenesLateral' : 'imagenesLateral'}`}
                                    onClick={() => handleClickImagen(index)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='d-flex flex-column col-md-8  imagenCentralGrande'>
                        <img src={imagenes[imagenActual]} alt={`Imagen ${imagenActual + 1}`} className='imagen' />

                    </div>
                </div>

                <div className='d-flex flex-justify-center align-items-center'>
                    <div className='d-flex flex-column  border-bottom w-100'>
                        <h1>{articulo.precioInicial} €</h1>
                        <p className='fs-4 fw-bolder ml-4 mr-4' >{articulo.nombre}</p>
                        {categorias.map((categoria, index) => (
                            <p className='fs-4 fw-bolder ml-4 mr-4' >{categoria}</p>
                        ))
                        }
                    </div>


                </div>
                <div className='d-flex flex-column  border-bottom w-100'>
                    <p className='fs-4 fw-bolder ml-4 mr-4' >{articulo.descripcion}</p>
                </div>
                <div className='d-flex flex-column  border-bottom w-100'>
                    <p className='fs-4 fw-bolder ml-4 mr-4'>Localizacion</p>
                    <p className=' ml-4 mr-4' >{vendedor.ciudad}</p>
                </div>
            </div>
            <div className='mapa'>
                <iframe

                    width="100%"
                    height="1000"
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${longitud},${latitud}&layer=mapnik`}
                    allowfullscreen
                ></iframe>
            </div>


        </div>


    );
};

export default PaginaConcretaProducto;