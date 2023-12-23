import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const CompShowMapaProducto = (position) => {


    return (
      <div>
        {position[0] !== 0 && position[1] !== 0 && (
            <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Tu ubicación</Popup>
                </Marker>
            </MapContainer>
        )}

    </div>
    );
}

export default CompShowMapaProducto;