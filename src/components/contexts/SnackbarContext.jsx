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
  const [iconType, setIconType] = useState(null);
  const [snackbarContent, setSnackbarContent] = useState();
  const [duration, setDuration] = useState(3000);

  const showSnackbar = (
    content = "This is a snackbar.",
    isError = false,
    iconType = "check",
    duration = 3000
  ) => {
    setSnackbarContent(content);
    setIsError(isError);
    setOpen(true);
    setIconType(iconType);
    setDuration(duration);
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

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {children}
      <Snackbar
        isError={isError}
        open={open}
        onClose={handleClose}
        duration={duration}
        iconType={iconType}
      >
        {snackbarContent}
      </Snackbar>
    </SnackbarContext.Provider>
  );
}
