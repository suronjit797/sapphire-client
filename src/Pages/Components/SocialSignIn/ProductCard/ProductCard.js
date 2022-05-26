import React from 'react';
import { Card, Col, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faLink } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import './ProductCard.css'

const ProductCard = ({ product, index }) => {

    const color = ['primary', 'warning', 'secondary', 'success', 'dark', 'danger', 'info']

    let selectedColor

    if (index % 7 === 0) {
        selectedColor = color[6]
    } else if (index % 6 === 0) {
        selectedColor = color[5]
    } else if (index % 5 === 0) {
        selectedColor = color[4]
    } else if (index % 4 === 0) {
        selectedColor = color[3]
    } else if (index % 3 === 0) {
        selectedColor = color[2]
    } else if (index % 2 === 0) {
        selectedColor = color[1]
    } else {
        selectedColor = color[0]
    }

    if (!typeof (product) === 'Object') {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    const { _id, name, price, quantity, image, rating, totalRating } = product

    return (
        <Col>
            <Card className={`h-100 border-0 text-white overflow-hidden productCard bg-${selectedColor}`}>
                <div className="card_image">
                    <Card.Img variant="top" src={image?.url} />

                    {/* <div className="card_link">
                        <Link to={`/purchase/${_id}`} className='text-white' >
                            <FontAwesomeIcon className='font-awesome' icon={faLink} />
                        </Link>
                        <FontAwesomeIcon className='font-awesome' icon={faEye} />
                    </div> */}
                </div>
                <Card.Body>
                    <Card.Title>{name}</Card.Title>
                    <div>
                        <div> <b> Ratings: </b>
                            {
                                (totalRating / rating) ? (totalRating / rating).toFixed(2) : 5
                            }
                        </div>
                        <div><b className='mb-0 '>Price: </b> ${price}</div>
                        <div><b className='mb-0 '>Quantity: </b> ${quantity}</div>
                    </div>
                </Card.Body>
                <Link to={`/purchase/${_id}`} className="btn btn-success w-100"> Buy now </Link>
            </Card>
        </Col>
    );
};

export default ProductCard;