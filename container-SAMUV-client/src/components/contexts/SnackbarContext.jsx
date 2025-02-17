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
  const [isError, setIsError] = useState(false);
  const [iconType, setIconType] = useState(null);
  const [snackbarContent, setSnackbarContent] = useState();
  const [duration, setDuration] = useState(3000);

  const showSnackbar = (
    content = "This is a snackbar.",
    isError = false,
    iconType = "check_circle",
    duration = 10000
  ) => {
    let parsedContent = content;
    if (typeof content === "object" && content !== null) {
      parsedContent = (
        <div>
          {Object.entries(content).map(([key, value]) => (
            <p>
              <b>{key}:</b> {value}
            </p>
          ))}
        </div>
      );
    }

    setSnackbarContent(parsedContent);
    setIsError(isError);
    setOpen(true);
    setIconType(iconType);
    setDuration(duration);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
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
