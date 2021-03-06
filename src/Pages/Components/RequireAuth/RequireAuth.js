import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../../firebase.init'
import Swal from 'sweetalert2'
import { Spinner } from 'react-bootstrap';
import { useEffect } from 'react';
import axios from 'axios';
import { signOut } from 'firebase/auth';

const RequireAuth = ({ children }) => {
    // fire base
    const [user, loading, error] = useAuthState(auth);
    // location
    let location = useLocation();

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

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => '')
            .catch(error => {
                if (error.request.status === 403 || error.request.status === 401) {
                    signOut(auth)
                    return <Navigate to="/login" state={{ from: location }} replace />;
                }
            })
    }, [location])

    // loading spinner
    if (loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }


    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
    return children;
};

export default RequireAuth;