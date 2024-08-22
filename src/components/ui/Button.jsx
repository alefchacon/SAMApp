import { useState, useEffect } from "react";

import EditIcon from "../icons/EditIcon";
import { Icons } from "../icons/Icons";

import PropTypes from "prop-types";

export default function Button({
  children,
  type = "button",
  isDisabled = false,
  className = "primary",
  iconType = "add",
  onClick,
}) {
  return (
    <>
      <button
        disabled={isDisabled}
        type={type}
        className={`sam-button focusable ${className} ${
          isDisabled ? "disabled" : ""
        }`}
        onClick={onClick}
      >
        <span className="material-symbols-outlined">{iconType}</span>
        {children}
      </button>
    </>
  );
}
