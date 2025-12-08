// BangladeshMap.jsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";

// Center of Bangladesh
const position = [23.685, 90.3563];

// Custom marker icon
const customIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Component to move map to searched location
const FlyToLocation = ({ coords }) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      map.flyTo(coords, 10, { duration: 1.5 });
    }
  }, [coords, map]);

  return null;
};

const BangladeshMap = ({ serviceCenters }) => {
  const [searchText, setSearchText] = useState("");
  const [activeCoords, setActiveCoords] = useState(null);
  const [activeDistrict, setActiveDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    const district = serviceCenters.find((d) =>
      d.district.toLowerCase().includes(searchText.toLowerCase())
    );

    if (district) {
      setActiveCoords([district.latitude, district.longitude]);
      setActiveDistrict(district.district);
    } else {
      alert("District not found");
    }
  };

  return (
    <div className="h-[800px] w-full rounded-lg overflow-hidden shadow-lg relative">

      {/* Search box inside map */}
      <form
        onSubmit={handleSearch}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 w-full z-[1000] max-w-md px-4 flex"
      >
        <input
          type="text"
          placeholder="Search district..."
          className="flex-1 px-4 py-3 border rounded-md outline-none bg-white"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          type="submit"
          className="ml-2 px-4 py-3 bg-blue-600 text-white rounded-md"
        >
          Search
        </button>
      </form>

      <MapContainer
        center={position}
        zoom={7}
        scrollWheelZoom={true}
        className="h-full w-full"
      >
        <FlyToLocation coords={activeCoords} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {serviceCenters.map((center, idx) => (
          <Marker
            key={idx}
            position={[center.latitude, center.longitude]}
            icon={customIcon}
          >
            <Popup>
              <strong
                style={{
                  color:
                    activeDistrict === center.district ? "red" : "black",
                }}
              >
                {center.district}
              </strong>
              <br />
              {center.covered_area.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default BangladeshMap;
