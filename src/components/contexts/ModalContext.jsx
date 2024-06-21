import { Fragment, createContext, useContext, useState } from "react";

import Modal from "../ui/Modal";

const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [handleUndo, setHandleUndo] = useState(null);
  const [content, setContent] = useState(null);

  const showSnackbar = () => {
    /*
    setMessage(message);
    setContent(content);
    setHandleUndo(() => onUndo);
    */
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    /*
    setMessage("");
    setContent(null);
    */
    setOpen(false);
  };

  return (
    <ModalContext.Provider value={{ showSnackbar }}>
      {children}
      <Modal open={open} onClose={handleClose} />
    </ModalContext.Provider>
  );
}
