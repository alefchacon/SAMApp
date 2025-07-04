// LIBRARIES
import React, { ReactNode, createContext, useContext, useState } from "react";

// CUSTOM COMPONENTS
import Snackbar from "../ui/Snackbar";
import IOnCloseParams from "./IOnCloseProps";

interface ISnackbarContext {
  showSnackbar: (params: IShowSnackbarParams) => void;
  closeSnackbar: (params: IOnCloseParams) => void;
}

export const SnackbarContext = createContext<ISnackbarContext | null>(null);

export function useSnackbar() {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
}

interface ISnackbarProviderProps {
  children: ReactNode;
}

export interface IShowSnackbarParams {
  content?: ReactNode;
  isError?: boolean;
  iconType?: string;
  duration?: number;
}

export function SnackbarProvider(props: ISnackbarProviderProps) {
  const [open, setOpen] = useState(false);
  const [isError, setIsError] = useState(false);
  const [iconType, setIconType] = useState<string>();
  const [snackbarContent, setSnackbarContent] = useState<ReactNode>();
  const [duration, setDuration] = useState(3000);

  const showSnackbar = (params: IShowSnackbarParams) => {
    let parsedContent = params.content;
    if (typeof params.content === "object" && params.content !== null) {
      parsedContent = (
        <div>
          {Object.entries(params.content).map(([key, value]) => (
            <p>
              <b>{key}:</b> {value as string}
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

  const handleClose = (params: IOnCloseParams) => {
    if (params.reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const closeSnackbar = () => {
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar, closeSnackbar }}>
      {props.children}
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
