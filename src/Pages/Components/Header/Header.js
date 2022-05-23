import React from 'react';
import { signOut } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom';
import auth from '../../../firebase.init';

import './Header.css'


const Header = () => {

    const [user] = useAuthState(auth);

    const handleSignOut = event => {
        event.preventDefault()
        localStorage.removeItem('token')
        signOut(auth)
    }


    return (
        <div>
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <h3 className='fw-bold mb-0'> SAPPHIRE </h3>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/blogs">Blogs</Nav.Link>
                            <Nav.Link as={NavLink} to="/portfolio">My Portfolio</Nav.Link>
                            {
                                user ? (
                                    <>
                                        <Nav.Link as={NavLink} to="/products">Products</Nav.Link>
                                        <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                                        <Nav onClick={handleSignOut} className='nav-link cursor-pointer fw-bold text-danger' to="/">Log out</Nav>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                                        <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
};

export default Header;