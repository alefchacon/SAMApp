//LIBRARIES
import React, { useState, useEffect, ReactNode } from "react";
import IOnCloseParams from "../contexts/IOnCloseProps";

interface ISnackbarProps {
  open?: boolean;
  onClose?: (params: IOnCloseParams) => void;
  duration?: number;
  children?: ReactNode;
  isError?: boolean;
  iconType?: string;
}
export default function Snackbar(props: ISnackbarProps) {
  const [isOpen, setIsOpen] = useState<boolean | undefined>(props.open);

  useEffect(() => {
    if (props.open) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
        if (props.onClose) {
          const onCloseParams: IOnCloseParams = {
            event: null,
            reason: "",
          };
          props.onClose(onCloseParams);
        }
      }, props.duration);

      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [open]);

  return (
    <div
      className={`snackbar shadow-all ${props.isError ? "error" : ""} ${
        isOpen ? "visible2" : "invisible"
      }`}
    >
      <div className="flex-row w-100">
        {props.iconType && (
          <span className="material-symbols-outlined">
            {props.isError ? "warning" : props.iconType}
          </span>
        )}
        {props.children}
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={() => setIsOpen(false)}
      >
        X
      </button>
    </div>
  );
}
