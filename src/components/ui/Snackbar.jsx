import { useState, useEffect } from "react";

import Button from "./Button";
import CheckIcon from "../icons/CheckIcon";
import CloseIcon from "../icons/CloseIcon";

export default function Snackbar({ visible = false }) {
  const [isVisible, setIsVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible]);

  return (
    <div className={`snackbar ${isVisible ? "visible" : ""}`}>
      <div>
        <CheckIcon></CheckIcon>
        Especie agregada
      </div>
      <Button label="Deshacer" variant="text" icon={<CloseIcon />}></Button>
    </div>
  );
}
