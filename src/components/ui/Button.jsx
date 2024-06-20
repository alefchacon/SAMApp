import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import EditIcon from "../icons/EditIcon";

export default function Button({
  label = "label",
  type = "button",
  isDisabled = false,
  variant = "primary",
  icon = <EditIcon></EditIcon>,
  onClick,
}) {
  Button.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "text"]).isRequired,
  };

  const [disabledClass, setDisabledClass] = useState();

  useEffect(() => {
    setDisabledClass(`${isDisabled ? "disabled" : ""}`);
  }, [isDisabled]);

  return (
    <>
      <button
        disabled={isDisabled}
        type={type}
        className={`sam-button ${variant} ${disabledClass}`}
        onClick={onClick}
      >
        {icon}
        {label}
      </button>
    </>
  );
}
