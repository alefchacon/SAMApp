// LIBRARIES
import { useState, useEffect } from "react";
import Specie from "./Specie";

import { useSearchParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import NoResults from "../../../components/ui/NoResults";
import NewSpecie from "../../../app/routes/app/NewSpecie";
import TextField from "../../../components/ui/TextField";

import { useModal } from "../../../components/contexts/ModalContext";
import useTextFilter from "../../../hooks/useTextFilter";

// API CALLS
import { mockGetSpecies } from "../dataAccess/getSpecies";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function SpecieList({
  role = ROLE_TYPES.VISITOR,
  species,
  onSelectionChange,
  onAdd,
  onEdit,
}) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fold, setFold] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [specieToEdit, setSpecieToEdit] = useState(null);
  const [filteredItems, handleFilterChange] = useTextFilter(species);

  const { showModal } = useModal();

  const handleSelection = (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
    onSelectionChange(newSelectedIndex);
  };

  const toggleFold = () => {
    setFold(!fold);
  };

  const addSpecieButton = (
    <Button iconType="add" onClick={onAdd}>
      Agregar especie
    </Button>
  );

  return (
    <div className="specie-list" style={{ position: fold && "absolute" }}>
      {fold ? (
        <Button
          iconType="dock_to_right"
          className="icon-only secondary m-1rem"
          onClick={toggleFold}
        ></Button>
      ) : (
        <div className={` ${fold && "fold"} h-100`}>
          <div className="flex-col divider p-1rem gap-1rem">
            <div className="flex-row justify-content-space-between">
              {role === ROLE_TYPES.TECHNICAL_PERSON && addSpecieButton}
              <Button
                iconType="dock_to_right"
                className="icon-only secondary"
                onClick={toggleFold}
              ></Button>
            </div>
            <TextField
              placeholder={"Buscar especies"}
              onChange={handleFilterChange}
              iconType={"search"}
            ></TextField>
          </div>

          {species.length > 0 ? (
            <ul role="list" className="specie-list-items">
              {filteredItems.map((specie, index) => (
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
                  {role === ROLE_TYPES.TECHNICAL_PERSON && (
                    <HoverableActions
                      secondaryAction={() => onEdit(specie)}
                      primaryAction={() => showModal("asdf")}
                    ></HoverableActions>
                  )}
                </div>
              ))}
            </ul>
          ) : (
            <NoResults
              itemName="especies"
              role={role}
              button={addSpecieButton}
            />
          )}
        </div>
      )}
    </div>
  );
}
