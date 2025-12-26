import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { set } from "react-hook-form";
import { useState } from 'react';
import { useParams } from "react-router";

const PaymentForm = () => {
  const stripe = useStripe();     // ✅ hooks INSIDE component
  const elements = useElements(); // ✅ hooks INSIDE component
  const { parcelId } = useParams();
  console.log("Processing payment for parcel ID:", parcelId);


  const [error, setError] = useState('');



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
      <button type="submit" disabled={!stripe} className="btn btn-primary w-full">
        Pay for parcel pickup
      </button>
        {error && <p className="text-red-500">{error}</p>}
    </form>
  );
};

export default PaymentForm;
