import React from 'react';
import { Carousel } from 'react-bootstrap'
import './Banner.css'

import banner from '../../../Images/banner.jpg'
import banner2 from '../../../Images/banner2.jpg'

const Banner = () => {
    return (
        <Carousel indicators={false}>
            <Carousel.Item>
                <img
                    className="d-block w-100 h-100"
                    src={banner}
                    alt="First slide"
                />
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100 h-100"
                    src={banner2}
                    alt="First slide"
                />
                {/* <Carousel.Caption>
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption> */}
            </Carousel.Item>
        </Carousel>
    );
};

export default Banner;