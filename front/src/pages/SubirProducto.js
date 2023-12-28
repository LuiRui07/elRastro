import React, { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NavBar from '../components/Navbar.js';
import { UserContext } from '../hooks/UserContentHook';
import '../css/SubirProducto.css';

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
          vendedor: user.user.id,
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
    "Móviles y Tecnología", "Informática y Electrónica", "TV, Audio y Foto", "Consolas y VideoJuegos", "Electrodomésticos",
    "Hogar y Jardin", "Construcción y reformas", "Industria y Agricultura",
    "Moda y Accesorios", "Coleccionismo", "Deporte y Ocio", "Cine, Libros y Música", "Empleo", "Otro"
  ];

  return (
    <div>
      <NavBar />
      <div className="container-lg mt-4 mb-5">
        <div className="card" style={{ width: "100%" }}>
          <div className="card-header"></div>
          <div className="card-body">
            <h1 className="card-title Subir" style={{ textAlign: "center" }}>
              Subir Producto
            </h1>
            <form onSubmit={funcionGuardar}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre del Artículo
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  name="nombre"
                  required
                />
              </div>
              <div className="mb-4 ms-2" >
                <label htmlFor="desc" className="form-label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="desc"
                  name="descripcion"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="chico" className="form-label">
                  Precio Inicial
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="chico"
                    name="precioInicial"
                    required
                  />
                  <span className="input-group-text">€</span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="chico" className="form-label">
                  Peso
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    className="form-control"
                    id="chico"
                    name="peso"
                    required
                  />
                  <span className="input-group-text">g</span>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="categorias" className="form-label">
                  Categoría
                </label>
                <select
                  className="form-select SelectCategoria"
                  name="categorias"
                  required
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
              </div>
              <div className="mb-3">
                <label htmlFor="fechaDeCierre" className="form-label">
                  Fecha de Cierre
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="fechaDeCierre"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="imagenes" className="form-label">
                  Imágenes (Máximo 5)
                </label>
                <input
                  type="file"
                  className="form-control"
                  name="imagenes"
                  multiple
                  required
                />
              </div>
              <button
                className="btn btn-primary"
                style={{ marginLeft: "2%" }}
                type="submit"
              >
                Subir Producto
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
    
};

export default SubirProducto;

