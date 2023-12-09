import Logo from '../media/logo.jpeg';
import UserImage from '../media/user.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import { UserContext } from '../hooks/UserContentHook';
import { useContext } from 'react';
import AddButton from '../media/thin-add-button-svgrepo-com.svg';

const Navbar = () => {
    const user = useContext(UserContext);

    function handleCallbackResponse(response) {
        var userObject = jwtDecode(response.credential);
        axios.get('http://localhost:5002/usuarios/correo/' + userObject.email)
            .then((response) => {
                const { data } = response;
                const { message } = data;
                if (message === "No se ha encontrado ningún usuario con ese correo.") {
                    //Por hacer, es pra registrarse, hacer un desvio de pagina a /crearUsuario
                    user.setUser({
                        email: userObject.email,
                    });
                    window.location.href = "http://localhost:3000/crearUsuario";
                    return
                } else {
                    user.setUser({
                        id: data[0]._id,
                        email: userObject.email,
                        name: userObject.name
                    });
                    localStorage.setItem("id", data[0]._id);
                }
            })
            .catch((error) => console.log(error));

    }

    useEffect(() => {
        // Verificar si el objeto 'google' está disponible
        if (window.google && window.google.accounts && window.google.accounts.id) {
            // Inicializar Google Sign-In
            window.google.accounts.id.initialize({
                client_id: '71937643255-t87vgiaf2pignoee98j3uej1q648cp5r.apps.googleusercontent.com',
                callback: handleCallbackResponse,
            });

            window.google.accounts.id.renderButton(
                document.getElementById('sigInDiv'),
                { theme: 'outline', size: 'large', text: 'signIn', width: '300px', height: '50px' }
            );
            console.log(user.user);

        } else {
            console.error("El objeto 'google' no está disponible.");
        }
    }, [handleCallbackResponse])

    return (
        <div style={{ textAlign: 'center' }}>
            <nav className="navbar" style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', padding: '1%'}}>
                {user.user != null ? <a style={{ color: 'white', paddingLeft: "2%" }}>Bienvenido {user.user.name}</a> : <div id="sigInDiv" style={{ paddingLeft: "2%" }}></div>}
                
                <div style={{ display: 'flex', alignItems: 'center' }}>
                {user.user != null && 
                    <Link to="/SubirProducto" style={{ color: 'white', paddingRight: '20%'}}>
                       <img src={AddButton} style={{ width: '50px', height: '50px', borderRadius: '90px'}} alt="SubirProducto" />
                    </Link>
                }
                    <Link to="/" style={{ paddingRight: "2%" }}>
                        <img src={Logo} style={{ width: '80px', height: '80px', borderRadius: '90px' }} alt="Logo" />
                    </Link>    
                </div>        {/* <a style={{ color: 'white' }}>Buzon</a>
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
                    <a className={"text-light tipoLetraMonse"}>
                    <Link to="/category/coches" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Coches
                    </Link>
                    </a>
                    <a className={"text-light tipoLetraMonse"}>
                    <Link to="/category/motos" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Motos
                    </Link>
                    </a>
                    <a className={"text-light tipoLetraMonse"}> 
                    <Link to="/category/moda%20y%20accesorios" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Moda
                    </Link> </a>
                    <a className={"text-light tipoLetraMonse"}> 
                    <Link to="/category/móviles%20y%20tecnología" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Tecnología
                    </Link> </a>
                    <a className={"text-light tipoLetraMonse"}> 
                    <Link to="/category/deporte%20y%20ocio" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Deporte
                    </Link> </a>
                    <a className={"text-light tipoLetraMonse"}> 
                    <Link to="/category/hogar%20y%20jardin" style={{ textDecoration: 'none', color: 'inherit' }}>
                        Hogar y Jardin
                    </Link> </a>
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
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/coches" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Coches
                            </Link></li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/tv,%20audio%20y%20foto" style={{ textDecoration: 'none', color: 'inherit' }}>
                                TV, Audio y Foto
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/consolas%20y%20videojuegos" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Consolas y VideoJuegos
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/coleccionismo" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Coleccionismo
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/otro" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Otro
                            </Link>
                            </li>

                        </ul>

                        <ul className=" w-100 d-flex   text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/motos" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Motos
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/móviles%20y%20tecnología" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Móviles y Tecnología
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/hogar%20y%20jardin" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Hogar y Jardin
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/construcción%20y%20reformas" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Construcción y Reformas
                            </Link>
                            </li>
                        </ul>

                        <ul className=" w-100 d-flex  text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/motor%20y%20accesorios" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Motor y Accesorios
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/informática%20y%20electrónica" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Informática y Electrónica
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/electrodomésticos" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Electrodomésticos
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/industria%20y%20agricultura" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Industria y Agricultura
                            </Link>
                            </li>
                        </ul>
                        <ul className=" w-100 d-flex  text-start flex-column mt-4"
                        >
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/moda%20y%20accesorios" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Moda y Accesorios
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/deporte%20y%20ocio" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Deporte y ocio
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/cine,%20libros%20y%20música" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Cine, Libros y Música
                            </Link>
                            </li>
                            <li className='text-light tipoLetraMonse'>
                            <Link to="/category/empleo" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Empleo
                            </Link></li>
                        </ul>
                    </div>
                </div>

            </nav>
        </div>
    )
}

export default Navbar