import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import ReactDOM from 'react-dom/client';
import './css/Inicio.css';
import App from './App';
import PaginaConcretaProducto from './pages/PaginaConcretaProducto';
import { BrowserRouter as Router } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <Router>
       <Routes>
          <Route path="/" element={<App />} />
          <Route path="/paginaConcreta/:id" element={<PaginaConcretaProducto />} />
        </Routes>
      </Router>
    </React.StrictMode>
);
