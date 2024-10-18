import { useState, useEffect } from "react";

import Button from "../Button";
import Specie from "../../../features/specie/components/Specie";

export default function Modal({
  children,
  open = true,
  dismissable = true,
  onClose,
  title,
  width = null,
  maxHeight = null,
}) {
  return (
    <div className={`modal-background  ${open ? "visible" : "invisible"}`}>
      <div
        className="modal-content rounded-20 box-shadow"
        style={{ width: width, maxHeight: maxHeight }}
      >
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
        {open && <div className="modal-body p-1rem">{children}</div>}
      </div>
    </div>
  );
}
