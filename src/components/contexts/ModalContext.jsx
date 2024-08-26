import { Fragment, createContext, useContext, useState } from "react";

import Modal from "../ui/modal/Modal";
const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [handleUndo, setHandleUndo] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const showModal = (title, content) => {
    /*
    setMessage(message);
    setContent(content);
    setHandleUndo(() => onUndo);
    */
    setModalContent(content);
    setModalTitle(title);
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
    <ModalContext.Provider
      value={{ showModal, setModalContent, setModalTitle }}
    >
      {children}
      <Modal
        open={open}
        onClose={handleClose}
        title={modalTitle}
        children={modalContent}
      />
    </ModalContext.Provider>
  );
}
