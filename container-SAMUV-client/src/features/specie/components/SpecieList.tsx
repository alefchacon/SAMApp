// LIBRARIES
import React, { useState } from "react";
import CardSpecie from "./CardSpecie";

import HoverableActions from "@/components/ui/HoverableActions";
import NoResults from "@/components/ui/NoResults";
// import TextField from "../../../components/ui/TextField";
import ResizableDiv from "@/components/ui/ResizableDiv";
import Taxonomy from "./Taxonomy";
import { useNavigate } from "react-router-dom";
import ListItem from "@/components/ui/ListItem";
import useTextFilter from "@/hooks/useTextFilter";

// API CALLS
import { ROLE_TYPES, UserRoles } from "../../../stores/EUserRoles";
import FrontendRoutes from "../../../routing/FrontendRoutes";
import { Specie } from "../domain/Specie";
import Button from "@/components/ui/Button";
import TextField from "@/components/ui/TextField";

interface ISpecieListProps {
  role: UserRoles;
  species: Specie[];
  onSelectionChange: (newSelectedIndex: number) => void;
  selectedSpecieId: number;
  onAdd: () => void;
  onEdit: (specie: Specie) => void;
  onAddSpecimen: () => void;
  onFold: (fold: boolean) => void;
}
export default function SpecieList(props: ISpecieListProps) {
  const {
    role = UserRoles.VISITOR,
    species = new Array<Specie>(),
    onSelectionChange,
    selectedSpecieId = 0,
    onAdd,
    onEdit,
    onAddSpecimen,
    onFold = null,
  } = props;

  const [fold, setFold] = useState(false);
  const [filteredItems, handleFilterChange, filterText] =
    useTextFilter<Specie>(species);

  const navigate = useNavigate();

  const handleSelection = (newSelectedIndex: number) => {
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
      <Button onClick={onAdd} primary>
        Agregar especie
      </Button>
      <Button
        onClick={() => navigate(`/${FrontendRoutes.MIGRATE}`)}
        icon="upload"
      >
        Migrar colección
      </Button>
    </div>
  );

  return (
    <ResizableDiv
      className={`specie-list ${
        fold ? "position-absolute" : "position-relative"
      }`}
      hide={fold}
    >
      {fold ? (
        <button className="btn btn-primary" onClick={toggleFold}>
          Ver especies
        </button>
      ) : (
        <div className={` ${fold && "fold"} flex flex-col h-100 w-100`}>
          <Button onClick={toggleFold}>asdf</Button>
          <div className="specie-list p-1rem font-weight-600 flex-row justify-content-space-between align-items-center bg-gradient">
            <div></div>
            <p>Especies</p>
            <button className="btn btn-primary" onClick={toggleFold}></button>
          </div>
          <div className="flex flex-col divider p-1rem gap-05rem">
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
            <ul
              role="list"
              className="specie-list-items flex flex-col overflow-auto h-100 flex-grow-1 unstyled"
            >
              {filteredItems.map((specie, index) => (
                <ListItem key={index} selected={specie.id === selectedSpecieId}>
                  {role === ROLE_TYPES.TECHNICAL_PERSON && (
                    <HoverableActions>
                      <button
                        className="icon-only color-white"
                        onClick={() => onEdit(specie)}
                      ></button>
                      <button
                        className="icon-only color-white"
                        onClick={onAddSpecimen}
                      ></button>
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
