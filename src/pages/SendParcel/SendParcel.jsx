import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../hooks/useAuth';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const generateTrackingId = () => {
    const prefix = "TRK";
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}-${timestamp}-${random}`;
};

const SendParcel = () => {
    const { user } = useAuth();
    //this section is react hook form related
    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const serviceCenter = useLoaderData() || [];
    // Get unique regions from service centers
    // Safely map only if serviceCenter is an array
    //advanced
    // const uniqueRegions = Array.isArray(serviceCenter) ? [...new Set(serviceCenter.map(center => center.region))] : [];


    const uniqueRegions = [...new Set(serviceCenter.map(center => center.region))];
    const getDistinctRegions = (region) => 
        serviceCenter.filter((center) => center.region === region).map((center) => center.district);


    const parcelType = watch('parcelType');
    const senderRegion = watch('senderRegion');
    const receiverRegion = watch('receiverRegion');

    
    // const [cost, setCost] = useState(0);
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [bookingData, setBookingData] = useState(null);
    // const [loading, setLoading] = useState(false);
    // const [trackingId, setTrackingId] = useState(generateTrackingId());



    // // Watch sender details to update name if user loads later
    // useEffect(() => {
    //     if (user?.displayName) {
    //         setValue('senderName', user.displayName);
    //     }
    // }, [user, setValue]);

   const onSubmit = data => {
        console.log(data);

        const isDocument = data.parcelType === 'document';
        const isSameDistrict = data.senderDistrict === data.receiverDistrict;
        const parcelWeight = parseFloat(data.parcelWeight);

        let cost = 0;
        if (isDocument) {
            cost = isSameDistrict ? 60 : 80;
        }
        else {
            if (parcelWeight < 3) {
                cost = isSameDistrict ? 110 : 150;
            }
            else {
                const minCharge = isSameDistrict ? 110 : 150;
                const extraWeight = parcelWeight - 3;
                const extraCharge = isSameDistrict ? extraWeight * 40 : extraWeight * 40 + 40;

                cost = minCharge + extraCharge;
            }
        }

        console.log('cost', cost);
        data.cost = cost;

        Swal.fire({
            title: "Agree with the Cost?",
            text: `You will be charged ${cost} taka!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Confirm and Continue Payment!"
        }).then((result) => {
            if (result.isConfirmed) {

                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user?.email,
                    payment_status: 'unpaid',
                    delivery_status: 'pending',
                    trackingId: generateTrackingId(),
                    orderTime: new Date().toISOString()
                }

                console.log('Final Parcel Data to submit:', parcelData);

                // // save the parcel info to the database
                // axiosSecure.post('/parcels', data)
                //     .then(res => {
                //         console.log('after saving parcel', res.data);
                //         if (res.data.insertedId) {
                //             navigate('/dashboard/my-parcels')
                //             Swal.fire({
                //                 position: "top-end",
                //                 icon: "success",
                //                 title: "Parcel has created. Please Pay",
                //                 showConfirmButton: false,
                //                 timer: 2500
                //             });
                //         }
                //     })

            }
        });

    }

  
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-100 py-12">
            <div className="container mx-auto px-4 max-w-6xl grid">
                {trackingId && (
                    <div className="mb-6 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center">
                        <strong>Your Tracking ID:</strong> {trackingId}
                    </div>
                )}

                {/* Header Section */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold mb-3 bg-linear-to-r from-[#1a4d5c] to-[#2d7a8f] bg-clip-text text-transparent">
                        Add Parcel
                    </h1>
                    <p className="text-gray-600 text-lg">Complete the form below to book your delivery</p>
                </div>

                {/* Main Form Card */}
                <div className="bg-white rounded-3xl shadow-2xl  border-2 border-[#C4D82E] p-8 md:p-10">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
                        {/* Parcel Info Section */}
                        <div className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                            <h2 className="text-2xl font-bold mb-6 text-[#1a4d5c] flex items-center gap-3">
                                <span className="bg-[#C4D82E] text-black w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                                Enter your parcel details
                            </h2>
                            <div className="form-control mb-6">
                                <div className="flex gap-6">

                                    <label className="label cursor-pointer gap-3 bg-white px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[#C4D82E] transition-all duration-200">
                                        <input
                                            type="radio"
                                            name="parcelType"
                                            value="document"
                                            className="radio radio-success"
                                            {...register("parcelType")}
                                        />
                                        <span className="label-text font-semibold text-gray-700">Document</span>
                                    </label>

                                    <label className="label cursor-pointer gap-3 bg-white px-4 py-3 rounded-xl border-2 border-gray-200 hover:border-[#C4D82E] transition-all duration-200">
                                        <input
                                            type="radio"
                                            name="parcelType"
                                            value="non-document"
                                            className="radio radio-success"
                                            {...register("parcelType")}
                                        />
                                        <span className="label-text font-semibold text-gray-700">Not-Document</span>
                                    </label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="form-control w-full">
                                    <label className="label">
                                        <span className="label-text font-semibold text-gray-800">Parcel Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter parcel name"
                                        className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                        {...register("parcelTitle", { required: "Title is required" })}
                                    />
                                    {errors.parcelTitle && <span className="text-error text-sm mt-1">{errors.parcelTitle.message}</span>}
                                </div>

                                {parcelType === 'non-document' && (
                                    <div className="form-control w-full">
                                        <label className="label">
                                            <span className="label-text font-semibold text-gray-800">Parcel Weight (KG)</span>
                                        </label>
                                        <input
                                            type="number"
                                            step="0.1"
                                            placeholder="Enter weight in KG"
                                            className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                            {...register("parcelWeight", { required: "Weight is required for non-documents" })}
                                        />
                                        {errors.parcelWeight && <span className="text-error text-sm mt-1">{errors.parcelWeight.message}</span>}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Sender Info Section */}
                            <div className="bg-linear-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 text-[#1a4d5c] flex items-center gap-3">
                                    <span className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                                    Sender Details
                                </h2>

                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Sender Name</span></label>
                                            <input
                                                type="text"
                                                readOnly
                                                defaultValue={user?.displayName}
                                                className="input input-bordered w-full bg-gray-100 border-2 border-gray-200 rounded-xl"
                                                {...register("senderName")}
                                            />
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Pickup Warehouse</span></label>
                                            <select className="select select-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200" {...register("senderServiceCenter", { required: true })}>
                                                <option value="">Select Warehouse</option>
                                                <option value="center_a">Center A</option>
                                                <option value="center_b">Center B</option>
                                            </select>
                                            {errors.senderServiceCenter && <span className="text-error text-sm">Required</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Address</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter address"
                                                className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                                {...register("senderAddress", { required: true })}
                                            />
                                            {errors.senderAddress && <span className="text-error text-sm">Address is required</span>}
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Contact Number</span></label>
                                            <input
                                                type="tel"
                                                placeholder="Enter contact number"
                                                className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                                {...register("senderContact", { required: true })}
                                            />
                                            {errors.senderContact && <span className="text-error text-sm">Contact is required</span>}
                                        </div>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-semibold text-gray-800">Your Region</span></label>
                                        <select className="select select-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200" {...register("senderRegion", { required: true })}>
                                            <option value="">Select your region</option>
                                            {uniqueRegions.map(region => (
                                                <option key={region} value={region}>{region.charAt(0).toUpperCase() + region.slice(1)}</option>
                                            ))}
                                        </select>
                                        {errors.senderRegion && <span className="text-error text-sm">Required</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Receiver Info Section */}
                            <div className="bg-linear-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 shadow-sm">
                                <h2 className="text-2xl font-bold mb-6 text-[#1a4d5c] flex items-center gap-3">
                                    <span className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                                    Receiver Details
                                </h2>
                                <div className="space-y-5">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Receiver Name</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter receiver name"
                                                className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                                {...register("receiverName", { required: true })}
                                            />
                                            {errors.receiverName && <span className="text-error text-sm">Name is required</span>}
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Delivery Warehouse</span></label>
                                            <select className="select select-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200" {...register("receiverServiceCenter", { required: true })}>
                                                <option value="">Select Warehouse</option>
                                                <option value="center_a">Center A</option>
                                                <option value="center_b">Center B</option>
                                            </select>
                                            {errors.receiverServiceCenter && <span className="text-error text-sm">Required</span>}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Receiver Address</span></label>
                                            <input
                                                type="text"
                                                placeholder="Enter address"
                                                className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                                {...register("receiverAddress", { required: true })}
                                            />
                                            {errors.receiverAddress && <span className="text-error text-sm">Address is required</span>}
                                        </div>
                                        <div className="form-control w-full">
                                            <label className="label"><span className="label-text font-semibold text-gray-800">Contact Number</span></label>
                                            <input
                                                type="tel"
                                                placeholder="Enter contact number"
                                                className="input input-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200"
                                                {...register("receiverContact", { required: true })}
                                            />
                                            {errors.receiverContact && <span className="text-error text-sm">Contact is required</span>}
                                        </div>
                                    </div>

                                    <div className="form-control w-full">
                                        <label className="label"><span className="label-text font-semibold text-gray-800">Receiver Region</span></label>
                                        <select className="select select-bordered w-full bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200" {...register("receiverRegion", { required: true })}>
                                            <option value="">Select your region</option>
                                            {uniqueRegions.map(region => (
                                                <option key={region} value={region}>{region.charAt(0).toUpperCase() + region.slice(1)}</option>
                                            ))}
                                        </select>
                                        {errors.receiverRegion && <span className="text-error text-sm">Required</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Instruction Fields - Side by Side */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="form-control">
                                <textarea
                                    className="textarea w-full textarea-bordered h-28 bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200 resize-none"
                                    placeholder="Enter pickup instructions (optional)"
                                    {...register("pickupInstruction")}
                                ></textarea>
                            </div>

                            <div className="form-control">
                                <textarea
                                    className="textarea textarea-bordered w-full h-28 bg-white border-2 border-gray-200 focus:border-[#C4D82E] rounded-xl transition-all duration-200 resize-none"
                                    placeholder="Enter delivery instructions (optional)"
                                    {...register("deliveryInstruction")}
                                ></textarea>
                            </div>
                        </div>

                        {/* Submit Section */}
                        <div className="bg-linear-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-200">
                            <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                </svg>
                                PickUp Time: 4pm-7pm Approx.
                            </p>
                            <button
                                type="submit"
                                className="btn text-lg bg-linear-to-r from-[#C4D82E] to-[#d4e84a] hover:from-[#b5c929] hover:to-[#C4D82E] text-black border-none px-10 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-bold"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Proceed to Confirm Booking
                            </button>
                        </div>

                    </form>
                </div>
            </div>

            {/* Confirm Parcel Modal */}
            <ConfirmParcelModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={handleConfirmBooking}
                loading={loading}
                cost={cost}
                user={user}
                bookingData={bookingData}
                trackingId={trackingId}
            />

        </div>

    );
};

export default SendParcel;