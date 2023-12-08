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
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <UserProvider>
      <Router>
       <Routes>
          <Route path="/" element={<App />} />
          <Route path="/paginaConcreta/:id" element={<PaginaConcretaProducto />} />
          <Route path="/SubirProducto" element={<SubirProducto />} />
        </Routes>
      </Router>
      </UserProvider>
    </React.StrictMode>
);
