import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/sectionTitle/SectionTitle";
import CheckOutForm from "./CheckOutForm";
import { Elements } from "@stripe/react-stripe-js";
import useCart from "../../../hooks/useCart";



const stripePromise = loadStripe(import.meta.env.VITE_PK)

const Payment = () => {
    const [cart] = useCart();
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const price = parseFloat(total.toFixed(2))


    return (
        <div>
            <SectionTitle subHeading={'--Please proceed to--'} heading={'Payment'} />

            <Elements stripe={stripePromise}>
                <CheckOutForm price={price} cart={cart} />
            </Elements>

        </div>
    );
};

export default Payment;