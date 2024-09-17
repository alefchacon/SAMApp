// LIBRARIES
import { useState, useEffect } from "react";
import Specie from "./Specie";

import { useSearchParams } from "react-router-dom";

import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import NoResults from "../../../components/ui/NoResults";
import NewSpecie from "../../../app/routes/app/NewSpecie";
import TextField from "../../../components/ui/TextField";
import ResizableDiv from "../../../components/ui/ResizableDiv";
import Taxonomy from "./Taxonomy";

import Chip from "../../../components/ui/Chip";

import { useModal } from "../../../components/contexts/ModalContext";
import useTextFilter from "../../../hooks/useTextFilter";

// API CALLS
import { mockGetSpecies } from "../businessLogic/getSpecies";
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
  const [filteredItems, handleFilterChange, filterText] =
    useTextFilter(species);

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
    <ResizableDiv
      className={`specie-list ${
        fold ? "position-absolute" : "position-relative shadow-right"
      }`}
      hide={fold}
    >
      {fold ? (
        <Button
          iconType="dock_to_right"
          className="icon-only secondary m-1rem"
          onClick={toggleFold}
        >
          Ver especies
        </Button>
      ) : (
        <div className={` ${fold && "fold"} flex-col h-100`}>
          <div
            className="p-1rem flex-row justify-content-space-between align-items-center bg-gradient"
            style={{ fontWeight: 600 }}
          >
            <div></div>
            <p>Especies</p>
            <Button
              iconType="close"
              className="icon-only secondary"
              onClick={toggleFold}
            ></Button>
          </div>
          <div className="flex-col shadow-down">
            <div className="flex-row p-1rem gap-1rem">
              <TextField
                placeholder={"Buscar especies"}
                onChange={handleFilterChange}
                iconType={"search"}
              ></TextField>
              {role === ROLE_TYPES.TECHNICAL_PERSON && addSpecieButton}
            </div>
            <div
              className="flex-row gap-05rem"
              style={{ padding: "0 1rem 1rem 1rem" }}
            >
              <Chip>Familias</Chip>
              <Chip>Géneros</Chip>
              <Chip>Epítetos</Chip>
            </div>
          </div>

          {species.length > 0 ? (
            <ul role="list" className="specie-list-items">
              {filteredItems.map((specie, index) => (
                <>
                  <li
                    className={`selectable p-05rem ${
                      selectedIndex === specie.id ? "selected" : ""
                    }`}
                    style={{
                      borderRadius: "0 100px 100px 0",
                    }}
                    onClick={() => handleSelection(specie.id)}
                  >
                    <p>{specie.scientific_name}</p>
                    <Taxonomy
                      key={specie.id}
                      specie={specie}
                      center={false}
                      clickableRank={false}
                      showRankName={false}
                      filterText={filterText}
                    ></Taxonomy>
                  </li>

                  {role === ROLE_TYPES.TECHNICAL_PERSON && (
                    <HoverableActions
                      secondaryAction={() => onEdit(specie)}
                      primaryAction={() => showModal("asdf")}
                    ></HoverableActions>
                  )}
                </>
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
    </ResizableDiv>
  );
}
