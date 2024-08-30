// LIBRARIES
import { Fragment, createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// CUSTOM COMPONENTS
import Snackbar from "../ui/Snackbar";

export const SnackbarContext = createContext(null);

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [handleUndo, setHandleUndo] = useState(null);
  const [isError, setIsError] = useState(false);
  const [snackbarContent, setSnackbarContent] = useState();

  const showSnackbar = (content = "This is a snackbar.", isError = false) => {
    /*
    setMessage(message);
    setContent(content);
    setHandleUndo(() => onUndo);
    */

    setSnackbarContent(content);
    setIsError(isError);
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
      <Snackbar
        isError={isError}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        {snackbarContent}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
