import React, { useState } from 'react';
import axios from 'axios';

const SubirProducto = () => {
  const categoriasDefault = [
    "Coches", "Motos", "Motor y Accesorios",
    "Móviles y Tecnología", "Informatica y Electronica", "TV, Audio y Foto", "Consolas y VideoJuegos", "Electrodomesticos",
    "Hogar y Jardin", "Construccion y reformas", "Industria y Agricultura",
    "Moda y Accesorios", "Coleccionismo", "Deporte y Ocio", "Cine, Libros y Musica", "Empleo", "Otro"
  ];

  const [productoData, setProductoData] = useState({
    vendedor: '654fcf94b60267338d705b52',
    descripcion: '',
    precioInicial: 0,
    categorias: '',
    fechaDeCreacion: null,
    nombre: '',
    fechaDeCierre: '',
    peso: 0,
    imagenes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductoData({ ...productoData, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append('imagenes', e.target.files[i]);
    }

    try {
      const response = await axios.post('http://localhost:5006/cloudinary/subir', formData);
      const imageUrls = response.data.map(image => image.secure_url);

      setProductoData({
        ...productoData,
        imagenes: [...productoData.imagenes, ...imageUrls],
      });
    } catch (error) {
      console.error('Error al subir las imágenes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setProductoData({
      ...productoData,
      fechaDeCreacion: new Date(),
    });

    try {
      const response = await axios.post('http://localhost:5001/productos/', productoData);
      console.log('Producto creado:', response.data);
    } catch (error) {
      console.error('Error al crear el producto:', error);
    }
  };

  return (
    <div>
      <h1>Subir Producto</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:
          <input type="text" name="nombre" value={productoData.nombre} onChange={handleInputChange} />
        </label>
        <label>
          Descripción:
          <input type="text" name="descripcion" value={productoData.descripcion} onChange={handleInputChange} />
        </label>
        <label>
          Precio Inicial (euros):
          <input type="number" name="precioInicial" value={productoData.precioInicial} onChange={handleInputChange} />
        </label>
        <label>
          Peso (gramos):
          <input type="number" name="peso" value={productoData.peso} onChange={handleInputChange} />
        </label>
        <label>
          Categoría:
          <select
            name="categorias"
            value={productoData.categorias}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Selecciona una categoría
            </option>
            {categoriasDefault.map((categorias) => (
              <option key={categorias} value={categorias}>
                {categorias}
              </option>
            ))}
          </select>
        </label>
        <label>
          Fecha de Cierre:
          <input
            type="datetime-local"
            name="fechaDeCierre"
            value={productoData.fechaDeCierre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Imágenes:
          <input type="file" name="imagenes" onChange={handleImageUpload} multiple />
        </label>

        <button type="submit">Subir Producto</button>
      </form>
    </div>
  );
};

export default SubirProducto;
