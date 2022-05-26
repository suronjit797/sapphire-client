import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import './NotFound.css'

const NotFound = () => {

    useEffect(() => {
        document.title = 'Not found || SAPPHIRE'
    }, [])
    return (
        <div className='notFound'>
            <div className='text-center text-capitalize text-white'>
                <h1 className="fw-bold"> Oh!!! 4O4 not found  </h1>
                <p> this page is not found </p>
                <Link to='/' className='btn btn-primary'> back to home </Link>
            </div>
        </div>
    );
};

export default NotFound;