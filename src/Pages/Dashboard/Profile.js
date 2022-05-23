import React, { useEffect, useState } from 'react';
import {Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2'
import auth from '../../firebase.init';
import defaultUser from '../../Images/user.png'
import axios from 'axios'
import { Link } from 'react-router-dom';

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userDb, setUserDb] = useState({})

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUserDb(res.data))
    }, [])

    // error message
    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }, [error])

    // loading spinner
    if (loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }







    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className="profile-card rounded my-4 p-3">
                <div className="text-center">
                    <img src={user?.photoURL || defaultUser} alt="" />
                    <h4 className="name mt-4 mb-0"> {user.displayName} </h4>
                    <p className='text-success m-0' > {userDb.role} </p>
                    <p className="name">Email: {user.email} </p>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <p className='m-0'>My orders: 10</p>
                    <Link to='/' className='btn btn-primary' > Go to My Order </Link>
                </div>

            </div>
        </div>
    );
};

export default Profile;