import { useQuery } from '@tanstack/react-query';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { FaTrashCan, FaPaypal } from 'react-icons/fa6';
import { LuView } from 'react-icons/lu';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';

const MyParcel = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const {
        data: parcels = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['my-parcels', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleParcelDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2563eb',
            cancelButtonColor: '#dc2626',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/parcels/${id}`)
                    .then((res) => {
                        if (res.data.deletedCount) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your parcel request has been deleted.',
                                'success'
                            );
                        }

                    });
            }
        });
    };

    const handlePayment = async (parcel) => {

        navigate(`/dashboard/payment/${parcel._id}`);
                
        const paymentInfo = {
            cost: parcel.cost,
            parcelId: parcel._id,
            senderEmail: parcel.senderEmail,
            parcelName: parcel.parcelName,
        };

        // const res = await axiosSecure.post(
        //     '/payment-checkout-session',
        //     paymentInfo
        // );

        // window.location.assign(res.data.url);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-60">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-4 md:p-8 max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-2xl font-bold">My Parcels</h2>
                <span className="badge badge-primary badge-lg">
                    Total: {parcels.length}
                </span>
            </div>

            {/* ================= DESKTOP TABLE ================= */}
            <div className="hidden md:block overflow-x-auto rounded-xl shadow bg-base-100">
                <table className="table table-zebra">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Cost</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className="font-semibold">
                                    {parcel.parcelTitle}
                                </td>
                                <td>{parcel.parcelType}</td>
                                <td>৳ {parcel.cost}</td>
                                <td>{parcel.orderTime}</td>
                                <td>
                                    <span
                                        className={`badge ${parcel.delivery_status === 'delivered'
                                                ? 'badge-success'
                                                : 'badge-warning'
                                            }`}
                                    >
                                        {parcel.delivery_status}
                                    </span>
                                </td>
                                <td>
                                    <div className="flex justify-center gap-2">
                                        <button className="btn btn-sm btn-info">
                                            <LuView />
                                        </button>

                                        {parcel.paymentStatus === 'paid' ? (
                                            <span className="badge badge-success badge-outline">
                                                Paid
                                            </span>
                                        ) : (
                                            <button
                                                onClick={() =>
                                                    handlePayment(parcel)
                                                }
                                                className="btn btn-sm btn-primary text-black"
                                            >
                                                <FaPaypal /> Pay
                                            </button>
                                        )}

                                        <button
                                            onClick={() =>
                                                handleParcelDelete(parcel._id)
                                            }
                                            className="btn btn-sm btn-error"
                                        >
                                            <FaTrashCan />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ================= MOBILE CARD VIEW ================= */}
            <div className="md:hidden space-y-4">
                {parcels.map((parcel) => (
                    <div
                        key={parcel._id}
                        className="card bg-base-100 shadow-md"
                    >
                        <div className="card-body p-4">
                            <div className="flex justify-between items-start">
                                <h3 className="font-bold text-lg">
                                    {parcel.parcelTitle}
                                </h3>
                                <span
                                    className={`badge ${parcel.delivery_status === 'delivered'
                                            ? 'badge-success'
                                            : 'badge-warning'
                                        }`}
                                >
                                    {parcel.delivery_status}
                                </span>
                            </div>

                            <p className="text-sm text-gray-500">
                                Type: {parcel.parcelType}
                            </p>

                            <p className="font-semibold">
                                Cost: ৳ {parcel.cost}
                            </p>

                            <p className="text-sm text-gray-400">
                                {parcel.orderTime}
                            </p>

                            <div className="flex flex-wrap gap-2 mt-3">
                                <button className="btn btn-sm btn-info">
                                    <LuView />
                                </button>

                                {parcel.paymentStatus === 'paid' ? (
                                    <span className="badge badge-success badge-outline">
                                        Paid
                                    </span>
                                ) : (
                                    <button onClick={() => handlePayment(parcel._id)}>
                                        <FaPaypal /> Pay
                                    </button>
                                )}

                                <button
                                    onClick={() =>
                                        handleParcelDelete(parcel._id)
                                    }
                                    className="btn btn-sm btn-error"
                                >
                                    <FaTrashCan />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {parcels.length === 0 && (
                <p className="text-center text-gray-400 mt-10">
                    No parcels found.
                </p>
            )}
        </div>
    );
};

export default MyParcel;
