import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";

const CheckOutForm = ({ price, cart }) => {
    const stripe = useStripe();
    const element = useElements();
    const {user} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [processing, setProcessing] = useState(false);
    const [transactionId, setTransactionId] = useState('');



    useEffect(() => {
        if(price){
            axiosSecure.post('/create-paymant-intent', { price })
            .then(res => {
                console.log(res.data.clientSecret);
                setClientSecret(res.data.clientSecret);
            })
        }
    }, [price, axiosSecure])



    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !element) {
            return
        }

        const card = element.getElement(CardElement);
        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message)
            console.log('error', error);

        }
        else {
            setCardError('')
            console.log('payment method', paymentMethod)
        }

        setProcessing(true);

        const {paymentIntent, error: confirmError} = await stripe.confirmCardPayment(
            clientSecret,
            {
              payment_method: {
                card: card,
                billing_details: {
                  email: user?.email || 'unknown',
                  name: user?.displayName || 'anonymous',
                },
              },
            },
          );

          if(confirmError){
            console.log(confirmError)
          }

          console.log(paymentIntent)

          setProcessing(false)

          if(paymentIntent.status === 'succeeded'){
              
              setTransactionId(paymentIntent.id)
              //save payment information to the server
              const payment = {
                email: user?.email,
                transactionId: paymentIntent.id,
                price,
                date: new Date(),
                quantity: cart.length,
                cartItems: cart.map(item=> item._id),
                menuItems: cart.map(item=> item.menuItemId),
                status: 'service pending',
                itemName: cart.map(item=> item.name)

              }

              axiosSecure.post('/payments', payment)
              .then(res=> {
                console.log(res.data);
              })
          }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button className="btn btn-primary btn-sm mt-5" type="submit" disabled={!stripe || !clientSecret || processing}>
                    Pay
                </button>
            </form>

            {cardError && <p className="text-warning">{cardError}</p>}
            {transactionId && <p className="text-success">Transaction commplete with TransactionId{transactionId}</p>}
        </>
    );
};

export default CheckOutForm;