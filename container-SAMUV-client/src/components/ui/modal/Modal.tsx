import React, { ReactNode } from "react";
import IOnCloseParams from "@/components/contexts/IOnCloseProps";
interface IModalProps {
  children?: ReactNode;
  open?: boolean;
  dismissable?: boolean | undefined | null;
  onClose?: (params: IOnCloseParams) => void;
  title?: ReactNode;
  width?: string | number;
  maxHeight?: string | number;
}
export default function Modal(props: IModalProps) {
  return (
    <div
      className={`modal-background  ${props.open ? "visible" : "invisible"}`}
    >
      <div
        className="modal-content rounded-5 shadow-all"
        style={{ width: props.width, maxHeight: props.maxHeight }}
      >
        <div className="modal-header p-1rem flex-row justify-content-space-between">
          <h2>{props.title}</h2>
          {props.dismissable && (
            <button type="button" className="btn btn-primary"></button>
          )}
        </div>
        {props.open && <div className="modal-body">{props.children}</div>}
      </div>
    </div>
  );
}
