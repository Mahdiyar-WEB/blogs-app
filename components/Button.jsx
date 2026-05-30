import React from "react";

const buttonVariants = {
  primary: "btn--primary",
  secondary: "btn--secondary",
  outline: "btn--outline",
  danger: "btn--danger",
};

const Button = ({
  onClick,
  children,
  className,
  variant = "primary",
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={`btn ${buttonVariants[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
