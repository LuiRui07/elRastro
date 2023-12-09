import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../components/Navbar.js';
import { UserContext } from '../hooks/UserContentHook';

const SubirProducto = () => {
  const user = useContext(UserContext);
  const imagenes = [];
  const [showAlert, setShowAlert] = useState(false);

  const handleClick = () => {
    setShowAlert(true);
  };

  const funcionGuardar = (e) => {
    e.preventDefault();
    const descripcion = e.target.descripcion.value;
    const precioInicial = e.target.precioInicial.value;
    const categorias = e.target.categorias.value;
    const nombre = e.target.nombre.value;
    const fechaDeCierre = e.target.fechaDeCierre.value;
    const peso = e.target.peso.value;
    const imagenes = e.target.imagenes.files;

    // Mapa de promesas de subida de imágenes
    const cloudinaryUploadPromises = Array.from(imagenes).map((imagen) => {
      const formData = new FormData();
      formData.append('imagen', imagen);

      // Devolvemos la promesa de la subida de la imagen
      return axios.post('http://localhost:5006/cloudinary/subir', formData)
        .then((response) => response.data.secure_url);

    });

    // Resolvemos todas las promesas de subida de imágenes
    Promise.all(cloudinaryUploadPromises)
      .then((imagenesUrls) => {
        const producto = {
          vendedor: user._id,
          pujaGanadora: null,
          descripcion: descripcion,
          precioInicial: precioInicial,
          categorias: categorias,
          fechaDeCreacion: new Date(),
          nombre: nombre,
          fechaDeCierre: fechaDeCierre,
          peso: peso,
          imagenes: imagenesUrls,
        };
        console.log('Producto a crear:', producto);
        // Ahora, puedes hacer la solicitud para crear el producto
        return axios.post('http://localhost:5001/productos/', producto);
      })
      .then((response) => {
        const { data } = response;
        const { message } = data;
        console.log(data);

        Swal.fire({
          title: 'Producto publicado correctamente.',
          text: 'Ya está todo listo, se te redirigirá a la página principal.',
          icon: 'success',
          confirmButtonText: 'Correcto',
          didClose: () => {
            window.location.href = 'http://localhost:3000/';
          },
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const categoriasDefault = [
    "Coches", "Motos", "Motor y Accesorios",
    "Móviles y Tecnología", "Informatica y Electronica", "TV, Audio y Foto", "Consolas y VideoJuegos", "Electrodomesticos",
    "Hogar y Jardin", "Construccion y reformas", "Industria y Agricultura",
    "Moda y Accesorios", "Coleccionismo", "Deporte y Ocio", "Cine, Libros y Musica", "Empleo", "Otro"
  ];

 return (
    <div>
      <NavBar />
      <h1>Subir Producto</h1>
      <form onSubmit={funcionGuardar}>
        <label>Nombre:</label>
        <input type="text" name="nombre" required/>
        <label>Descripción:</label>
        <input type="text" name="descripcion" required/>
        <label>Precio Inicial (euros):</label>
        <input type="number" name="precioInicial" required />
        <label> Peso (gramos):</label>
        <input type="number" name="peso" required />
        <label>Categoría:</label>
        <select name="categorias" required>
          <option value="" disabled>
              Selecciona una categoría
          </option>
          {categoriasDefault.map((categorias) => (
              <option key={categorias} value={categorias}>
                {categorias}
              </option>
          ))}
        </select>
        <label>Fecha de Cierre:</label>
        <input type="datetime-local" name="fechaDeCierre" required/>
        <label>Imágenes (Máximo 5): </label>
        <input type="file" name="imagenes" multiple required />
        <button type="submit">Subir Producto</button>
        </form>
    </div>
);
};

export default SubirProducto;

