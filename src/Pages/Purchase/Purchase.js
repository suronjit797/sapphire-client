import axios from 'axios';
import { FirebaseError } from 'firebase/app';
import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom'
import Swal from 'sweetalert2';
import auth from '../../firebase.init';
import './Purchase.css';
import PurchaseCard from './PurchaseCard';
import PurchaseForm from './PurchaseForm';
import PurchaseReview from './PurchaseReview';
import ReviewForm from './ReviewForm';

const Purchase = () => {
    const { id } = useParams()
    const [user, loading, userError] = useAuthState(auth)
    const { isLoading, error, data: product, refetch } = useQuery(['products', id], () =>
        axios.get(`/product/${id}`).then(res => res.data)
    )

    const [userInfo, setUserInfo] = useState({})
    useEffect(() => {
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setUserInfo(res.data)
            // setLoading(false)
        })
    }, [loading])

    useEffect(() => {
        document.title = 'Purchase|| SAPPHIRE'
    }, [])

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message,
            })
        }
    }, [error])

    useEffect(() => {
        if (userError) {
            FirebaseError(userError.message)
        }
    }, [userError])


    if (isLoading || loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }



    return (
        <div className='container my-4'>
            <div>
                <div>{user.displayName ? user.displayName : <p className="text-danger mb-0">No Name found</p>}</div>
                <p>{user.email ? user.email : <p className="text-danger mb-0">No Email found</p>}</p>
            </div>
            <Row>
                <Col lg={userInfo.role === 'admin' ? 12 : 8}>
                    <div className='purchase_left'>
                        <PurchaseCard product={product} />
                        <div className={userInfo.role === 'admin' ? 'd-none' : 'mt-4'} >
                            <ReviewForm productId={product._id} displayName={user.displayName} email={user.email} refetch={refetch} />
                        </div>

                        <hr />
                        <div className="mt-4">
                            <PurchaseReview review={product.review} />
                        </div>
                    </div>
                </Col>
                <Col lg={4} className={userInfo.role === 'admin' ? 'd-none' : ''}>
                    <div className='purchase_left'>
                        <PurchaseForm product={product} refetch={refetch} />
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Purchase;