import React, { useState } from 'react';

const ValoracionEstrellas = ({ valoracion }) => {
  const [valoracionActual, setValoracionActual] = useState(valoracion);

  const handleClick = (rating) => {
    setValoracionActual(rating);
  };
  return (
    <div style={{ width: 200 }}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            style={{ fontSize: '20px', marginRight: '10px' }}
          >
            {rating <= valoracionActual ? '★' : '☆'}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ValoracionEstrellas;
