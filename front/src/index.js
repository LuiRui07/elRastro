import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './css/Inicio.css';
import App from './App';
import PaginaConcretaProducto from './pages/PaginaConcretaProducto';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import {UserProvider} from './hooks/UserContentHook';
import SubirProducto from './pages/SubirProducto';
import Chat from './pages/chat';
import CrearUsuario from './pages/CrearUsuario';
import ProductoCategoria from './pages/ProductoCategoria';
import Buzon from './pages/Buzon';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <UserProvider>
      <Router>
       <Routes>
          <Route path="/" element={<App />} />
          <Route path="/paginaConcreta/:id" element={<PaginaConcretaProducto />} />
          <Route path="/SubirProducto" element={<SubirProducto />} />
          <Route path="/chat/:id/:idProducto" element={<Chat />} />
          <Route path="/crearUsuario" element={<CrearUsuario />} />
          <Route path='/category/:categoria' element={<ProductoCategoria />} />
          <Route path='/buzon' element={<Buzon />} />
        </Routes>
      </Router>
      </UserProvider>
    </React.StrictMode>
);
