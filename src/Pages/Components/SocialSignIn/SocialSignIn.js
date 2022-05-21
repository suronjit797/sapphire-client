import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import './SocialSignIn.css'


const SocialSignIn = () => {
    return (
        <div>
            <h2 className='text-uppercase fw-bold'> welcome to <span className="text-primary">Sapphire</span> </h2>
            <p className='my-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quo, vel inventore, commodi voluptatibus magnam nulla eos totam iure, nostrum tempore quos doloremque!</p>

            <div className="social">
                <span className='social_icons faGoogle'> <FontAwesomeIcon icon={faGoogle} /></span>
                <span className='social_icons faFacebookF'> <FontAwesomeIcon icon={faFacebookF} /></span>
                <span className='social_icons faGithub'> <FontAwesomeIcon icon={faGithub} /></span>
                <span className='social_icons faLinkedin'> <FontAwesomeIcon icon={faLinkedin} /></span>
            </div>
        </div>
    );
};

export default SocialSignIn;