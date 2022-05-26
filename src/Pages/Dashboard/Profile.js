import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2'
import auth from '../../firebase.init';
import defaultUser from '../../Images/user.png'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faXmark } from '@fortawesome/free-solid-svg-icons'

const Profile = () => {
    const [user, loading, error] = useAuthState(auth);
    const [userDb, setUserDb] = useState({})
    const [userData, setUserData] = useState({})
    const [open, setOpen] = useState(true)
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [company, setCompany] = useState('')

    useEffect(() => {
        document.title = 'Profile || SAPPHIRE'
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/jwt-verify', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUserDb(res.data))
    }, [])
    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => setUserData(res.data))
    }, [address, company, phone])



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

    const handleProfileSubmit = event => {
        event.preventDefault()
        const token = localStorage.getItem('token')
        axios.post('/user', { phone, company, address }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(res => {
                setOpen(true)
                setPhone('')
                setAddress('')
                setCompany('')
            })
    }



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
            <div className="profile-card rounded my-4 p-3 position-relative">
                <div className="text-center">
                    <img src={user?.photoURL || defaultUser} alt="" />
                    <h4 className="name mt-4 mb-0"> {user.displayName} </h4>
                    <p className='text-success m-0' > {userDb.role} </p>
                </div>
                <p className="m-1">
                    <b className="text-primary">Email: </b>
                    {user.email ? user.email : <span className="text-danger"> No data found </span>}
                </p>
                <p className="m-1">
                    <b className="text-primary">Phone: </b>
                    {userData.phone ? userData.phone : <span className="text-danger"> No data found </span>}
                </p>
                <p className="m-1">
                    <b className="text-primary">Address: </b>
                    {userData.address ? userData.address : <span className="text-danger"> No data found </span>}
                </p>
                <p className="">
                    <b className="text-primary">Company Name: </b>
                    {userData.company ? userData.company : <span className="text-danger"> No data found </span>}
                </p>


                <div className="d-flex justify-content-between align-items-center">
                    <p className='m-0'>My orders: 10</p>
                    <Link to='/' className='btn btn-primary' > Go to My Order </Link>
                </div>
                <FontAwesomeIcon className='profile-edit' onClick={() => setOpen(false)} icon={faPenToSquare} />
            </div>
            {/* open */}
            <div className={`profileForm ${open ? 'd-none' : ''}`} >
                <form onSubmit={handleProfileSubmit}>
                    <div className="text-end"> <FontAwesomeIcon onClick={() => setOpen(true)} className='close mb-3' icon={faXmark} /> </div>
                    <input
                        required
                        placeholder='Phone number'
                        type="number"
                        name="phone"
                        id="phone"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                    />
                    <input
                        required
                        placeholder='Address'
                        type="text"
                        name="address"
                        id="address"
                        value={address}
                        onChange={e => setAddress(e.target.value)}
                    />
                    <input
                        required
                        placeholder='Company Name'
                        type="text"
                        name="company"
                        id="company"
                        value={company}
                        onChange={e => setCompany(e.target.value)}
                    />
                    <button className="btn btn-primary"> Update profile </button>
                </form>
            </div>





        </div>
    );
};

export default Profile;