import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

const stripe = useStripe();
const elements = useElements();

const PaymentForm = () => {

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle payment submission logic here
        if(!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if(card == null) {
            return;
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <CardElement>
                    <button type="submit" disabled={!stripe}>
                        pay for parcel pickup
                    </button>
                </CardElement>
            </form>
        </div>
    );
};

export default PaymentForm;