import axios from 'axios';
import React, { useEffect } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const MyOrders = () => {
    const { isLoading, error, data: myOrders, refetch } = useQuery('myOrders', () =>
        axios.get('/user-order', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.data)
            .catch(error => Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message,
            }))
    )


    const handlePayment = id => {

    }
    const handleRemove = id => {

    }




    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.message,
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
        <div className='container my-3 manageOrders'>

            <Row xs={1} md={2} lg={3} className="g-4 align-items-stretch">
                {
                    myOrders.length ? myOrders.map(order => (
                        <Col key={order._id}>
                            <Card className='h-100'>
                                <Card.Body>
                                    <Card.Title className='fw-bold'> {order.productName || 'Undefine'} </Card.Title>
                                    <Card.Text>
                                        <small> {order.paid ?
                                            <small className="border border-2 d-inline-block p-1 px-2 mb-2 rounded-pill border-success  text-success">Paid</small> :
                                            <small className="border border-2 d-inline-block p-1 px-2 mb-2 rounded-pill border-warning  text-warning">Pending</small>} </small>
                                        <div> <b className="text-capitalize"> userName: </b> {order.userName ? order.userName : 'Undefine'} </div>
                                        <div> <b className="text-capitalize"> email: </b> {order.email} </div>
                                        <div> <b className="text-capitalize"> phone: </b> {order.phone} </div>
                                        <div> <b className="text-capitalize"> orderQuantity: </b> {order.orderQuantity} </div>
                                        <div> <b className="text-capitalize"> orderPrice: </b> {order.orderPrice} </div>
                                        <div> <b className="text-capitalize"> address: </b> {order.address} </div>
                                    </Card.Text>
                                </Card.Body>
                                <div className="d-flex">
                                    <button onClick={() => handlePayment(order._id)} className="w-100 btn btn-primary mt-auto" disabled={order.paid}> {order.paid ? 'Padi' : 'Payment'} </button>
                                    <button onClick={() => handleRemove(order._id)} className="w-100 btn btn-danger mt-auto" disabled={!order.delivered}> cancel order </button>
                                </div>
                            </Card>
                        </Col>
                    )) : <p className="text-danger"> No orders hare </p>
                }
            </Row>


        </div>
    );
};

export default MyOrders;