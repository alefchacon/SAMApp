import React, {
  Fragment,
  SetStateAction,
  ReactNode,
  Dispatch,
  createContext,
  useContext,
  useState,
} from "react";

import Modal from "../ui/modal/Modal";
import IOnCloseParams from "./IOnCloseProps";

interface IModalContext {
  showModal: (params: IShowModalParams) => void;
  closeModal: (params: IOnCloseParams) => void;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  setModalTitle: Dispatch<SetStateAction<string | null | undefined>>;
}

export const ModalContext = createContext<IModalContext | null>(null);

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}

interface IModalProviderProps {
  children?: React.ReactNode;
}
export interface IShowModalParams {
  title?: string | null;
  content?: React.ReactNode;
  dismissable?: boolean | null;
  width?: string;
  maxHeight?: string;
}
export function ModalProvider(props: IModalProviderProps) {
  const [open, setOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null | undefined>("");
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const [dismissable, setDismissable] = useState<boolean | null | undefined>(
    true
  );
  const [width, setWidth] = useState<string | number | undefined>();
  const [maxHeight, setMaxHeight] = useState<string | number | undefined>();

  const showModal = (params: IShowModalParams) => {
    setDismissable(dismissable);
    setModalContent(params.content);
    setModalTitle(params.title);
    setOpen(true);
    setWidth(params.width);
    setMaxHeight(params.maxHeight);
  };

  const closeModal = (params: IOnCloseParams) => {
    if (params.reason && params.reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{ showModal, closeModal, setModalContent, setModalTitle }}
    >
      {props.children}
      <Modal
        open={open}
        onClose={closeModal}
        title={modalTitle}
        children={modalContent}
        dismissable={dismissable}
        width={width}
        maxHeight={maxHeight}
      />
    </ModalContext.Provider>
  );
}
