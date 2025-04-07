import React from 'react';
import './Button.css'; // Import the external CSS file

const Button = ({ className, text }) => {
  return (
    <div className={`styled-wrapper ${className}`}>
      <button>{text}</button>
    </div>
  );
};

export default Button;
