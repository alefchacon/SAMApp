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
  const [fold, setFold] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [specieToEdit, setSpecieToEdit] = useState(null);

  const { showModal } = useModal();

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    onSelectionChange(newSelectedIndex);
  };

  const toggleFold = () => {
    setFold(!fold);
  };

  function Sidebar() {
    return (
      <>
        <div className={` ${fold && "fold"}`}>
          <div className="action-bar divider">
            <Button iconType="add" onClick={onAdd}>
              Agregar especie
            </Button>
            <Button
              iconType="dock_to_right"
              className="icon-only secondary"
              onClick={toggleFold}
            ></Button>
          </div>
          <ul role="list" className="specie-list-items">
            {species.map((specie, index) => (
              <div
                key={index}
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

  return (
    <div className="specie-list" style={{ position: fold && "absolute" }}>
      {fold ? (
        <Button
          iconType="dock_to_right"
          className="icon-only secondary m-1rem"
          onClick={toggleFold}
        ></Button>
      ) : (
        <Sidebar />
      )}
    </div>
  );
}
