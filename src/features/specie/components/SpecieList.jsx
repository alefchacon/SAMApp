// LIBRARIES
import { useState } from "react";
import CardSpecie from "./CardSpecie";

import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import NoResults from "../../../components/ui/NoResults";
import TextField from "../../../components/ui/TextField";
import ResizableDiv from "../../../components/ui/ResizableDiv";
import Taxonomy from "./Taxonomy";
import { useNavigate } from "react-router-dom";
import ListItem from "../../../components/ui/ListItem";
import useTextFilter from "../../../hooks/useTextFilter";

// API CALLS
import { ROLE_TYPES } from "../../../stores/roleTypes";
import ROUTES from "../../../stores/routes";

export default function SpecieList({
  role = ROLE_TYPES.VISITOR,
  species,
  onSelectionChange,
  selectedSpecieId = 0,
  onAdd,
  onEdit,
  onAddSpecimen,
  onFold = null,
}) {
  const [fold, setFold] = useState(false);
  const [filteredItems, handleFilterChange, filterText] =
    useTextFilter(species);

  const navigate = useNavigate();

  const handleSelection = (newSelectedIndex) => {
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
      <Button
        iconType="upload"
        onClick={() => navigate(ROUTES.MIGRATE)}
        className="secondary"
      >
        Migrar colección
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
          </div>

          {species?.length > 0 ? (
            <ul role="list" className="specie-list-items unstyled">
              {filteredItems.map((specie, index) => (

                <ListItem selected={specie.id === selectedSpecieId} >

                  {role === ROLE_TYPES.TECHNICAL_PERSON && (
                    <HoverableActions>
                      <Button
                        iconType="edit"
                        className="icon-only color-white"
                        onClick={() => onEdit(specie)}
                      ></Button>
                      <Button
                        iconType="add"
                        className="icon-only color-white"
                        onClick={onAddSpecimen}
                      ></Button>
                    </HoverableActions>
                  )}
                  <CardSpecie
                    specie={specie}
                    filterText={filterText}
                    onClick={() => handleSelection(specie.id)}
                    
                  ></CardSpecie>
                </ListItem>
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
