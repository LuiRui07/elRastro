import Logo from '../media/logo.jpeg';
import UserImage from '../media/user.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import {jwtDecode} from 'jwt-decode';
import { UserContext } from '../hooks/UserContentHook';
import { useContext } from 'react'; 
const Navbar = () => {
    const user = useContext(UserContext);
    function handleCallbackResponse(response) {
        console.log(response.credential);
        var userObject = jwtDecode(response.credential);
        user.setUser({
            email: userObject.email,
            name: userObject.name,
            picture: userObject.picture
        });
        console.log(userObject);
    }
    useEffect(() => {
        google.accounts.id.initialize({
            client_id: '71937643255-t87vgiaf2pignoee98j3uej1q648cp5r.apps.googleusercontent.com',
            callback: handleCallbackResponse,
        }
        );
        google.accounts.id.renderButton(
            document.getElementById("sigInDiv"),
            { theme: "outline", size: "large", text: "signIn", width: "300px", height: "50px" }
        );
        google.accounts.id.prompt();

    }, [])
    return (
        <div style={{ textAlign: 'center' }}>
            <nav className="navbar" style={{ alignItems: 'center' }}>
                {user.user != null ? <a style={{ color: 'white' }}>Bienvenido {user.user.name}</a> : <div id="sigInDiv"></div>}
                <Link to="/">
                    <img src={Logo} style={{ width: '80px', height: '80px', borderRadius: '90px' }} alt="Logo" />
                </Link>                {/* <a style={{ color: 'white' }}>Buzon</a>
                <a style={{ color: 'white' }}>Perfil</a>
                <a href='/'>
                    <img src={UserImage} style={{ width: '50px', height: '50px', borderRadius: '90px', marginRight: "1%" }} alt="User" />
                </a> */}
            </nav>
            <nav className='navbar '>
                <div className='w-100 d-flex justify-content-around '>
                    <a
                        style={{ color: "white" }}
                        className="menu-toggle tipoLetraMonse"
                        onMouseEnter={() => {
                            document.querySelector('.categorias').style.display = 'flex';
                            document.querySelector('.menu-toggle').style.fontWeight = 'bold';
                            document.querySelector('.menu-toggle').style.borderBottom = '2px solid white';
                            document.querySelector(".categorias").style.flexdirection = 'row';
                        }}
                        onMouseLeave={() => {
                            document.querySelector('.categorias').style.display = 'none'
                            document.querySelector('.menu-toggle').style.fontWeight = 'normal';
                            document.querySelector('.menu-toggle').style.borderBottom = 'none';
                        }}

                    >
                        Categoria
                    </a>
                    <a className={"text-light tipoLetraMonse"}> Coches </a>
                    <a className={"text-light tipoLetraMonse"}> Motos </a>
                    <a className={"text-light tipoLetraMonse"}> Moda </a>
                    <a className={"text-light tipoLetraMonse"}> Tecnología </a>
                    <a className={"text-light tipoLetraMonse"}> Deporte </a>
                    <a className={"text-light tipoLetraMonse"}> Hogar </a>
                </div>
                <div
                    className='w-100'
                    onMouseEnter={() => {
                        document.querySelector('.categorias').style.display = 'flex';
                        document.querySelector('.menu-toggle').style.fontWeight = 'bold';
                        document.querySelector('.menu-toggle').style.borderBottom = '2px solid white';
                        document.querySelector(".categorias").style.flexdirection = 'row';

                    }

                    }
                    onMouseLeave={() => {
                        document.querySelector('.categorias').style.display = 'none'
                        document.querySelector('.menu-toggle').style.fontWeight = 'normal';
                        document.querySelector('.menu-toggle').style.borderBottom = 'none';
                    }}

                >
                    <div className="categorias flex-row none">


                        <ul className=" w-100 d-flex  text-start flex-column mt-4 none"
                        >
                            <li className='text-light tipoLetraMonse'>Coches</li>
                            <li className='text-light tipoLetraMonse'>TV, Audio y Foto</li>
                            <li className='text-light tipoLetraMonse'>Consolas y VideoJuegos</li>
                            <li className='text-light tipoLetraMonse'>Coleccionismo</li>
                            <li className='text-light tipoLetraMonse'>Otro</li>

                        </ul>

                        <ul className=" w-100 d-flex   text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>Motos</li>
                            <li className='text-light tipoLetraMonse'>Moviles y Tecnología</li>
                            <li className='text-light tipoLetraMonse'>Hogar y Jardin</li>
                            <li className='text-light tipoLetraMonse'>Construccion y reformas</li>
                        </ul>

                        <ul className=" w-100 d-flex  text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>Motor y Accesorios</li>
                            <li className='text-light tipoLetraMonse'>Informatica y Electronica</li>
                            <li className='text-light tipoLetraMonse'>Electrodomesticos</li>
                            <li className='text-light tipoLetraMonse'>Industria y Agricultura</li>
                        </ul>
                        <ul className=" w-100 d-flex  text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>Moda y Accesorios</li>
                            <li className='text-light tipoLetraMonse'>Deporte y Ocio</li>
                            <li className='text-light tipoLetraMonse'>Cine, Libros y Musica</li>
                            <li className='text-light tipoLetraMonse'>Empleo</li>
                        </ul>
                    </div>
                </div>

            </nav>
            <Link to="/SubirProducto" style={{ color: 'white' }}>
                Subir Producto
                </Link>
        </div>
    )
}

export default Navbar