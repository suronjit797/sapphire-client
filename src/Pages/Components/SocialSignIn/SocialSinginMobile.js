import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle, faFacebookF, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons'

const SocialSinginMobile = () => {
    return (
        <div className='d-block d-md-none'>
            <div className="social">
                <span className='social_icons faGoogle'> <FontAwesomeIcon icon={faGoogle} /></span>
                <span className='social_icons faFacebookF'> <FontAwesomeIcon icon={faFacebookF} /></span>
                <span className='social_icons faGithub'> <FontAwesomeIcon icon={faGithub} /></span>
                <span className='social_icons faLinkedin'> <FontAwesomeIcon icon={faLinkedin} /></span>
            </div>
        </div>
    );
};

export default SocialSinginMobile;