import React from "react";

const Button = ({ children, className = "", disabled, ...props }) => {
  return (
    <button
      disabled={disabled}
      className={`active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;