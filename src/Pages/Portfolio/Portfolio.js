import React from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowDown } from '@fortawesome/free-solid-svg-icons'

import portfolio from '../../Images/portfolio.jpg'
import assignment11 from '../../Images/assignment-11.png'
import assignment10 from '../../Images/assignment-10.png'
import musion from '../../Images/musion.png'

import './Portfolio.css'

const Portfolio = () => {

    return (
        <div className='container portfolio'>
            <Row className='align-items-center my-4'>
                <Col md={5}>
                    <img src={portfolio} alt="" />
                </Col>
                <Col md={7}>
                    <h3> Hi, There </h3>
                    <h1>I am <span className="text-primary"> Suronjit Pal </span></h1>
                    <p> I am Bangladeshi web designer and developer focused on MERN stack. I will make suer clean and user friendly experience. My passionate about building excellent website and improve about building </p>

                    <a href='#about' className="btn btn-primary"> More about me </a>
                </Col>
            </Row>

            <div id="about" className='my-4'>
                <h1 className="text-center fw-bold my-5">
                    About <span className="text-primary"> Me </span>
                </h1>
                <Row classNam='align-items-center'>
                    <Col lg={6} >
                        <h3> PERSONAL INFORMATION </h3>
                        <Row>
                            <Col md={6} >
                                <p> Name: <b> Suronjit Pal </b> </p>
                                <p> Age: <b> 23 </b> </p>
                                <p> Nationality: <b> Bangladesh </b> </p>
                                <p> Work Status: <b> Available </b> </p>
                            </Col>
                            <Col md={6} >
                                <p> Address: <b> Satkhira, Bangladesh </b> </p>
                                <p> Phone: <b> (+88) 01799057302 </b> </p>
                                <p> Email:
                                    <b> <a href="mailto:suronit797@gmail.com" className="text-black">suronit797@gmail.com</a></b>
                                </p>
                                <p> Language: <b> Bangla,English  </b> </p>
                            </Col>
                        </Row>
                        <a target='_blank' rel='noreferrer' href='https://drive.google.com/file/d/112OjH-ARDp4XiwQSC8ppaPw5XAB-_gi3/view?usp=sharing' className="btn btn-primary"> Download cv <span className='ms-2'> <FontAwesomeIcon icon={faCloudArrowDown} /> </span> </a>
                    </Col>
                    <Col lg={6} >
                        <div className='skill-progress'>
                            HTML
                            <ProgressBar variant="success" now={99} />
                            CSS
                            <ProgressBar variant="success" now={90} />
                            JS
                            <ProgressBar variant="info" now={80} />
                            REACT
                            <ProgressBar variant="primary" now={70} />
                            MONGO DB
                            <ProgressBar variant="primary" now={70} />
                            EXPRESS
                            <ProgressBar variant="info" now={75} />
                            NODE
                            <ProgressBar variant="danger" now={20} />
                        </div>
                    </Col>
                </Row>

            </div>

            <div id="portfolio" className="my-4">
                <h1 className="text-center fw-bold my-5">
                    My <span className="text-primary"> Portfolio </span>
                </h1>

                <Row xs={1} md={2} lg={3} className="g-4">
                    <Col>
                        <Card>
                            <div className="card-img-top portfolio_img" style={{ backgroundImage: `url(${assignment11})` }} />
                            <Card.Body>
                                <Card.Title> HIBISCUS </Card.Title>
                                <div>
                                    A MERN stack inventory management website
                                </div>
                                <div>
                                    <a target='_blank' rel='noreferrer' className='btn btn-primary' href="https://assignment-11-c705a.web.app/">  Live preview </a>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <div className="card-img-top portfolio_img" style={{ backgroundImage: `url(${assignment10})` }} />
                            <Card.Body>
                                <Card.Title> RANGER </Card.Title>
                                <div>
                                    A tourism booking website
                                </div>
                                <div>
                                    <a target='_blank' rel='noreferrer' className='btn btn-primary' href="https://assignment-10-e7cae.web.app/">  Live preview </a>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <div className="card-img-top portfolio_img" style={{ backgroundImage: `url(${musion})` }} />
                            <Card.Body>
                                <Card.Title> HIBISCUS </Card.Title>
                                <div>
                                    A inventory management website
                                </div>
                                <div>
                                    <a target='_blank' rel='noreferrer' className='btn btn-primary' href="https://suronjit797.github.io/musion/">  Live preview </a>
                                </div>


                            </Card.Body>
                        </Card>
                    </Col>
                </Row>




            </div>
        </div>
    );
};

export default Portfolio;