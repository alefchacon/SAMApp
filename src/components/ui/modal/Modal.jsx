import { useState, useEffect } from "react";

import Button from "../Button";
import Specie from "../../../features/specie/components/Specie";

export default function Modal({ children, open = true, onClose, title }) {
  return (
    <div className={`modal-background  ${open ? "visible" : "invisible"}`}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>X
        </div>
        <br />
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
