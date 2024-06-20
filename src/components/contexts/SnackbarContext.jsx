import { Fragment, createContext, useContext, useState } from "react";

import Snackbar from "../ui/Snackbar";

const SnackbarContext = createContext(null);

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
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
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} onClose={handleClose} autoHideDuration={6000} />
    </SnackbarContext.Provider>
  );
}
