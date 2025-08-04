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
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/TextField";
import { Dna, Upload } from "lucide-react";
import Highlight from "@/components/ui/Highlight";
import { Separator } from "@/components/ui/separator";

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
export default function SpecieSidebar(props: ISpecieListProps) {
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
  const [filteredItems, handleFilterChange, filterText] = useTextFilter<Specie>(
    { items: species }
  );

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
      <Button onClick={onAdd}>
        <Dna></Dna> Agregar especie
      </Button>
      <Button
        onClick={() => navigate(`/${FrontendRoutes.MIGRATE}`)}
        variant={"outline"}
      >
        <Upload></Upload> Migrar colección
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
              className="specie-list-items flex flex-col overflow-auto flex-grow-1"
            >
              {filteredItems.map((specie, index) => (
                <>
                  <ListItem
                    onClick={() => handleSelection(specie.id)}
                    key={index}
                    selected={specie.id === selectedSpecieId}
                  >
                    <i className="text-md opacity-80">
                      <Highlight
                        text={specie.epithet}
                        highlight={filterText}
                      ></Highlight>
                    </i>
                    {filterText && (
                      <Taxonomy
                        filterText={filterText}
                        specie={specie}
                        center={false}
                        showRankName={false}
                      ></Taxonomy>
                    )}
                  </ListItem>
                  <Separator></Separator>
                </>
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
