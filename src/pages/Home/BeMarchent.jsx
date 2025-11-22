
import { motion } from 'framer-motion';
import location from '../../assets/location-merchant.png';



const BeMarchent = () => {
    return (
        <div>
            <div className="bg-no-repeat bg-[url('assets/be-a-merchant-bg.png')] bg-[#03373D] rounded-4xl px-6 py-16 mb-24">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <img
                        src={location}
                        className="max-w-sm rounded-lg "
                    />
                    <div>
                        <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our First Priority</h1>
                        <p className="py-6 text-white text-lg">
                            We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.
                        </p>
                        <button className="btn bg-[#CAEB66] text-[#1F1F1F] text-semibold rounded-full">Become a Merchant</button>
                        <button className="btn btn-outline text-[#CAEB66] ms-4  rounded-full">Earn with Profast Courier</button>
                    </div>
                </div>
            </div>


        </div>
    );
};

export default BeMarchent;