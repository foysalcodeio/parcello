const ConfirmParcelModal = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  cost,
  bookingData
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box max-w-md bg-white rounded-3xl shadow-2xl border-2 border-[#C4D82E]">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-linear-to-br from-[#C4D82E] to-[#d4e84a] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="font-bold text-3xl text-[#1a4d5c] mb-2">Confirm Booking</h3>
          <p className="text-gray-600">Review your parcel details</p>
        </div>

        <div className="bg-linear-to-br from-gray-50 to-white p-6 rounded-2xl mb-6">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-1">Estimated Delivery Cost</p>
            <p className="text-4xl font-bold bg-linear-to-r from-[#1a4d5c] to-[#2d7a8f] bg-clip-text text-transparent">
              Tk {cost}
            </p>
          </div>

          <div className="divider"></div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Parcel:</span>
              <span className="font-semibold text-gray-800">
                {bookingData?.parcelTitle}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">From:</span>
              <span className="font-semibold text-gray-800 text-right">
                {bookingData?.senderAddress}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">To:</span>
              <span className="font-semibold text-gray-800 text-right">
                {bookingData?.receiverAddress}
              </span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          <button
            className="btn btn-ghost rounded-xl px-6 hover:bg-gray-100"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn bg-linear-to-r from-[#C4D82E] to-[#d4e84a] hover:from-[#b5c929] hover:to-[#C4D82E] text-black border-none rounded-xl px-8 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 font-bold"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <>
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Confirm & Pay
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmParcelModal;
