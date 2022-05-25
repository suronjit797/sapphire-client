import React, { useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF, faGithub, faLinkedinIn, faTrash, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
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
            title: 'Are you sure want to delete?',
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
    const handleEdit = async (id, quantity) => {
        const { value: Quantity } = await Swal.fire({
            title: 'Input Quantity Number',
            input: 'number',
            inputLabel: 'Your Quantity Number',
            inputPlaceholder: 'Enter your Quantity Number',
            inputValidator: (value) => {
                if (!value) {
                    return 'Set a number to update quantity'
                }
            }
        })

        if (Quantity) {
            axios.put(`/product/${id}`, {quantity: parseInt(Quantity) + parseInt(quantity)})
                .then(res => {
                    console.log(res.data);
                    Swal.fire('Updated!', '', 'success')
                    refetch()
                })
                .catch(error => {
                    Swal.fire(error.message, '', 'error')
                })
        }




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
                                    <Button className='me-2' variant='primary' onClick={() => handleEdit(product._id, product.quantity)}> <FontAwesomeIcon icon={faPenToSquare} /> </Button>
                                    <Button variant='danger' onClick={() => handleRemove(product._id)}> <FontAwesomeIcon icon={faTrash} /> </Button>
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