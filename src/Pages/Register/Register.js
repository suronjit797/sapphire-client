import { Link, useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import SocialSignIn from '../Components/SocialSignIn/SocialSignIn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import { useForm } from "react-hook-form";
import SocialSignInMobile from '../Components/SocialSignIn/SocialSignInMobile';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';
import { useEffect } from 'react';
import firebaseErrorMsg from '../Components/firebaseErrorMsg'
import { Spinner } from 'react-bootstrap';
import axios from 'axios';


const Register = () => {
    const navigate = useNavigate()
    const location = useLocation()
    let form = location?.state?.from?.pathname || "/";


    useEffect(() => {
        document.title = 'Register|| SAPPHIRE'
    }, [])


    // firebase hooks
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    // if error
    useEffect(() => {
        if (error || updateError) {
            firebaseErrorMsg(error.message || updateError.message)
            return
        }
    }, [error, updateError])

    // if user
    useEffect(() => {
        if (user) {
            axios.put('/users', { email: user.user.email, name: user.user.displayName })
                .then(res => {
                    if (res) {
                        axios.post('/token', { email: user.user.email })
                            .then(res => {
                                if (res) {
                                    localStorage.setItem('token', res.data.token)
                                    navigate(form)
                                }
                            })
                    }
                })
            return
        }
    }, [user, navigate, form])


    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const { name, email, password, confirmPassword } = data
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password)
            await updateProfile({ displayName: name })
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Password doesn't match",
            })
        }
    }


    // loading
    if (loading || updating) {
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
                            <h4> Create a new account </h4>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="input">
                                    <input
                                        type='text'
                                        id='name'
                                        {...register("name", { required: true })}
                                        placeholder="Name"
                                    />
                                    <label htmlFor="name"> <FontAwesomeIcon icon={faUser} /> </label>
                                    {errors.name && <p className='text-warning text-start'> Please provide your name! </p>}
                                </div>
                                <div className="input">
                                    <input
                                        type='email'
                                        id='email'
                                        {...register("email", { required: true })}
                                        placeholder="Email"
                                    />
                                    <label htmlFor="email"> <FontAwesomeIcon icon={faEnvelope} /> </label>
                                    {errors.email && <p className='text-warning text-start'> Please provide a valid email! </p>}
                                </div>
                                <div className="input">
                                    <input
                                        type='password'
                                        id='password'
                                        {...register("password", { required: true, minLength: 6 })}
                                        placeholder="Password"
                                    />
                                    <label htmlFor="password"> <FontAwesomeIcon icon={faLock} /> </label>
                                    {errors?.password?.type === 'required' && <p className='text-warning text-start'> Please provide password! </p>}
                                    {errors?.password?.type === 'minLength' && <p className='text-warning text-start'> Password must be at last 6 character! </p>}
                                </div>
                                <div className="input">
                                    <input
                                        type='password'
                                        id='confirmPassword'
                                        {...register("confirmPassword", { required: true, minLength: 6 })}
                                        placeholder="Confirm Password"
                                    />
                                    <label htmlFor="confirmPassword"> <FontAwesomeIcon icon={faLock} /> </label>
                                    {errors?.confirmPassword?.type === 'required' && <p className='text-warning text-start'> Please provide password! </p>}
                                    {errors?.confirmPassword?.type === 'minLength' && <p className='text-warning text-start'> Password must be at last 6 character! </p>}
                                </div>

                                <button type='submit' className="btn btn-primary w-100 mt-4 rounded-pill">Register </button>
                            </form>

                            <p className='mt-3'> Already have an account? <Link to='/login'> Login Now </Link> </p>

                            <SocialSignInMobile />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Register;