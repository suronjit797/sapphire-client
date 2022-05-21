import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import SocialSignIn from '../Components/SocialSignIn/SocialSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import SocialSinginMobile from '../Components/SocialSignIn/SocialSinginMobile';

import './Login.css'

const Login = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);

    const handleReset = () => {

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

                            <SocialSinginMobile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;