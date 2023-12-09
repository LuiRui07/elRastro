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
                    <Link to="/SubirProducto" style={{ color: 'white', paddingRight: '20%'}}>
                       <img src={AddButton} style={{ width: '50px', height: '50px', borderRadius: '90px'}} alt="SubirProducto" />
                    </Link>

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
        </div>
    )
}

export default Navbar