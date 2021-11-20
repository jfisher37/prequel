import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const history = useHistory();
  return (
    <footer className="w-100 mt-auto text-dark p-4">
      <div className="container text-center mb-5">
        <h4 className='footer-font'>&copy; {new Date().getFullYear()} - Prequel Inc.</h4>
      </div>
    </footer>
  );
};

export default Footer;
