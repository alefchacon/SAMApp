import { useState, useEffect } from "react";

import PropTypes from "prop-types";

export default function Button({
  children,
  type = "button",
  isDisabled = false,
  className = "primary",
  iconType = "add",
  onClick,
  value = null,
  smallIcon = false,
}) {
  const handleClick = () => {
    if (value) {
      return onClick(value);
    } else if (onClick) {
      onClick();
    }
  };
  return (
    <button
      disabled={isDisabled}
      type={type}
      className={`sam-button focusable ${className} ${
        isDisabled ? "disabled" : ""
      }`}
      onClick={handleClick}
    >
      <span
        className={`material-symbols-outlined`}
        style={{ fontSize: "1.3rem" }}
      >
        {iconType}
      </span>
      {children}
    </button>
  );
}
