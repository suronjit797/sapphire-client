import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import Swal from 'sweetalert2'

import './SocialSignIn.css'


const SocialSignIn = () => {

    const handleGoogle = () => {

    }
    const handleFacebook = () => {
        Swal.fire({
            icon: 'warning',
            text: "This feature will available soon",
        })
    }
    const handleGitHub = () => {
        Swal.fire({
            icon: 'warning',
            text: "This feature will available soon",
        })
    }
    const handleLinkedIn = () => {
        Swal.fire({
            icon: 'warning',
            text: "This feature will available soon",
        })
    }







    return (
        <div>
            <h2 className='text-uppercase fw-bold'> welcome to <span className="text-primary">Sapphire</span> </h2>
            <p className='my-4'>You can find all kind of cars part hare at lower cost. We have contact with 100+ company. Our total customer up to 300+. You can also find hare your demanded products </p>

            <div className="social">
                <span className='social_icons faGoogle' onClick={handleGoogle} title='Login with google' >
                    <FontAwesomeIcon icon={faGoogle} />
                </span>
                <span className='social_icons faFacebookF' onClick={handleFacebook} title='Available soon' >
                    <FontAwesomeIcon icon={faFacebookF} />
                </span>
                <span className='social_icons faGithub' onClick={handleGitHub} title='Available soon' >
                    <FontAwesomeIcon icon={faGithub} />
                </span>
                <span className='social_icons faLinkedin' onClick={handleLinkedIn} title='Available soon' >
                    <FontAwesomeIcon icon={faLinkedinIn} />
                </span>
            </div>
        </div>
    );
};

export default SocialSignIn;