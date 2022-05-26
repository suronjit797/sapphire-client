import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';

const AddReview = () => {
    const { isLoading, error, data: review } = useQuery('review', () =>
        axios.get('/review?limit=20').then(res => res.data)
    )

    useEffect(() => {
        document.title = 'All Review || SAPPHIRE'
    }, [])
    return (
        <div>
            <Table hover striped className='text-center'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Review</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(review) && review.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td>{item.email}</td>
                                <td>{item.review}</td>

                            </tr>
                        ))
                    }


                </tbody>
            </Table>
        </div>
    );
};

export default AddReview;