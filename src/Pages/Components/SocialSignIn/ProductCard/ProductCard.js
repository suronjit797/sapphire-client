import React from 'react';
import { Card, Col } from 'react-bootstrap';
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

    return (
        <Col>
            <Card className={`h-100 border-0 text-white overflow-hidden productCard bg-${selectedColor}`}>
                <div className="card_image">
                    <Card.Img variant="top" src={product?.image?.url} />

                    <div className="card_link">
                        <Link to={`/purchase/${product._id}`} className='text-white' >
                            <FontAwesomeIcon className='font-awesome' icon={faLink} />
                        </Link>
                        <FontAwesomeIcon className='font-awesome' icon={faEye} />
                    </div>
                </div>
                <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                        t longer.
                    </Card.Text>
                </Card.Body>
                <div className="d-flex bg-black p-2 justify-content-between text-center">
                    <small className='w-50 text-muted border-end border-white'>
                        <b className='mb-0 '>Price</b>
                        <div>${product.price}</div>
                    </small>

                    <small className='w-50 text-muted'>
                        <b className="mb-0 "> Ratings </b>
                        <div>  {product.rating} </div>
                    </small>
                </div>
            </Card>
        </Col>
    );
};

export default ProductCard;