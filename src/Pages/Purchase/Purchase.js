import axios from 'axios';
import React, { useEffect } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import './Purchase.css';
import PurchaseCard from './PurchaseCard';

const Purchase = () => {
    const { id } = useParams()
    const { isLoading, error, data: product } = useQuery('products', () =>
        axios.get(`/product/${id}`).then(res => res.data)
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
        <div className='container my-4'>
            <Row>
            <Col md={8}>
            <div className='purchase_left'>
                    <PurchaseCard product={product} />
                </div>
            </Col>
            <Col md={4}>
                <div className='purchase_left'>
                    dfasdfasd
                </div>
            </Col>
            </Row>
        </div>
    );
};

export default Purchase;