import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const Googlemap = () => {
    // ✅ Map settings
    const mapContainerStyle = { width: "100%", height: "350px" };
    const apartmentLocation = { lat: 23.8103, lng: 90.4125 }; // Example: Dhaka, Bangladesh

    return (
        <div className="container mx-auto p-6">
            {/* Other sections of the Home Page */}
            <section className="my-12 bg-gray-100 p-8 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-center mb-4">📍 Find Us</h2>
                <p className="text-lg text-gray-600 text-center">
                    Our apartment is located in a prime area with easy access to public transport and major landmarks.  
                    Below is the exact location:
                </p>

                {/* Google Map */}
                <div className="mt-6">
                    <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
                        <GoogleMap
                            mapContainerStyle={mapContainerStyle}
                            center={apartmentLocation}
                            zoom={15}
                        >
                            <Marker position={apartmentLocation} />
                        </GoogleMap>
                    </LoadScript>
                </div>
            </section>
        </div>
    );
};

export default Googlemap;
