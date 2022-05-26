import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { isLoading, error, data: users, refetch } = useQuery('products', () =>
        axios.get('/users').then(res => res.data)
    )


    const handleRemove = id => {
        Swal.fire({
            title: 'Are you suer want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Delete',
            denyButtonText: `Don't Delete`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`/users/${id}`)
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
    const handleAdmin = email => {
        Swal.fire({
            title: 'Are you suer want to delete?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Make admin',
            denyButtonText: `Don't Change`,
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`/make-admin`, {email})
                    .then(res => {
                        Swal.fire('Update!', '', 'success')
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
        <div>
            <Table hover striped className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(users) && users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role ? user.role : 'user'}</td>
                                <td>
                                    <Button variant='primary' disabled={user?.role === 'admin'} className='me-2' onClick={() => handleAdmin(user.email) }> Make admin </Button>
                                    <Button variant='danger' onClick={() => handleRemove(user._id)}> Remove </Button>
                                </td>
                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default ManageUsers;