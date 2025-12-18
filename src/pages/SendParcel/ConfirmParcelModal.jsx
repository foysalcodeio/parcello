import { useState } from "react";
import Swal from "sweetalert2";



const ConfirmParcelModal = ({
  isOpen,
  onClose,
  loading,
  cost,
  bookingData,
  user,
  trackingId
}) => {
  if (!isOpen) return null;

  const isWithinCity = bookingData?.senderRegion === bookingData?.receiverRegion;

  const weight = parseFloat(bookingData?.parcelWeight) || 0;
  const parcelType = bookingData?.parcelType;
  const orderTime = new Date().toLocaleString();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const handleSweetConfirm = () => {
    Swal.fire({
      title: "Confirm Payment?",
      text: `Total Cost: ৳ ${cost}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Continue",
      cancelButtonText: "Back"
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
      <div className="w-full max-w-lg h-[90vh] overflow-y-auto rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/30 animate-fadeIn">

        {/* Header */}
        <div className="text-center p-6 border-b border-gray-200">
          <div className="w-20 h-20 bg-linear-to-br from-[#C4D82E] to-[#eaff57] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <svg className="w-10 h-10 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-3xl font-extrabold text-[#1a4d5c]">
            Confirm Parcel Booking
          </h3>
          <p className="text-gray-600 mt-1">
            Please review all details before payment
          </p>
        </div>

        {/* Price Card */}
        <div className="p-6">
          <div className="bg-linear-to-br from-[#1a4d5c] to-[#2d7a8f] text-white rounded-2xl p-6 shadow-xl text-center">
            <p className="text-sm opacity-80">Total Delivery Cost</p>
            <h2 className="text-5xl font-black mt-2 tracking-wide">৳ {cost}</h2>

            <div className="flex justify-center gap-3 text-xs mt-4 flex-wrap">
              <span className="px-3 py-1 bg-white/20 rounded-full">{parcelType === "document" ? "Document" : "Non-Document"}</span>
              <span className="px-3 py-1 bg-white/20 rounded-full">{isWithinCity ? "Within City" : "Outside City"}</span>
              {parcelType === "non-document" && <span className="px-3 py-1 bg-white/20 rounded-full">{weight} KG</span>}
            </div>
          </div>
        </div>

        {/* <div className="flex justify-between">
          <span className="text-gray-500">Tracking ID</span>
          <span className="font-semibold text-blue-600">{trackingId}</span>
        </div> */}


        {/* Details Section */}
        <div className="px-6 space-y-3 text-sm text-gray-700">
          {[
            { label: "Tracking ID", value: trackingId },
            { label: "Sender Name", value: user?.name || bookingData?.senderName },
            { label: "Parcel Name", value: bookingData?.parcelTitle },
            { label: "Order Time", value: orderTime },
            { label: "From", value: bookingData?.senderAddress },
            { label: "To", value: bookingData?.receiverAddress },
            { label: "Pickup Region", value: bookingData?.senderRegion },
            { label: "Delivery Region", value: bookingData?.receiverRegion }
          ].map((item) => (
            <div key={item.label} className="flex justify-between">
              <span className="text-gray-500">{item.label}</span>
              <span className="font-semibold text-right max-w-[60%]">{item.value}</span>
            </div>
          ))}
        </div>

        {/* Payment Options */}
        <div className="px-6 mt-5 text-sm space-y-3">
          <h4 className="font-semibold">Payment Method</h4>

          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={paymentMethod === "card"} onChange={() => setPaymentMethod("card")} />
              Credit / Debit Card
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" checked={paymentMethod === "cod"} onChange={() => setPaymentMethod("cod")} />
              Cash On Delivery
            </label>
          </div>

          {paymentMethod === "card" && (
            <div className="px-6 space-y-4">
              <h4 className="text-lg font-bold text-[#1a4d5c]">Select Payment Method</h4>

              {/* Card Type Grid */}
              <div className="grid grid-cols-2 gap-3">
                {["Visa Card", "Master Card", "Debit Card", "Mobile Banking"].map((item) => (
                  <label key={item} className="cursor-pointer">
                    <input type="radio" name="paymentType" className="hidden peer" />
                    <div className="p-3 rounded-xl border-2 border-gray-200 
                        peer-checked:border-[#C4D82E] peer-checked:bg-[#f7fbdf] 
                        transition-all text-center font-semibold text-sm">
                      💳 {item}
                    </div>
                  </label>
                ))}
              </div>

              {/* Compact Card Form (2 Column) */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <input type="text" placeholder="Cardholder" className="input input-bordered rounded-xl" />
                <input type="text" placeholder="Card Number" className="input input-bordered rounded-xl" />
                <input type="text" placeholder="MM/YY" className="input input-bordered rounded-xl" />
                <input type="password" placeholder="CVV" className="input input-bordered rounded-xl" />
              </div>
            </div>
          )}

          {paymentMethod === "cod" && (
            <div className="mt-3 p-3 bg-green-50 text-green-700 rounded-xl">
              You will pay in cash when the parcel is delivered.
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4 p-6 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Continue Editing
          </button>

          <button
            onClick={handleSweetConfirm}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#C4D82E] to-[#eaff57] text-black font-bold shadow-xl hover:scale-105 transition-transform"
          >
            {loading ? "Processing..." : "Process to Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmParcelModal;
