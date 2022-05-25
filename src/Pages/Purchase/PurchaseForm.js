import React, { useState } from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Spinner } from 'react-bootstrap';
import { loadStripe } from '@stripe/stripe-js';


const PurchaseForm = ({ product, refetch }) => {
    const { _id, name, price, quantity, date, image, rating, totalRating, limit, description, } = product
    const [user] = useAuthState(auth);
    const [clientSecret, setClientSecret] = useState('')

    const [userName, setUserName] = useState(user?.displayName)
    const [email, setEmail] = useState(user.email)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [orderQuantity, setOrderQuantity] = useState(limit)


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
        const orderPrice = parseInt(price) * parseInt(orderQuantity)
        const newOrder = {
            userName,
            email,
            phone,
            address,
            orderQuantity: parseInt(orderQuantity),
            orderPrice
        }


        if (parseInt(orderQuantity) > quantity || parseInt(orderQuantity) < limit) {
            Swal.fire({
                icon: 'error',
                title: 'Ohh..',
                text: quantity > 600 ? `you can add only ${limit} to ${quantity} products` : `No quantity available`
            })
        } else {
            axios.post(`/order/${_id}`, { newOrder })
                .then(res => {
                    refetch()
                    Swal.fire({
                        icon: 'success',
                        title: 'Order',
                        text: `your order successfully`
                    })
                })
        }
    }


    return (
        <div>
            <form className='mb-3' onSubmit={handleOrder}>
                <div className="form-group mb-3">
                    <label htmlFor="user-name">User name:</label>
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
                        Quantity: <small className='text-warning'>
                            {parseInt(quantity) > parseInt(limit) ? `You can buy product between ${limit} to ${quantity}` : `This Product is not available now`}

                        </small>
                    </label>
                    <input
                        type="text"
                        name="order-quantity"
                        id="order-quantity"
                        required
                        value={orderQuantity}
                        placeholder='Products quantity'
                        onChange={e => setOrderQuantity(e.target.value)}
                        className='form-control'
                    />
                </div>


                <button className="btn btn-primary"> Payment </button>


            </form>



        </div>
    );
};

export default PurchaseForm;