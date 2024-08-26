import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecieDetail from "../../../features/specie/components/SpecieDetail";
import { mockGetSpecies } from "../../../features/specie/api/getSpecies";

import SpecieHeader from "../../../features/specie/components/SpecieHeader";

import NewSpecie from "./NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";

export default function SpecieDashboard({ onSelectionChange }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [species, setSpecies] = useState([]);
  const selectedSpecie = species.find((specie) => specie.id === selectedIndex);

  const { showModal } = useModal();

  const handleAddSpecie = (newSpecie) => {
    setSpecies((prev) => [newSpecie, ...prev]);
    newSpecie.id = species.length + 1;
  };

  const handleUpdateSpecie = (updatedSpecie) => {
    const updatedItems = species.map((specie) =>
      specie.id === updatedSpecie.id ? updatedSpecie : specie
    );
    setSpecies(updatedItems);
  };

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <NewSpecie onSubmit={handleAddSpecie} />);

  const showSpecieEditModal = (specie) =>
    showModal(
      "Editar especie",
      <NewSpecie specie={specie} onSubmit={handleUpdateSpecie} />
    );

  useEffect(() => {
    async function fetchSpecies() {
      const species = await mockGetSpecies();
      setSpecies(species);
    }
    fetchSpecies();
  }, []);

  const handleSelectedSpecieChange = async (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
  };

  return (
    <>
      <SpecieList
        species={species}
        onSelectionChange={handleSelectedSpecieChange}
        onAdd={showSpecieAddModal}
        onEdit={showSpecieEditModal}
      ></SpecieList>
      <SpecieDetail specie={selectedSpecie}>
        <SpecieHeader
          isListItem={false}
          specie={selectedSpecie}
          onEdit={showSpecieEditModal}
        ></SpecieHeader>
      </SpecieDetail>
    </>
  );
}
