// LIBRARIES
import { useState, useEffect } from "react";
import Specie from "./Specie";

import { useSearchParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import Modal from "../../../components/ui/modal/Modal";
import ModalActions from "../../../components/ui/modal/ModalActions";
import AddIcon from "../../../components/icons/AddIcon";
import HoverableActions from "../../../components/ui/HoverableActions";

import NewSpecie from "../../../app/routes/app/NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";

// API CALLS
import { mockGetSpecies } from "../api/getSpecies";

export default function SpecieList({
  species,
  onSelectionChange,
  onAdd,
  onEdit,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [folded, setFolded] = useState("unfolded");
  const [searchParams, setSearchParams] = useSearchParams();
  const [specieToEdit, setSpecieToEdit] = useState(null);

  const { showModal } = useModal();

  /*
  useEffect(() => {
    if (searchParams.has("name") && species.length > 0) {
      const name = searchParams.get("name").replace("-", " ").toLowerCase();
      const matchingIndex = species.filter(
        (specie) => specie.scientific_name.toLowerCase() === name
      )[0].id;
      setSelectedIndex(matchingIndex);
      selectSpecie(matchingIndex);
    }
  }, [species])*/

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    onSelectionChange(newSelectedIndex);
  };

  return (
    <>
      <div className={`specie-list ${folded}`}>
        <div className="action-bar divider">
          <Button iconType="add" onClick={onAdd}>
            Agregar especie
          </Button>
          <input type="text" placeholder="Buscar especie" />
        </div>
        <ul role="list" className="specie-list-items">
          {species.map((specie, index) => (
            <div
              className={"hoverable"}
              style={{
                alignItems: "center",
                textAlign: "left",
              }}
            >
              <Specie
                key={specie.id}
                specie={specie}
                index={specie.id}
                selectedIndex={selectedIndex}
                onClick={handleSelection}
              />
              <HoverableActions
                secondaryAction={() => onEdit(specie)}
                primaryAction={() => showModal("asdf")}
              ></HoverableActions>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}
