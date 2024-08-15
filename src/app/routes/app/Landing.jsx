import { useState, useEffect } from "react";

import Searchbar from "../../../components/ui/Searchbar";
import { mockGetSpecies } from "../../../features/specie/api/getSpecies";

export default function Landing({ species, children }) {
  console.log(species);
  return (
    <div className="flex-col">
      <div className="landing-search">
        <div className="flex-row">
          asdf
          <h2>
            Sistema de Administración Mastozoológico de la Universidad
            Veracruzana
          </h2>
        </div>
        <h1>Acceso abierto a los datos de los mamíferos veracruzanos</h1>

        {children}
      </div>
      <div>asdf</div>
    </div>
  );
}
