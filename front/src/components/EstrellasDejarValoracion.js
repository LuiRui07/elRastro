import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ValoracionEstrellasDejarValoracion = ({ idUsuario, idVendedor }) => {
  const [valoracionActual, setValoracionActual] = useState(0);
  const handleClick = (rating) => {
    setValoracionActual(rating);
  };

  const [valor, setValor] = useState();
  const [valoraciones, setValoraciones] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5008/valoraciones/valoracion/${idVendedor}/${idUsuario}`).then(response => {
    if (response.data !== null) {
        console.log('Datos del backend:', response.data);
        setValoraciones(response.data);
      }
    }).catch(error => {
      console.error('Error al obtener datos del backend:', error);
    }
    );
  },[]);

const handleChange = (e) => {
  setValor(e.target.value);
};

  const funcionLlamar = () => {
    console.log('idVendedor:', idVendedor);
    console.log('idUsuario:', idUsuario);
    axios.post(`http://localhost:5008/valoraciones/`, {
      comprador: idUsuario,
      vendedor: idVendedor,
      valoracion: valoracionActual,
      comentario: valor,
    }).then(response => {
      if (response.data !== null) {
        console.log('Datos del backend:', response.data);
      }
      window.location.reload();
    }).catch(error => {
      console.error('Error al obtener datos del backend:', error);
    });
  };


  console.log('valoraciones:', valoraciones);
  return (
    <div>
    {valoraciones != null ? <div> ya has valorado a este usuario</div> :
      <div>
        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            style={{ fontSize: '4rem', marginRight: '10px' }}
            onClick={() => handleClick(rating)}
          >
            {rating <= valoracionActual ? '★' : '☆'}
          </span>
        ))}
        <input className="valoracion-input" type="text" onChange={handleChange} placeholder='Deja aqui tu valoracion' />
        <button style={{marginLeft: '3%'}} onClick={funcionLlamar} className="btn btn-primary">Enviar</button>
      </div>}
    </div>
  );
};

export default ValoracionEstrellasDejarValoracion;
