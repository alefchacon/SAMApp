import { useState, useEffect } from "react";

import Button from "./Button";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

export default function Snackbar({ open = false, onClose, duration = 5000 }) {
  const [isOpen, setIsOpen] = useState(open);

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
        Especie agregada
      </div>
      <Button label="Deshacer" variant="text" icon={<CloseIcon />}></Button>
    </div>
  );
}
