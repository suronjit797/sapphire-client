import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const RequireAdmin = ({ children }) => {

    const [user,setUser] = useState({})
    const [loading, setLoading] = useState(true)

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
    // location
    let location = useLocation();

    // loading spinner
    if (loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }




    console.log(user.role);
    return children
};

export default RequireAdmin;