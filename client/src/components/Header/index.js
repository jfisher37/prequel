import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div>
      <header className="bg-info text-dark mb-4 py-3 display-flex align-center">
        <div className="container flex-column justify-space-between-lg justify-center align-center text-center">
          <h1 className="m-0" style={{ fontSize: '3rem' }}>
            ***FUTURE TITLE
          </h1>
        </div>
      </header >
      <Navbar className="navbar-margin" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link className="nav-item nav-link" to="/">Home</Link>
            <Link className="nav-item nav-link" to="/upload"> Upload</Link>
            {Auth.loggedIn() ? (
              <>
                <Link className="nav-item nav-link" to="/me">
                  View My Profile
                </Link>
                <Link className="nav-item nav-link" onClick={logout}>
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-item nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-item nav-link" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar >
    </div>

  );
};

export default Header;
