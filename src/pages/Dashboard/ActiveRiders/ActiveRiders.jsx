import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { FaSearch, FaUserSlash } from "react-icons/fa";

const ActiveRiders = () => {
    const axiosSecure = useAxiosSecure();
    const [searchTerm, setSearchTerm] = useState("");

    const {
        data: riders = [],
        isLoading,
        error,
        refetch,
    } = useQuery({
        queryKey: ["activeRiders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/riders/active");
            return res.data;
        },
        staleTime: 5 * 60 * 1000,
    });

    const handleDeactive = async (id) => {
        const confirm = await Swal.fire({
            title: "Deactivate this rider?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, deactivate",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/${id}/status`, {
                status: "deactivated",
            });

            Swal.fire("Done", "Rider has been deactivated", "success");
            refetch();
        } catch (err) {
            console.error(err);
            Swal.fire("Error", "Failed to deactivate rider", "error");
        }
    };

    const filteredRiders = riders.filter((rider) =>
        rider?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Active Riders</h2>

            <div className="mb-4 flex items-center gap-2">
                <FaSearch />
                <input
                    type="text"
                    placeholder="Search by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full max-w-md"
                />
            </div>

            {isLoading && (
                <p className="text-center">Loading active riders...</p>
            )}

            {error && (
                <p className="text-center text-red-500">
                    Failed to load riders
                </p>
            )}

            {!isLoading && !error && (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Region</th>
                                <th>Bike</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {filteredRiders.map((rider) => (
                                <tr key={rider._id}>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.phone}</td>
                                    <td>{rider.region}</td>
                                    <td>
                                        {rider.bike_brand} —{" "}
                                        {rider.bike_registration}
                                    </td>
                                    <td>
                                        <span className="badge badge-success text-white">
                                            Active
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() =>
                                                handleDeactive(rider._id)
                                            }
                                            className="btn btn-sm btn-error flex items-center gap-1"
                                        >
                                            <FaUserSlash />
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}

                            {filteredRiders.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center text-gray-500"
                                    >
                                        No matching riders found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ActiveRiders;
