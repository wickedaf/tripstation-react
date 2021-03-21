import React, { useContext } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import './Header.css';

const Header = () => {
    const [loggedInUser, setLoggedInUser ] = useContext(UserContext);
    return (
        <Container className="p-1">
            <Navbar expand="lg" >
                <Navbar.Brand href="/home"><h1>TRIPSTATION</h1></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                    <Nav>
                        <Link className="px-4 link-style"  to="/home">Home</Link>
                        <Link className="px-4 link-style" to="/trip-type/destination">Destination</Link>
                        <Link className="px-4 link-style" to="#link">Blog</Link>
                        <Link className="px-4 link-style" to="#link">Contact</Link>
                        { loggedInUser.success 
                            ? <Button variant="danger"><Link style={{ textDecoration: 'none', color: 'white' }} onClick={() => setLoggedInUser({})}>Logout</Link></Button>
                            : <Button variant="danger"><Link style={{ textDecoration: 'none', color: 'white' }} to="/login">Login</Link></Button>
                        }
                        
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <hr/>
        </Container>
    );
};

export default Header;