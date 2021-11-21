import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Auth from '../../utils/auth';

const Header = () => {
  // if user is not logged in, level is -1 which restricts certain privileges 
  let level = -1;
  if (Auth.getProfile()) {
    level = Auth.getProfile().data.level
  };
  // Calls logout function on click
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand className="main-header"> Prequel</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link className="nav-item nav-link" to="/">Home</Link>
          {Auth.loggedIn() ? (
            <>
              {level === 1 || level === 3 ? (<Link className="nav-item nav-link" to="/upload"> Upload</Link>) : ("")}
              {level === 1 || level === 3 ? (<Link className="nav-item nav-link" to="/me">
                View My Profile
              </Link>) : ("")}
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
  );
};

export default Header;
