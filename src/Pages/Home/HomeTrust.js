import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsRotate, faHeadset, faRocket, faSackDollar } from '@fortawesome/free-solid-svg-icons';

const HomeTrust = () => {
    return (
        <div className="">
            <div className='container py-4'>
                <div className="text-center mb-5">
                    <h1 className="fw-bold"> Our loyalty  </h1>
                    <p className="fw-bold"> Try to understand our service, your expectation our product</p>

                </div>
                <div className="row g-5 align-items-center">
                    <div className="col-md-3 col-sm-6">
                        <div className="d-flex">
                            <div className="fs-1 text-center me-3 text-info">
                                <FontAwesomeIcon icon={faRocket} />
                            </div>
                            <div>
                                <p className="fw-bold mb-0"> Free delivery </p>
                                <p className=' text-center mb-0'> Worldwide from 75$ </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="d-flex">
                            <div className="fs-1 text-center me-3 text-primary">
                                <FontAwesomeIcon icon={faArrowsRotate} />
                            </div>
                            <div>
                                <p className="fw-bold mb-0"> Easy return </p>
                                <p className=' text-center mb-0'> Worldwide from 75$ </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="d-flex">
                            <div className="fs-1 text-center me-3 text-warning">
                                <FontAwesomeIcon icon={faSackDollar} />
                            </div>
                            <div>
                                <p className="fw-bold mb-0"> Payment method </p>
                                <p className=' text-center mb-0'> Worldwide from 75$ </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6">
                        <div className="d-flex">
                            <div className="fs-1 text-center me-3 text-success">
                                <FontAwesomeIcon icon={faHeadset} />
                            </div>
                            <div>
                                <p className="fw-bold mb-0"> Support 24/7 </p>
                                <p className=' text-center mb-0'> Worldwide from 75$ </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeTrust;