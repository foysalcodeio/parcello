import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useState } from 'react';



const BeARider = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm();

    const { user } = useAuth;
    console.log('users are ', user)
    const [selectedRegion, setSelectedRegion] = useState("");

    const serviceCenters = useLoaderData();
    const axiosSecure = useAxiosSecure();
    //const serviceCenters = useLoaderData();
    const regionsDuplicate = serviceCenters.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];
    // explore useMemo useCallback
    const districtsByRegion = (region) => {
        const regionDistricts = serviceCenters.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const riderRegion = useWatch({ control, name: 'region' });

    const handleRiderApplication = async (data) => {
        console.log('main reading data', data);
        try {
            const riderData = {
                ...data,
                name: user?.displayName || data?.name || "Unknown",
                email: user?.email || data?.email || "", // it's fallback
                // email: user?.email ?? data?.email ?? "", // it's strick and good practise
                status: "pending",
                phone: data?.phone,
                created_at: new Date().toISOString(),
            };

            console.log('variable data', riderData);

            const res = await axiosSecure.post('/riders', riderData);

            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Application submitted",
                    text: "Your application is pending approval",
                    showConfirmButton: false,
                    timer: 2000
                });
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text: error.message
            });
        }
    };

    return (
        <div>
            <div className="max-w-6xl mx-auto px-4">
                {/* Heading */}
                <h2 className="text-4xl font-bold text-center text-green-600 mb-10">
                    🚴‍♂️ Be a Rider
                </h2>

                {/* Form */}
                <form
                    onSubmit={handleSubmit(handleRiderApplication)}
                    className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-green-100"
                >
                    {/* Two Column Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

                        {/* Rider Details */}
                        <fieldset className="bg-green-50  rounded-xl p-6 border border-green-200">
                            <h4 className="text-2xl font-semibold text-black mb-6 border-b pb-2">
                                Rider Details
                            </h4>

                            <label className="label font-medium text-black">Rider Name</label>
                            <input
                                type="text"
                                {...register('name')}
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full focus:border-green-500"
                                placeholder="Your Name"
                            />

                            <label className="label font-medium text-black mt-4">Email</label>
                            <input
                                type="email"
                                {...register('email')}
                                defaultValue={user?.email}
                                className="input input-bordered w-full focus:border-green-500"
                                placeholder="Your Email"
                            />

                            {/* phone */}
                            <label className="label font-medium text-black mt-4">Phone</label>
                            <input
                                type="tel"
                                {...register('phone', { required: true })}
                                defaultValue={user?.phoneNumber || ""}
                                className="input input-bordered w-full focus:border-green-500"
                                placeholder="Phone number"
                            />


                            {/* Region */}
                            <label className="label font-medium text-black mt-4">Region</label>
                            <select
                                {...register('region')}
                                defaultValue="Pick a region"
                                className="select select-bordered w-full focus:border-green-500"
                            >
                                <option disabled>Pick a region</option>
                                {regions.map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>

                            {/* District */}
                            <label className="label font-medium text-black mt-4">District</label>
                            <select
                                {...register('district')}
                                defaultValue="Pick a district"
                                className="select select-bordered w-full focus:border-green-500"
                            >
                                <option disabled>Pick a district</option>
                                {districtsByRegion(riderRegion).map((r, i) => (
                                    <option key={i} value={r}>{r}</option>
                                ))}
                            </select>

                            <label className="label font-medium text-black mt-4">Address</label>
                            <input
                                type="text"
                                {...register('address')}
                                className="input input-bordered w-full focus:border-green-500"
                                placeholder="Your Address"
                            />
                        </fieldset>

                        {/* More Details */}
                        <fieldset className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                            <h4 className="text-2xl font-semibold text-black mb-6 border-b pb-2">
                                More Details
                            </h4>

                            <label className="label font-medium text-black">Driving License</label>
                            <input
                                type="text"
                                {...register('license')}
                                className="input input-bordered w-full focus:border-orange-400"
                                placeholder="License Number"
                            />

                            <label className="label font-medium text-black mt-4">NID</label>
                            <input
                                type="text"
                                {...register('nid')}
                                className="input input-bordered w-full focus:border-orange-400"
                                placeholder="National ID"
                            />

                            <label className="label font-medium text-black mt-4">Bike</label>
                            <input
                                type="text"
                                {...register('bike')}
                                className="input input-bordered w-full focus:border-orange-400"
                                placeholder="Bike Model"
                            />
                        </fieldset>
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                        <button
                            type="submit"
                            className="mt-10 px-10 py-3 rounded-full bg-linear-to-r from-green-500 to-green-400 
                           text-black font-semibold text-lg shadow-lg hover:scale-105 transition-transform"
                        >
                            Apply as a Rider
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default BeARider;