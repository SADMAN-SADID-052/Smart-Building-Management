import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Zoom } from "react-awesome-reveal";

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [1, -34],
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [45, 45],
});

const MapComponent = () => {
  const position = [23.9999, 90.4203];

  return (
    <div
      className="mx-auto p-6 flex flex-col items-center relative z-20" 
  
    >
       <div className="text-center p-4 font-semibold text-2xl ">
             <div className="max-w-5xl mx-auto text-center mb-7">
               <Zoom duration={1000}>
                 <h2 className="text-3xl font-semibold text-[#FFB200] mt-12">
                   Location
                 </h2>
               </Zoom>
     
               <Zoom duration={1000}>
                 <p className="text-gray-300 mt-10 text-sm">
                   SmartHaven is an advanced Building Management System (BMS)
                   designed to <br />
                   streamline apartment rental, tenant management, and administrative
                   operations.
                 </p>
               </Zoom>
             </div>
           </div>
      <div className="w-full max-w-3xl  overflow-hidden shadow-xl ">
       <Zoom duration={1000}>

       <MapContainer
          center={position}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          className="rounded-lg"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position} icon={customIcon}>
            <Popup>
              <span className="font-semibold text-gray-800">
                Gazipur, Dhaka, Bangladesh
              </span>
            </Popup>
          </Marker>
        </MapContainer>
       </Zoom>
      </div>
    </div>
  );
};

export default MapComponent;
