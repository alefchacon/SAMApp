//LIBRARIES
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
//CUSTOM COMPONENTS
import Button from "./Button";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

//PROVIDERS
import { useModal } from "../contexts/ModalContext";

//JS
import { snackbarTypes } from "../contexts/snackbarTypes";

export default function Snackbar({
  open = false,
  onClose,
  duration = 5000,
  type,
}) {
  const [isOpen, setIsOpen] = useState(open);

  const { showModal } = useModal();

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, 1000);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  return (
    <div className={`snackbar ${isOpen ? "visible" : "invisible"}`}>
      <div>
        <CheckIcon></CheckIcon>
        {type.message}
      </div>
      <Button
        onClick={type.action}
        label={type.labelAction}
        variant="text"
        icon={type.icon}
      ></Button>
    </div>
  );
}
