import { useState } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecieDetail from "../../../features/specie/components/SpecieDetail";

export default function SpecieDashboard({ onSelectionChange }) {
  const [selectedSpecie, setSelectedSpecie] = useState();

  const handleSelectedSpecieChange = async (newSelectedSpecie) => {
    setSelectedSpecie(newSelectedSpecie);
    onSelectionChange(newSelectedSpecie);
  };

  return (
    <>
      <SpecieList onSelectionChange={handleSelectedSpecieChange}></SpecieList>
      <SpecieDetail specie={selectedSpecie}></SpecieDetail>
    </>
  );
}
