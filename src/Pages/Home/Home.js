import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Banner from '../Components/Banner/Banner';
import Swal from 'sweetalert2';
import { Row, Spinner } from 'react-bootstrap';
import ProductCard from '../Components/SocialSignIn/ProductCard/ProductCard';


const Home = () => {

    const { isLoading, error, data: products } = useQuery('products', () =>
        axios.get('/products?limit=8').then(res => res.data)
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
        <div>
            <Banner />
            <div className='container my-5'>
                <Row xs={1} sm={2} md={3} lg={4} className="g-5 align-items-stretch ">
                    {
                        products.map((product, index) => (
                            <ProductCard key={product._id} product={product} index={index} />
                        ))
                    }
                </Row>
            </div>
        </div>
    );
};

export default Home;