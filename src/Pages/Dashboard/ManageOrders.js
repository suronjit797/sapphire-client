import axios from 'axios';
import React, { useEffect } from 'react';
import {  Card, Col, Row, Spinner } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageOrders = () => {
    const { isLoading, error, data: orders, refetch } = useQuery('orders', () =>
        axios.get('/orders').then(res => res.data)
    )

    useEffect(() => {
        document.title = 'Manage order || SAPPHIRE'
    }, [])


    const handleRemove = id => {
        Swal.fire({
            title: 'Are you suer want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/order/${id}`)
                    .then(res => {
                        Swal.fire('Remove!', '', 'success')
                        refetch()
                    })
                    .catch(error => {
                        Swal.fire(error.message, '', 'error')
                    })
            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }
    
    const handleDelivered = id => {
        axios.put(`/order/${id}`,)
            .then(res => {
                console.log(res.data)
                refetch()
            })
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
                    orders.length ? orders.map(order => (
                        <Col key={order._id}>
                            <Card className='h-100'>
                                <Card.Body>
                                    <Card.Title className='fw-bold'> {order.productName || 'Undefine'} </Card.Title>
                                    <div>
                                        <small> {order.delivered ?
                                            <small className="border border-2 d-inline-block p-1 px-2 mb-2 rounded-pill border-success  text-success">Delivered</small> :
                                            <small className="border border-2 d-inline-block p-1 px-2 mb-2 rounded-pill border-warning  text-warning">Pending</small>} </small>
                                        <div> <b className="text-capitalize"> userName: </b> {order.userName ? order.userName : 'Undefine'} </div>
                                        <div> <b className="text-capitalize"> email: </b> {order.email} </div>
                                        <div> <b className="text-capitalize"> phone: </b> {order.phone} </div>
                                        <div> <b className="text-capitalize"> orderQuantity: </b> {order.orderQuantity} </div>
                                        <div> <b className="text-capitalize"> orderPrice: </b> {order.orderPrice} </div>
                                        <div> <b className="text-capitalize"> address: </b> {order.address} </div>
                                    </div>
                                </Card.Body>
                                <div className="d-flex">
                                    <button onClick={() => handleDelivered(order._id)} className="w-100 btn btn-primary mt-auto" disabled={order.delivered}> Delivery </button>
                                    <button onClick={() => handleRemove(order._id)} className="w-100 btn btn-danger mt-auto" disabled={!order.delivered}> Remove </button>
                                </div>
                            </Card>
                        </Col>
                    )): <p className="text-danger"> No orders hare </p>
                }
            </Row>


        </div>
    );
};

export default ManageOrders;