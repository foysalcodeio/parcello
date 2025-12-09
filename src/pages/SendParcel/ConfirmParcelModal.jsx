
const ConfirmParcelModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  cost,
  bookingData
}) => {
  if (!isOpen) return null;

  const isWithinCity =
    bookingData?.senderRegion === bookingData?.receiverRegion;

  const weight = parseFloat(bookingData?.parcelWeight) || 0;
  const parcelType = bookingData?.parcelType;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="w-full max-w-lg mx-4 rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl border border-white/30 animate-fadeIn">

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
            <h2 className="text-5xl font-black mt-2 tracking-wide">
              ৳ {cost}
            </h2>

            <div className="flex justify-center gap-3 text-xs mt-4">
              <span className="px-3 py-1 bg-white/20 rounded-full">
                {parcelType === "document" ? "Document" : "Non-Document"}
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full">
                {isWithinCity ? "Within City" : "Outside City"}
              </span>
              {parcelType === "non-document" && (
                <span className="px-3 py-1 bg-white/20 rounded-full">
                  {weight} KG
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="px-6 space-y-4 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="text-gray-500">Parcel Name</span>
            <span className="font-semibold">
              {bookingData?.parcelTitle}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">From</span>
            <span className="font-semibold text-right max-w-[60%]">
              {bookingData?.senderAddress}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">To</span>
            <span className="font-semibold text-right max-w-[60%]">
              {bookingData?.receiverAddress}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Pickup Region</span>
            <span className="font-semibold capitalize">
              {bookingData?.senderRegion}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Delivery Region</span>
            <span className="font-semibold capitalize">
              {bookingData?.receiverRegion}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between gap-4 p-6 border-t border-gray-200 mt-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-linear-to-r from-[#C4D82E] to-[#eaff57] text-black font-bold shadow-xl hover:scale-105 transition-transform"
          >
            {loading ? "Processing..." : "Confirm & Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmParcelModal;
