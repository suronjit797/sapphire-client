import React from 'react';
import Swal from 'sweetalert2'
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp, faDollarSign, faArrowUp19, faArrowDownUpAcrossLine } from '@fortawesome/free-solid-svg-icons'
import { faProductHunt } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios';
import auth from '../../firebase.init';
import { useAuthState } from 'react-firebase-hooks/auth';


const AddProduct = () => {

    // make data formate
    const dt = new Date()
    const YYYY = '' + dt.getFullYear()
    let MM = '' + (dt.getMonth() + 1)
    let DD = '' + dt.getDate()
    if (MM.length < 2) {
        MM = '0' + MM;
    }
    if (DD.length < 2) {
        DD = '0' + DD;
    }

    const [user] = useAuthState(auth);



    // react form
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const { name, quantity, price, date, image, limit, description } = data
        const formData = new FormData()
        formData.append('image', image[0])

        // imagebb link
        const curl = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_IMG_BB}`

        if ((image[0].size / 1024) > 1024) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Image size must be under 1mb',
            })
        } else {
            // upload image in imageBB
            axios.post(curl, formData)
                .then(res => {
                    const { title, url, delete_url } = res.data.data
                    axios.post('/product', { name, quantity, price, date, limit, description, image: { title, url, delete_url }, email: user.email })
                        .then(res => {
                            if(res.data.acknowledged){
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Done',
                                    text: 'Products add successfully',
                                })
                                reset()
                            }
                        })
                })
        }

    }



    return (
        <div className='addProduct'>
            <div className="addProductInner">
                <h4 className='mb-4'> Add a product </h4>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input">
                        <input
                            type='text'
                            className='form-control'
                            id='name'
                            {...register("name", { required: true })}
                            placeholder=" Products Name"
                        />
                        <label htmlFor="name"> <FontAwesomeIcon icon={faProductHunt} /> </label>
                        {errors.name && <p className='text-danger mt-1 text-start'> Please provide a valid email! </p>}
                    </div>
                    <div className="input">
                        <input
                            type='number'
                            className='form-control'
                            id='quantity'
                            {...register("quantity", { required: true })}
                            placeholder=" Products Quantity"
                        />
                        <label htmlFor="quantity"> <FontAwesomeIcon icon={faArrowUp19} /> </label>
                        {errors.quantity && <p className='text-danger mt-1 text-start'> Please provide quantity! </p>}
                    </div>
                    <div className="input">
                        <input
                            type='number'
                            className='form-control'
                            id='limit'
                            {...register("limit", { required: true })}
                            placeholder=" Minimum Products Limits"
                        />
                        <label htmlFor="limit"> <FontAwesomeIcon icon={faArrowDownUpAcrossLine} /> </label>
                        {errors.limit && <p className='text-danger mt-1 text-start'> Please provide Minimum Products Limits! </p>}
                    </div>
                    <div className="input">
                        <input
                            type='number'
                            className='form-control'
                            id='price'
                            {...register("price", { required: true })}
                            placeholder=" Products Price"
                        />
                        <label htmlFor="price"> <FontAwesomeIcon icon={faDollarSign} /> </label>
                        {errors.price && <p className='text-danger mt-1 text-start'> Please provide Price! </p>}
                    </div>
                    <div className="input">
                        <input
                            type='date'
                            className='form-control'
                            defaultValue={`${YYYY}-${MM}-${DD}`}
                            id='price'
                            {...register("date", { required: true })}
                        />
                        {errors.email && <p className='text-danger mt-1 text-start'> Please provide a date! </p>}
                    </div>
                    <div className="input">
                        <input
                            type='file'
                            className='form-control'
                            id='image'
                            {...register("image", { required: true })}
                            placeholder=" Images"
                        />
                        <label htmlFor="image" className='imageLabel'>
                            <span className="me-3">Upload a Image</span>
                            <FontAwesomeIcon icon={faCloudArrowUp} />
                        </label>
                        {errors.image && <p className='text-danger mt-1 text-start'> Please provide a image! </p>}
                    </div>
                    <div className="input">
                        <textarea
                            rows='5'
                            className='form-control'
                            id='image'
                            {...register("description", { required: true })}
                            placeholder=" Write a short description"
                        />
                        {errors.description && <p className='text-danger mt-1 text-start'> Please provide your short description! </p>}
                    </div>


                    <button type='submit' className="btn mt-3 btn-primary w-100 rounded-pill"> Add Product </button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;