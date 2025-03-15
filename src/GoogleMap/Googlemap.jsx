import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [45, 45],
});

const MapComponent = () => {
  const position = [23.9999, 90.4203];

  return (
    <div className="mx-auto p-6 flex flex-col items-center relative z-20"
    style={{
      backgroundImage:
        "url('https://img.freepik.com/premium-photo/3d-geographic-information-system-map-featuring-red-location-pins-spatial-data-connections_444642-67692.jpg?ga=GA1.1.94081497.1723952170&semt=ais_hybrid')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 50,
    }}
    >
      <h2 className="text-center text-2xl font-bold mb-4 text-[#EAD196]">Location</h2>
      <div className="w-full max-w-3xl  overflow-hidden shadow-xl ">
        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }} className="rounded-lg">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              <span className="font-semibold text-gray-800">Gazipur, Dhaka, Bangladesh</span>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default MapComponent;
