import { useState, useEffect } from "react";

import Button from "../Button";
import Specie from "../../../features/specie/components/Specie";

export default function Modal({
  children,
  open = true,
  dismissable = true,
  onClose,
  title,
}) {
  return (
    <div className={`modal-background  ${open ? "visible" : "invisible"}`}>
      <div className="modal-content rounded-20 box-shadow">
        <div className="modal-header divider p-1rem flex-row justify-content-space-between">
          <h2>{title}</h2>
          {dismissable && (
            <Button
              iconType="close"
              className="icon-only secondary"
              onClick={onClose}
            ></Button>
          )}
        </div>
        <div className="modal-body p-2rem">{children}</div>
      </div>
    </div>
  );
}
