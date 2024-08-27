import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecieDetail from "../../../features/specie/components/SpecieDetail";
import { mockGetSpecies } from "../../../features/specie/api/getSpecies";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";
import Uploader from "../../../components/ui/Uploader";
import Header from "../../../components/ui/Header";

import { FILE_TYPES_STRING } from "../../../stores/fileTypes";

import NewSpecie from "./NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";

export default function SpecieDashboard({ onSelectionChange }) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [species, setSpecies] = useState([]);
  const selectedSpecie = species.find((specie) => specie.id === selectedIndex);

  const { showModal } = useModal();

  const handleAddSpecie = (newSpecie) => {
    // fkin api call goes here!! :D
    setSpecies((prev) => [newSpecie, ...prev]);
    newSpecie.id = species.length + 1;
  };

  const handleUpdateSpecie = (updatedSpecie) => {
    const updatedItems = species.map((specie) =>
      specie.id === updatedSpecie.id ? updatedSpecie : specie
    );
    setSpecies(updatedItems);
  };

  const handleMultiAddSpecie = (species = []) => {
    for (let i = 0; i < species.length; i++) {
      species[i].scientific_name = `${species[i].gender} ${species[i].epithet}`;
      handleAddSpecie(species[i]);
    }
  };

  function MultiAddSpecie() {
    return (
      <Tabs>
        <div label="Una especie">
          <NewSpecie onSubmit={handleAddSpecie} />
        </div>
        <div
          label="Múltiples"
          className="flex-row justify-content-center align-items-center"
        >
          <br />
          <Uploader
            accept={FILE_TYPES_STRING.CSV}
            onParse={(species) => handleMultiAddSpecie(species)}
          ></Uploader>
          <div className="button-row">
            <Button>Agregar especies</Button>
          </div>
        </div>
      </Tabs>
    );
  }

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <MultiAddSpecie />);

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
        <Header
          header={selectedSpecie?.scientific_name ?? "asdf"}
          isListItem={false}
          specie={selectedSpecie}
          onEdit={showSpecieEditModal}
        >
          <Taxonomy specie={selectedSpecie}></Taxonomy>
          <div className="flex-row gap-1rem justify-content-center">
            <Button
              className={"secondary"}
              iconType="edit"
              onClick={() => showSpecieEditModal(selectedSpecie)}
            >
              Editar especie
            </Button>

            <Button
              className={"secondary danger"}
              iconType={"delete"}
              onClick={() => console.log("sadf")}
            >
              Eliminar especie
            </Button>
          </div>
        </Header>
      </SpecieDetail>
    </>
  );
}
