import React from 'react';

const PurchaseReview = ({ review }) => {
    return (
        <div className='review'>
            {
                review.map((item, ind) => (
                    <div className='review-item' key={ind}>
                        <h5 className='mb-0 text-capitalize'> <b className='text-primary'>User:</b> {item.userName} </h5>
                        <div><small> <b className='text-primary'>Email:</b> {item.email} </small></div>
                        <p> <b className="text-primary">Review</b> {item.review} </p>
                    </div>
                ))
            }
        </div>
    );
};

export default PurchaseReview;