import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";


const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { parcelId } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();


  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();


  // 🔹 Load parcel data
  const { isPending, data: parcelInfo = {} } = useQuery({
    queryKey: ["parcel", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  if (isPending) return <div>Loading...</div>;

  const amount = parcelInfo?.cost || 0;
  const amountInCents = Math.round(amount * 100);
  const isPaid = parcelInfo?.paymentStatus === "paid";


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || amountInCents <= 0 || isPaid) return;

    setProcessing(true);
    setError("");
    setSuccess("");

    try {
      // 1️⃣ Create payment intent
      const intentRes = await axiosSecure.post("/create-payment-intent", {
        amountInCents,
      });

      const clientSecret = intentRes.data.clientSecret;
      if (!clientSecret) {
        throw new Error("Client secret not found");
      }

      ;

      // 2️⃣ Confirm card payment
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName || "Guest User",
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
        return;
      }

      // 3️⃣ Save payment info
      if (result.paymentIntent.status === "succeeded") {
        const paymentData = {
          parcelId,
          email: user?.email,
          amount,
          transactionId: result.paymentIntent.id,
          paymentMethod: result.paymentIntent.payment_method,
        };



        const paymentRes = await axiosSecure.post("/payments", paymentData);
        console.log(paymentRes);

        if (paymentRes.data.insertedId) {
          setSuccess("✅ Payment successful!");

          await Swal.fire({
            icon: 'success',
            title: 'Payment Successful',
            html: `<p>Your transaction ID: <strong>${result.paymentIntent.id}</strong></p>`,
            confirmButtonText: 'OK',
          });

          // refresh cached data
          queryClient.invalidateQueries(["my-parcels"]);
          queryClient.invalidateQueries(["parcel", parcelId]);

          // ✅ correct navigation
          navigate("/dashboard/my-parcel");
        }

      }
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Payment failed");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow-md w-full max-w-md mx-auto"
    >
      <CardElement />

      <button
        type="submit"
        disabled={!stripe || processing || isPaid}
        className="btn btn-primary w-full relative group overflow-hidden"
      >
        <span className="block group-hover:hidden">
          {isPaid ? "Already Paid" : processing ? "Processing..." : `Pay $${amount}`}
        </span>

        {!isPaid && (
          <span className="hidden group-hover:block text-yellow-300">
            Pickup parcel now
          </span>
        )}
      </button>

      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}
    </form>
  );
};

export default PaymentForm;
