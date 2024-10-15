import { useState, useEffect } from "react";

import Searchbar from "../../../components/ui/Searchbar";

function SearchBanner({ children }) {
  const imageUrl = `src/assets/images/${Math.floor(Math.random() * 6)}.webp`;

  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundAttachment: "fixed",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="landing-search"
    >
      {children}
    </div>
  );
}

export default function Landing({ species, children }) {
  console.log(species);
  return (
    <div className="landing flex-col w-100 color-white">
      <SearchBanner>
        <div className="flex-row gap-1rem p-1rem">
          <span className="material-symbols-outlined">add</span>
          <h2 className="landing-system-name">
            Sistema de Administración Mastozoológico (SAM)
            <br />
            de la Universidad Veracruzana
          </h2>
        </div>
        <h1 className="p-1rem landing-tag">
          Acceso abierto a los mamíferos veracruzanos
        </h1>

        {children}
      </SearchBanner>
      <div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
        <div>asdf</div>
      </div>
    </div>
  );
}
