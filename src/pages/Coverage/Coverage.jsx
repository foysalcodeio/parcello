
import { useLoaderData } from 'react-router-dom';
import BangladeshMap from './BangladeshMap';

import 'leaflet/dist/leaflet.css'

const Coverage = () => {
    const serviceCenters = useLoaderData();
   // console.log(serviceCenters);

    return (
        <div className="max-w-4xl mx-auto px-4 md:px-10 py-10">
            <h1 className="text-3xl font-bold text-center mb-4">
                We have available 64 districts
            </h1>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search district..."
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            <BangladeshMap serviceCenters={serviceCenters} />
        </div>
    );
};

export default Coverage;
