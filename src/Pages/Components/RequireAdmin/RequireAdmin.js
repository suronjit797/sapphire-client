import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAdmin = ({ children }) => {

    const [user,setUser] = useState({})
    const [loading, setLoading] = useState(true)

    // location
    let location = useLocation();
    useEffect(() => {
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            setUser(res.data)
            setLoading(false)
        })
    }, [loading])

    // loading spinner
    if (loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    if(user.role !== 'admin'){
        return <Navigate to='/' replace />
    }




    return children
};

export default RequireAdmin;