import { useState } from "react";

import SpecieList from "../specie/components/SpecieList";
import SpecieDetail from "../specie/components/SpecieDetail";

export default function SpecieDashboard({ onSelectionChange }) {
  const [selectedSpecie, setSelectedSpecie] = useState();

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    setSelectedSpecie(newSelectedSpecie);
    onSelectionChange(newSelectedSpecie);
  };

  return (
    <>
      <SpecieDetail specie={selectedSpecie}></SpecieDetail>
    </>
  );
}
