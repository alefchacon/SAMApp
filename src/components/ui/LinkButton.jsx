// LIBRARIES
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// ICONS
import EditIcon from "../icons/EditIcon";

export default function LinkButton({
  label = "label",
  type = "button",
  isDisabled = false,
  variant = "primary",
  icon = <EditIcon></EditIcon>,
  href = "/asdf",
}) {
  LinkButton.propTypes = {
    variant: PropTypes.oneOf(["primary", "secondary", "text"]).isRequired,
  };

  const [disabledClass, setDisabledClass] = useState();

  useEffect(() => {
    setDisabledClass(`${isDisabled ? "disabled" : ""}`);
  }, [isDisabled]);

  return (
    <>
      <Link
        to={href}
        disabled={isDisabled}
        className={`sam-button ${variant} ${disabledClass}`}
      >
        {icon}
        {label}
      </Link>
    </>
  );
}
