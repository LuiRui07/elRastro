import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import '../css/Inicio.css';
import '../components/SearchBar';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../hooks/UserContentHook';



function Buzon() {
  const [mensajes, setData] = useState([]);
  const [productosMensajes, setProductosMensajes] = useState({});
  const user = useContext(UserContext);

  useEffect(() => {
    if (user.user !== null) {
    axios.get('https://el-rastro-six.vercel.app/mensajes/buzon/' + user.user.id)
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
      <h1 className="display-2" style={{ marginTop: "2%", marginBottom: "2%" }}>Mensajes</h1>
      
      {mensajes.length > 0 ? (
        mensajes.map((grupo) => { 
          axios.get('https://el-rastro-six.vercel.app/productos/' + grupo._id)
            .then(response => {
              setProductosMensajes(prevState => ({
                ...prevState,
                [grupo._id]: response.data,
              }));
              console.log('Datos del backend:', response.data);
            })
            .catch(error => {
              console.error('Error al obtener datos del backend:', error);
            });
            
            const productoActual = productosMensajes[grupo._id] || {};
            console.log(productoActual);
          return (
          <div key={grupo._id}>                                                         
            <div className="card mb-3" onClick={() => window.location.href = (user.user.id !== grupo.mensajes[0].remitente) ? `/chat/${grupo._id}/${grupo.mensajes[0].remitente}/${grupo.mensajes[0].destinatario}` : `/chat/${grupo._id}/${grupo.mensajes[0].destinatario}/${grupo.mensajes[0].remitente}`}>
              <div className="card-body">
                <h5 className="card-title"> {productoActual.nombre}</h5>
                <p className="card-text"> {grupo.mensajes[0].texto}</p>
              </div>
            </div>
          </div>
        )})
      ) : (
        <h1 className='mt-4 tituloElRastro'>Aún no has hablado con nadie. ¡Anímate!</h1>
      )}
    </div>
  );
  
  
  
}

export default Buzon;