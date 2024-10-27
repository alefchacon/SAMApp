//LIBRARIES
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
//CUSTOM COMPONENTS
import Button from "./Button";

export default function Snackbar({
  open = false,
  onClose,
  duration = 100000,
  children,
  isError = false,
  iconType = "add",
}) {
  const [isOpen, setIsOpen] = useState(open);

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
      className={`snackbar box-shadow ${isError && "error"} ${
        isOpen ? "visible2" : "invisible"
      }`}
    >
      <div className="flex-row w-100">
        {iconType && (
          <span className="material-symbols-outlined">
            {isError ? "warning" : iconType}
          </span>
        )}
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
