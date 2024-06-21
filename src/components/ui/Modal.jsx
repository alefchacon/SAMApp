import { useState } from "react";

import Button from "./Button";
import Specie from "../../features/specie/components/Specie";

export default function Modal({ open = true }) {
  const [isOpen, setIsOpen] = useState(open);
  return (
    <div
      className={`modal-background  ${isOpen ? "visible" : "invisible"}`}
      onClick={() => setIsOpen(false)}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Eliminar especie</h3>X
        </div>
        <div className="modal-body">
          <p>¿Está seguro de eliminar esta especie?</p>
          <Specie></Specie>
        </div>
        <div className="form-actions">
          <Button variant="secondary" label="Cancelar"></Button>
          <Button variant="primary" label="Eliminar especie"></Button>
        </div>
      </div>
    </div>
  );
}
