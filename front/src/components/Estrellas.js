import React, { useState } from 'react';

const ValoracionEstrellas = ({ valoracion, numeroValoraciones }) => {
  return (
    <div style={{ width: '200', paddingLeft: '10%'}}>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {[1, 2, 3, 4, 5].map((rating) => (
          <span
            key={rating}
            style={{ fontSize: '20px', marginRight: '10px' }}
          >
            {rating <= valoracion ? '★' : '☆'}
          </span>

        ))}
        <p> ({numeroValoraciones})</p>
      </div>
    </div>
  );
};

export default ValoracionEstrellas;
