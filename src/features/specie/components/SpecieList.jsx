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
  onAddSpecimen,
  onFold = null,
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
    if (onFold) {
      onFold(!fold);
    }
  };

  const technicalButtons = (
    <div className="flex-row gap-1rem">
      <Button iconType="add" className="primary" onClick={onAdd}>
        Agregar especie
      </Button>
      <Button iconType="upload" onClick={onAdd} className="secondary">
        Importar especies
      </Button>
    </div>
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
          <div className="flex-col divider p-1rem gap-05rem">
            {role === ROLE_TYPES.TECHNICAL_PERSON && technicalButtons}
            <div className="flex-row">
              <TextField
                placeholder={"Buscar especies"}
                onChange={handleFilterChange}
                iconType={"search"}
              ></TextField>
            </div>
            {/*
            <div
              className="flex-row gap-05rem"
              style={{ padding: "0 1rem 1rem 1rem" }}
            >
              <Chip>Familias</Chip>
              <Chip>Géneros</Chip>
              <Chip>Epítetos</Chip>
            </div>
            */}
          </div>

          {species.length > 0 ? (
            <ul role="list" className="specie-list-items">
              {filteredItems.map((specie, index) => (
                <li key={index}>
                  <div
                    className={`selectable hoverable2  p-1rem ${
                      selectedIndex === specie.id ? "selected" : ""
                    }`}
                    style={{
                      borderRadius: "0 100px 100px 0",
                      position: "relative",
                    }}
                    onClick={() => handleSelection(specie.id)}
                  >
                    <HoverableActions
                      action1={() => onEdit(specie)}
                      action2={onAddSpecimen}
                    ></HoverableActions>
                    <p style={{ fontWeight: 500 }}>
                      <i>{specie.epithet}</i>
                    </p>
                    <Taxonomy
                      key={specie.id}
                      specie={specie}
                      center={false}
                      clickableRank={false}
                      showRankName={false}
                      filterText={filterText}
                    ></Taxonomy>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <NoResults
              itemName="especies"
              role={role}
              button={technicalButtons}
            />
          )}
        </div>
      )}
    </ResizableDiv>
  );
}
