import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import CheckoutForm from '../../Purchase/CheckoutForm';
import {
    Elements,

} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51L2xACGDwhQzJu6wWcWF0eTNpLTfoiILBu0oaxxhPIa7Qq1A5XDRbOht4Z5T6BXxkjnQHqBrji7dhWLCpBw1Ghc000WTiwtXIr');


const MyModal = (props) => {




    return (
        <div>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Payment process
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Elements stripe={stripePromise}>
                        <CheckoutForm onHide={props.onHide} payment_data={props.payment_data} refetch={props.refetch} />
                    </Elements>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MyModal;