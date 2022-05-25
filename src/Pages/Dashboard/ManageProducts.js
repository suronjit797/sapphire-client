import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { useQuery } from 'react-query'

const ManageProducts = () => {

    const { isLoading, error, data: products, refetch } = useQuery('products', () =>
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

    // remove handler
    const handleRemove = id => {

        Swal.fire({
            title: 'Are you suer want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/product/${id}`)
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




    if (isLoading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return (
        <div>
            <Table hover striped className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Rating</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{parseInt(product.rating) / parseInt(product.totalRating || 1)}</td>
                                <td>
                                    <Button variant='danger' onClick={() => handleRemove(product._id)}> Remove </Button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default ManageProducts;