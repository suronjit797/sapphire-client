import axios from 'axios';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

import userImg from '../../Images/user.png'


const HomeReview = () => {

    const { isLoading, error, data: review } = useQuery('review', () =>
        axios.get('/review?limit=2').then(res => res.data)
    )
    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }, [error])

    if (!Array.isArray(review)) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (isLoading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }



    return (
        
        <div className='container mb-4'>
            <h2 className="text-center mb-4"> <u>User Review</u> </h2>
            <div className="row align-items-center justify-content-center">

                {/* sorry for user not use slider */}
                {
                    review.map(item => (
                        <div className="col-md-6" key={item._id}>
                            <div className="row align-items-center justify-content-center text-center text-md-start">
                                <div className="col-md-4">
                                    <img src={userImg} style={{maxWidth: '100px'}} alt="" />
                                </div>
                                <div className="col-md-8">
                                    <div className='review-item'>
                                        <h5 className='mb-0'> <b className='text-primary'>User:</b> {item.userName} </h5>
                                        <div><small> <b className='text-primary'>Email:</b> {item.email} </small></div>
                                        <p> <b className="text-primary">Review</b> {item.review} </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default HomeReview;