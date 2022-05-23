import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2'
import auth from '../../firebase.init';
import defaultUser from '../../Images/user.png'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);

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

    console.log(user);

    return (
        <div className='h-100 d-flex align-items-center justify-content-center'>
            <div className="profile-card text-center my-4">
                <img src={user?.photoURL || defaultUser } alt="" />
                <h3 className="name"> {user?.displayName} </h3>
                <p className="name"> {user?.email} </p>
            </div>
        </div>
    );
};

export default Profile;