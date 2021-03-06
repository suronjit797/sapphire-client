
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


const CheckoutForm = ({ onHide, payment_data, refetch }) => {
    const { orderPrice, userName, email, phone } = payment_data
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState('')

    useEffect(() => {
        if (orderPrice) {
            const token = localStorage.getItem('token')
            axios.post('/payment-intent', { price: orderPrice || 1 }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => setClientSecret(res.data))
                .catch(error => {
                    if (error.message) {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops',
                            text: error.response.data.message
                        })
                    }

                }

                )
        }
    }, [orderPrice, onHide])


    const handleSubmit = async (event) => {
        event.preventDefault();


        if (!stripe || !elements) {
            return;
        }
        // collect info
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }
        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            Swal.fire({
                icon: 'error',
                title: error.code,
                text: error.message,
            })
        } else {
            axios.put(`/order-pay/${payment_data._id}`, {})
                .then(res => {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Payment successfully',
                    })
                    onHide()
                })

        }


        // confimr card payment

        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret.clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: userName,
                        phone,
                        email
                    },
                },
            },
        );


        if (intentError) {
            Swal.fire({
                icon: 'error',
                text: error?.message,
            })
        } else {
            console.log(paymentIntent);
            Swal.fire({
                icon: 'success',
                title: 'Congrats!!',
                text: 'Your payment is completed',
            })
        }





    };
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                className='form-control'
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
            <button className='btn btn-primary mt-3' type="submit" disabled={!stripe}>
                Payment proceed
            </button>
        </form>
    );
};

export default CheckoutForm;