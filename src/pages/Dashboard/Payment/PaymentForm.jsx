import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from 'react';
import { useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const PaymentForm = () => {
  const stripe = useStripe();     // ✅ hooks INSIDE component
  const elements = useElements(); // ✅ hooks INSIDE component
  const { parcelId } = useParams();
  console.log("Processing payment for parcel ID:", parcelId);
  const axiosSecure = useAxiosSecure();

  const [error, setError] = useState('');

  // data load from backend about parcel
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ['parcels', parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    }
  })

  if (isPending) {
    return <div>Loading...</div>;
  }

  console.log("Parcel Info:", parcelInfo);
  const amount = parcelInfo?.cost || 0; // Fallback to 0 if cost is undefined

  const handleSubmit = async (event) => {
    event.preventDefault();



    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      console.log("Payment error:", error);
    } else {
      setError('');
      console.log("Payment success:", paymentMethod);
    }
  };

  return (
    <form className="space-y-4 big-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
      onSubmit={handleSubmit}>
      <CardElement className='' />
      <button
        type="submit"
        disabled={!stripe}
        className="btn btn-primary w-full relative group overflow-hidden transition-all duration-300"
      >
        {/* Normal text */}
        <span className="block group-hover:hidden transition-all duration-300">
          Pay ${amount}
        </span>

        {/* Hover text */}
        <span className="hidden group-hover:block text-yellow-300 transition-all duration-300">
          Pickup parcel now
        </span>
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
