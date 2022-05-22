import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './ProductCard.css'

const ProductCard = ({ product, index }) => {

    const color = ['info', 'warning', 'secondary', 'success', 'dark', 'danger', 'black']

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
            <Link to='/' >
                <Card className={`h-100 border-0 text-white productCard bg-${selectedColor}`}>
                    <Card.Img variant="top" src={product?.image?.url} />
                    <Card.Body>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            t longer.
                        </Card.Text>
                    </Card.Body>
                    <Button variant='primary'> Buy Now </Button>
                </Card>
            </Link>
        </Col>
    );
};

export default ProductCard;