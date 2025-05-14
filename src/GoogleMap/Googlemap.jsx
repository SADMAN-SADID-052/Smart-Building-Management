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
    <div className="max-w-6xl  mx-auto p-6 relative z-20">
      <div className="text-center p-4">
        <div className="max-w-5xl mx-auto text-center mb-7">
          <Zoom duration={1000}>
            <h2 className="text-4xl font-bold text-[#4DB2F6] ">Get in Touch</h2>
          </Zoom>

          <Zoom duration={1000}>
            <p className="text-sm md:text-base lg:text-lg lg:text-gray-700 mt-10">
              SmartHaven is an advanced Building Management System (BMS)
              designed to <br />
              streamline apartment rental, tenant management, and administrative
              operations.
            </p>
          </Zoom>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="overflow-hidden  shadow-xl">
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

        {/* Contact Information */}

        <div>
          <div className=" rounded-2xl shadow-md p-6 space-y-6 text-gray-800 mt-4">
            {/* Phone */}
            <div className="flex items-start space-x-4">
              <div className="">
                <img
                  className="w-12"
                  src="https://img.icons8.com/?size=96&id=ufkkYBXJSuPy&format=png"
                  alt=""
                />
              </div>
              <div>
                <h4 className="font-bold text-[#4DB2F6] text-lg">Phone</h4>
                <p className="text-sm">+8801878850591</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start space-x-4">
              <div className="">
                <img
                  className="w-14"
                  src="https://img.icons8.com/?size=96&id=YrXy82StfwT9&format=png"
                  alt=""
                />
              </div>
              <div>
                <h4 className="font-bold text-[#4DB2F6] text-lg">Email</h4>
                <p className="text-sm">support@domain.com</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start space-x-4">
              <div className="text-white bg-cyan-800 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 11c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3c4.418 0 8 3.582 8 8 0 4.2-6 10-8 10s-8-5.8-8-10c0-4.418 3.582-8 8-8z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#4DB2F6] text-lg">Address</h4>
                <p className="text-sm">Gazipur, Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h4 className="font-bold text-[#4DB2F6] text-lg">
                Available Hours
              </h4>
              <p className="text-sm">Monday - Friday: 9:00 AM – 6:00 PM</p>
              <p className="text-sm">Saturday: 10:00 AM – 4:00 PM</p>
              <p className="text-sm">Sunday: Closed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
