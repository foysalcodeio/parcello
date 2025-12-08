// Coverage.jsx
import { useLoaderData } from "react-router-dom";
import BangladeshMap from "./BangladeshMap";
import "leaflet/dist/leaflet.css";

const Coverage = () => {
  const serviceCenters = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-10 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">
        We have available 64 districts
      </h1>

      <BangladeshMap serviceCenters={serviceCenters} />
    </div>
  );
};

export default Coverage;
