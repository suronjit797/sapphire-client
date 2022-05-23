import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import SocialSignIn from '../Components/SocialSignIn/SocialSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import SocialSignInMobile from '../Components/SocialSignIn/SocialSignInMobile';

import './Login.css'
import auth from '../../firebase.init';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import FirebaseErrorMsg from '../Components/firebaseErrorMsg';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let form = location?.state?.from?.pathname || "/";

    // firebase hooks
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    // if error
    useEffect(() => {
        if (error) {
            FirebaseErrorMsg(error.message)

        }
    }, [error])

    // if user
    useEffect(() => {
        if (user) {
            axios.post('/token', { email: user.user.email })
                .then(res => {
                    if (res) {
                        localStorage.setItem('token', res.data.token)
                        navigate(form)
                    }
                })

        }
    }, [user, navigate, form])


    // react hooks form
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        const { email, password } = data
        signInWithEmailAndPassword(email, password)
    };

    const handleReset = () => {

    }


    // if loading
    if (loading) {
        return (
            <div className='center'>
                <Spinner animation="border" variant="primary" />
            </div>
        )
    }

    return (
        <div className='form'>
            <div className="container">
                <div className="form_inner">
                    <div className="form_left">
                        <SocialSignIn />
                    </div>
                    <div className="form_right">
                        <div>
                            <h2>Sapphire</h2>
                            <h4> Login into your account </h4>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input">
                                    <input
                                        type='email'
                                        {...register("email", { required: true })}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /> </label>

                                    {errors.email && <p className='text-white text-start'> Please provide a valid email! </p>}
                                </div>
                                <div className="input">
                                    <input
                                        type='password'
                                        {...register("password", { required: true, minLength: 6 })}
                                        placeholder="Password"
                                    />
                                    <label htmlFor="password"> <FontAwesomeIcon icon={faLock} /> </label>
                                </div>

                                <div className="d-block text-start d-sm-flex justify-content-between my-4">
                                    <div className="form-check mb-3">
                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckCheckedDisabled" ></input>
                                        <label className="form-check-label" htmlFor="flexCheckCheckedDisabled">
                                            Remember me
                                        </label>
                                    </div>
                                    <div onClick={handleReset} > Forget password? </div>
                                </div>

                                <button type='submit' className="btn btn-primary w-100 rounded-pill">Login </button>
                            </form>

                            <p className='mt-3'> Dont have an account? <Link to='/register'> Register Now </Link> </p>

                            <SocialSignInMobile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;