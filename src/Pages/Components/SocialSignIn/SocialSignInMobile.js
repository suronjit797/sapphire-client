import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

const SocialSignInMobile = () => {
    return (
        <div className='d-block d-md-none'>
            <div className="social">
                <span className='social_icons faGoogle'> <FontAwesomeIcon icon={faGoogle} /></span>
                <span className='social_icons faFacebookF'> <FontAwesomeIcon icon={faFacebookF} /></span>
                <span className='social_icons faGithub'> <FontAwesomeIcon icon={faGithub} /></span>
                <span className='social_icons faLinkedin'> <FontAwesomeIcon icon={faLinkedinIn} /></span>
            </div>
        </div>
    );
};

export default SocialSignInMobile;