import { Fragment, createContext, useContext, useState } from "react";

import Modal from "../ui/modal/Modal";

export const ModalContext = createContext(null);

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [handleUndo, setHandleUndo] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  const [dismissable, setDismissable] = useState(true);

  const showModal = (title, content, dismissable) => {
    /*
    setMessage(message);
    setContent(content);
    setHandleUndo(() => onUndo);
    */
    setDismissable(dismissable);
    setModalContent(content);
    setModalTitle(title);
    setOpen(true);
  };

  const closeModal = (event, reason) => {
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
      value={{ showModal, closeModal, setModalContent, setModalTitle }}
    >
      {children}
      <Modal
        open={open}
        onClose={closeModal}
        title={modalTitle}
        children={modalContent}
        dismissable={dismissable}
      />
    </ModalContext.Provider>
  );
}
