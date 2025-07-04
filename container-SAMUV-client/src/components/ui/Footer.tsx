import React from "react";

export default function Footer() {
  return (
    <footer className="color-white bottom-0 position-relative">
      <div className="p-05rem">
        © {new Date().getFullYear()} Universidad Veracruzana. Todos los derechos
        reservados.
      </div>
    </footer>
  );
}
