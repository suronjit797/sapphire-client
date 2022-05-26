import axios from 'axios';
import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import Banner from '../Components/Banner/Banner';
import Swal from 'sweetalert2';
import { Row, Spinner } from 'react-bootstrap';
import ProductCard from '../Components/SocialSignIn/ProductCard/ProductCard';
import HomeReview from './HomeReview';
import HomeTrust from './HomeTrust';


const Home = () => {

    const { isLoading, error, data: products } = useQuery('products', () =>
        axios.get('/products?limit=8').then(res => res.data)
    )
    const { isLoading: recent_loading, error: recent_error, data: recent_products } = useQuery('recent-products', () =>
        axios.get('/recent-products?limit=4').then(res => res.data)
    )
    useEffect(() => {
        if (error || recent_error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message || recent_error?.message,
            })
        }
    }, [error, recent_error])


    if (!Array.isArray(products)) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if (isLoading || recent_loading) {
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
                        products?.map((product, index) => (
                            <ProductCard key={product._id} product={product} index={index} />
                        ))
                    }
                </Row>
            </div>
            <HomeTrust />
            <div className='container my-5'>
                <h2 className="text-center mb-5"> Recent <span className="text-primary"> Products </span> </h2>
                <Row xs={1} sm={2} md={3} lg={4} className="g-5 align-items-stretch ">
                    {
                        recent_products?.map((product, index) => (
                            <ProductCard key={product._id} product={product} index={index} />
                        ))
                    }
                </Row>
            </div>
            <HomeReview />



        </div>
    );
};

export default Home;