import React, { useState } from 'react';
import axios from 'axios';

const ValoracionEstrellasDejarValoracion = ({ idUsuario, idVendedor }) => {
  const [valoracionActual, setValoracionActual] = useState(0);

  console.log('idUsuario', idUsuario);
  console.log('idVendedor', idVendedor);

  const handleClick = (rating) => {
    setValoracionActual(rating);
  };

  const funcionLlamar = () => {
    console.log('valoracionActual', valoracionActual);
    console.log('idUsuario', idUsuario);
    console.log('idVendedor', idVendedor);
    // lo del comentario
    const input = document.querySelector('.valoracion-input');
    const texto = input.value;
    console.log('texto', texto); 
    axios.post(`http://localhost:5008/valoraciones/`, {
      idUsuario: idUsuario,
      idVendedor: idVendedor,
      valoracion: valoracionActual,
      comentario: texto
    }).then(response => {
      if (response.data !== null) {
        console.log('Datos del backend:', response.data);
      }
    }
    ).catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };



  return (
    <div style={{ width: 200 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            style={{ fontSize: '4rem', marginRight: '10px' }}
            onClick={() => handleClick(rating)}
          >
            {rating <= valoracionActual ? '★' : '☆'}
          </span>
        ))}
        <input type="text" className="valoracion-input" placeholder="Deja aquí tu valoración (es opcional) " />
        <button onClick={funcionLlamar} className="btn btn-primary">Enviar</button>
      </div>
    </div>
  );
};


export default ValoracionEstrellasDejarValoracion;