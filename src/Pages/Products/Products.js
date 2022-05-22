import axios from 'axios';
import React, { useEffect } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useQuery } from 'react-query'


const Products = () => {

    const { isLoading, error, data: products } = useQuery('products', () =>
        axios.get('/products').then(res => res.data)
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

    if (isLoading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }



    return (
        <div className='container my-5'>
            <Row xs={1} md={2} lg={3} className="g-4">
                {
                    products.map((product) => (
                        //  key={product._id}

                    ))
                }
            </Row>
        </div>
    );
};

export default Products;