// LIBRARIES
import { useState, useEffect } from "react";
import Specie from "./Specie";

import { useSearchParams } from "react-router-dom";

import LinkButton from "../../../components/ui/LinkButton";
import Modal from "../../../components/ui/modal/Modal";
import ModalActions from "../../../components/ui/modal/ModalActions";
import AddIcon from "../../../components/icons/AddIcon";

// API CALLS
import { mockGetSpecies } from "../api/getSpecies";

export default function SpecieList({ onSelectionChange }) {
  const [species, setSpecies] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    console.log("asdf");
  };

  useEffect(() => {
    const getData = async () => {
      const species = await mockGetSpecies();
      setSpecies(species);
    };
    getData();
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (searchParams.has("name") && species.length > 0) {
      const name = searchParams.get("name").replace("-", " ").toLowerCase();
      const matchingIndex = species.filter(
        (specie) => specie.scientific_name.toLowerCase() === name
      )[0].id;
      setSelectedIndex(matchingIndex);
      selectSpecie(matchingIndex);
    }
  }, [species]);

  const selectSpecie = (newSelectedIndex) => {
    const selectedSpecie = species.filter(
      (specie) => specie.id === newSelectedIndex
    )[0];
    onSelectionChange(selectedSpecie);
  };

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    selectSpecie(newSelectedIndex);
  };

  return (
    <>
      <Modal open={showModal}>
        <ModalActions onSecondaryClick={toggleModal}></ModalActions>
      </Modal>
      <div className="specie-list">
        <div className="action-bar divider">
          <LinkButton
            variant="primary"
            label="Agregar especie"
            icon={<AddIcon />}
            href="/agregarEspecie"
          ></LinkButton>
          <input type="text" placeholder="Buscar especie" />
        </div>
        <ul role="list" className="specie-list-items">
          {species.map((specie, index) => (
            <Specie
              key={specie.id}
              specie={specie}
              index={specie.id}
              selectedIndex={selectedIndex}
              onClick={handleSelection}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
