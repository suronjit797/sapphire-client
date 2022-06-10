import { faEye, faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Card, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom'

import './ProductCard.css'

const ProductCard = ({ product, index }) => {


    if (!typeof (product) === 'Object') {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    const { _id, name, price, quantity, image, rating, totalRating, description } = product

    return (
        <Col>
            <Card className={`h-100 border-0 overflow-hidden productCard`}>
                <div className="card_image">
                    <Card.Img variant="top" src={image?.url} />

                    <div className="card_link">
                        <Link to={`/purchase/${_id}`} className='text-white' >
                            <FontAwesomeIcon className='font-awesome' icon={faLink} />
                        </Link>
                        <FontAwesomeIcon className='font-awesome text-white' icon={faEye} />
                    </div>
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <div>
                        <p> {
                            description.length < 60 ? description : `${description.substring(0, 60)}...`
                        } </p>
                        <div> <b> Ratings: </b>
                            {
                                (totalRating / rating) ? (totalRating / rating).toFixed(2) : 5
                            }
                        </div>
                        <div><b className='mb-0 '>Price: </b> ${price}</div>
                        <div><b className='mb-0 '>Quantity: </b> ${quantity}</div>
                    </div>
                </Card.Body>
                <div className="p-3 pt-0">
                    <Link to={`/purchase/${_id}`} className="btn btn-primary bg_blue w-100"> Buy now </Link>
                </div>
            </Card>
        </Col>
    );
};

export default ProductCard;