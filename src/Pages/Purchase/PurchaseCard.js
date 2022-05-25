import React from 'react';
import { Spinner } from 'react-bootstrap'

const PurchaseCard = ({ product }) => {

    if (!typeof (product) === 'Object') {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    const { name, price, quantity, date, image, rating, totalRating, limit, description, } = product





    return (
        <div className="card mb-3 rounded-2 overflow-hidden">
            <div className="row g-0 align-items-center">
                <div className="col-md-4">
                    <img src={image?.url} className="img-fluid rounded-start" alt="..." />
                </div>
                <div className="col-md-8">
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <div>
                            <b className='text-primary'>Price: </b> {price}
                        </div>
                        <div> <b className='text-primary'>Limits: </b> {limit} </div>
                        <div> <b className='text-primary'>Quantity: </b> {quantity} </div>
                        <div> <b className='text-primary'>Date of production: </b> {date} </div>
                        <div> <b className='text-primary'>Ratings: </b> {date} </div>
                        <div> <b className='text-primary'>Ratings: </b>
                            {
                                (totalRating / rating) ? (totalRating / rating).toFixed(2) : 5
                            }
                        </div>

                        <div> <b className='text-primary'>Description: </b> {description} </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseCard;