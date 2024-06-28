import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import EditIcon from "../icons/EditIcon";

export default function Button({
  label = "",
  type = "button",
  isDisabled = false,
  variant = "primary",
  icon = <EditIcon></EditIcon>,
  onClick,
}) {
  Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "text"]).isRequired,
  };

  return (
    <>
      <button
        disabled={isDisabled}
        type={type}
        className={`sam-button focusable ${variant} ${
          isDisabled ? "disabled" : ""
        }`}
        onClick={onClick}
      >
        {icon}
        {label}
      </button>
    </>
  );
}
