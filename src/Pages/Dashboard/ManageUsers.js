import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Spinner, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const { isLoading, error, data: users } = useQuery('products', () =>
        axios.get('/users').then(res => res.data)
    )


    const handleRemove = () => {

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
                        users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.role}</td>
                                <td>
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