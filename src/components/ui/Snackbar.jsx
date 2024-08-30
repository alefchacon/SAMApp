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
  duration = 10000,
  children,
  isError = false,
  iconType = "add",
}) {
  const [isOpen, setIsOpen] = useState(open);

  const { showModal } = useModal();

  useEffect(() => {
    if (open) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  return (
    <div
      className={`snackbar ${isError && "error"} ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div className="flex-row">
        <span className="material-symbols-outlined">
          {isError ? "error" : iconType}
        </span>
        {children}
      </div>
      <Button
        className="icon-only color-white"
        iconType="close"
        onClick={() => setIsOpen(false)}
      ></Button>
    </div>
  );
}
