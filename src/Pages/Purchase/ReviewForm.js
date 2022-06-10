import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const ReviewForm = ({ productId, displayName, email, refetch }) => {


    const [review, setReview] = useState('')


    const handleReview = event => {
        event.preventDefault()
        console.log(productId);

        axios.post('/review', { userName: displayName, email, review })
            .then(res =>
                axios.put(`/product-review/${productId}`, { userName: displayName, email, review })
                    .then(res => {
                        if(res.data){
                            setReview('')
                            refetch()
                            Swal.fire({
                                icon: 'success',
                                title: 'Review...',
                                text: 'Your review added successfully',
                            })
                        }
                    })
            )
            .catch(error => console.dir(error.message))

    }

    return (
        <div>
            <h2 className="text-primary"> Add your valuable review: </h2>

            <form onSubmit={handleReview}>
                <label htmlFor="name"> Name: </label>
                <input
                    className='form-control mb-3'
                    type="text"
                    name="name"
                    placeholder='name'
                    value={displayName}
                    readOnly
                    required
                    id="name"
                />
                <label htmlFor="email"> Email: </label>
                <input
                    className='form-control mb-3'
                    type="email"
                    name="email"
                    placeholder='email'
                    value={email}
                    readOnly
                    required
                    id="email" />
                <label htmlFor="email"> Your review: </label>
                <textarea
                    className='form-control mb-3'
                    name="review"
                    id="review"
                    rows="5"
                    required
                    value={review}
                    onChange={e => setReview(e.target.value)}
                ></textarea>
                <button className="btn btn-primary"> Add a review </button>
            </form>
        </div>
    );
};

export default ReviewForm;