import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faDollarSign, faArrowUp19, faArrowDownUpAcrossLine } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';
import {
    CardElement,
    Elements,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe('pk_test_51L2xACGDwhQzJu6wWcWF0eTNpLTfoiILBu0oaxxhPIa7Qq1A5XDRbOht4Z5T6BXxkjnQHqBrji7dhWLCpBw1Ghc000WTiwtXIr');

const PurchaseForm = ({ product }) => {
    const { name, price, quantity, date, image, rating, totalRating, limit, description, } = product
    const [user] = useAuthState(auth);
    const [clientSecret, setClientSecret] = useState('')

    const [userName, setUserName] = useState(name)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [oderQuantity, setOderQuantity] = useState(limit)

    // props
    if (!typeof (product) === 'Object') {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    const handleOrder = event => {
        event.preventDefault()
        const orderPrice = parseInt(price) * parseInt(oderQuantity)

        if(oderQuantity > quantity || oderQuantity < limit){
            Swal.fire({
                icon: 'error',
                title: 'Ohh..',
                text: `you can add only ${limit} to ${quantity} products`
            })
        }



    }


    return (
        <div>
            <form className='mb-3' onSubmit={handleOrder}>
                <div className="form-group mb-3">
                    <label htmlFor="user-name">Name:</label>
                    <input
                        type="text"
                        name="user-name"
                        id="user-name"
                        required
                        readOnly={true}
                        value={userName}
                        className='form-control'
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="user-email">Email:</label>
                    <input
                        type="email"
                        name="user-email"
                        id="user-email"
                        required
                        readOnly={true}
                        value={email}
                        className='form-control'
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="user-address">Address:</label>
                    <input
                        type="text"
                        name="user-address"
                        placeholder='Address'
                        id="user-address"
                        required
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                        className='form-control'
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="user-phone">Phone:</label>
                    <input
                        type="text"
                        name="user-phone"
                        id="user-phone"
                        required
                        value={phone}
                        placeholder='Phone number'
                        onChange={e => setPhone(e.target.value)}
                        className='form-control'
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="order-quantity">
                        Quantity: <small className='text-warning'> You can buy product between {limit} to {quantity} </small>
                    </label>
                    <input
                        type="text"
                        name="order-quantity"
                        id="order-quantity"
                        required
                        value={oderQuantity}
                        placeholder='Products quantity'
                        onChange={e => setOderQuantity(e.target.value)}
                        className='form-control'
                    />
                </div>


                <button className="btn btn-primary"> Payment </button>




            </form>




            <Elements stripe={stripePromise}>
                <CheckoutForm />
            </Elements>
        </div>
    );
};

export default PurchaseForm;