import axios from 'axios';
import React, { useEffect } from 'react';
import { Row, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2'
import { useQuery } from 'react-query'
import ProductCard from '../Components/SocialSignIn/ProductCard/ProductCard';


const Products = () => {

    const { isLoading, error, data: products } = useQuery('products', () =>
        axios.get('/products').then(res => res.data)
    )

    useEffect(() => {
        document.title = 'Products|| SAPPHIRE'
    }, [])
    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }, [error])

    if (!Array.isArray(products)) {
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
        <div className='container my-5'>
            <Row xs={1} sm={2} md={3} lg={4} className="g-5 align-items-stretch ">
                {
                    products?.map((product, index) => (
                        <ProductCard key={product._id} product={product} index={index} />
                    ))
                }
            </Row>
        </div>
    );
};

export default Products;