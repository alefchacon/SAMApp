import React from "react";
import PropTypes from "prop-types";

import EditIcon from "../icons/EditIcon";

export default function Button({
  label = "label",
  variant,
  icon = <EditIcon></EditIcon>,
  onClick,
}) {
  Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "text"]).isRequired,
  };
  return (
    <>
      <button className={`sam-button ${variant}`}>
        {icon}
        {label}
      </button>
    </>
  );
}
