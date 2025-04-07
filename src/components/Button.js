import React from 'react';
import { Link } from 'react-router-dom';
import './Button.css'; // Import the external CSS file

const Button = ({ className, text, to, ...props }) => {
  return (
    <div className={`styled-wrapper ${className}`}>
      {to ? (
        <Link to={to} className={`button ${className}`} {...props}>
          {text}
        </Link>
      ) : (
        <button className={`button ${className}`} {...props}>
          {text}
        </button>
      )}
    </div>
  );
};

export default Button;
