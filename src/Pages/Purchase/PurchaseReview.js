import React from 'react';

const PurchaseReview = ({ review }) => {
    console.log(review);
    return (
        <div className='review'>
            {
                review.map(item => (
                    <div className='review-item'>
                        <h5 className='mb-0'> <b className='text-primary'>User:</b> {item.userName} </h5>
                        <div><small> <b className='text-primary'>Email:</b> {item.email} </small></div>
                        <p> <b className="text-primary">Review</b> {item.review} </p>
                    </div>
                ))
            }
        </div>
    );
};

export default PurchaseReview;