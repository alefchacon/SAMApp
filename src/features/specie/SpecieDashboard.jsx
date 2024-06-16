import { useState } from "react";

import SpecieList from "../specie/components/SpecieList";
import SpecieDetail from "../specie/components/SpecieDetail";

export default function SpecieDashboard() {
  const [selectedSpecie, setSelectedSpecie] = useState();

  return (
    <>
      <SpecieList onSelectionChange={setSelectedSpecie}></SpecieList>
      <SpecieDetail specie={selectedSpecie}></SpecieDetail>
    </>
  );
}
