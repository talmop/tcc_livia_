import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Captura o duplo clique no mapa
function AddPoint({ onAddPoint }) {
  useMapEvents({
    dblclick(e) {
      onAddPoint({
        id: Date.now(),
        name: "Novo Ponto",
        coords: [e.latlng.lat, e.latlng.lng],
      });
    },
  });
  return null;
}

function CreatePoint({ onAddPoint }) {
  return (
    <div>
      <h1>Criar Pontos</h1>
      <p>🖱️ Dê um duplo clique no mapa para adicionar um novo ponto.</p>

      <MapContainer
        center={[-15.78, -47.93]}
        zoom={4}
        style={{ height: "500px", width: "100%" }}
        doubleClickZoom={false} // sem zoom no duplo clique
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <AddPoint onAddPoint={onAddPoint} />
      </MapContainer>
    </div>
  );
}

export default CreatePoint;
