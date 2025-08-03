// LIBRARIES
import React, { useState } from "react";
import CardSpecie from "../CardSpecie";

import HoverableActions from "@/components/ui/HoverableActions";
import NoResults from "@/components/ui/NoResults";
// import TextField from "../../../components/ui/TextField";
import ResizableDiv from "@/components/ui/ResizableDiv";
import Taxonomy from "../Taxonomy";
import { useNavigate } from "react-router-dom";
import ListItem from "@/components/ui/ListItem";
import useTextFilter from "@/hooks/useTextFilter";

// API CALLS
import { ROLE_TYPES, UserRoles } from "../../../../stores/EUserRoles";
import FrontendRoutes from "../../../../routing/FrontendRoutes";
import { Specie } from "../../domain/Specie";
import { Button } from "@/components/ui/button";
import TextField from "@/components/ui/TextField";
import { Dna, Upload } from "lucide-react";

interface ISpecieListProps {
  species: Specie[];
  onSelectionChange: (newSelectedIndex: number) => void;
  selectedSpecieId: number;

  onFold: (fold: boolean) => void;
}
export default function SearchSidebar(props: ISpecieListProps) {
  const {
    species = new Array<Specie>(),
    onSelectionChange,
    selectedSpecieId = 0,

    onFold = null,
  } = props;

  const [fold, setFold] = useState(false);
  const [filteredItems, handleFilterChange, filterText] =
    useTextFilter<Specie>(species);

  const handleSelection = (newSelectedIndex: number) => {
    onSelectionChange(newSelectedIndex);
  };

  const toggleFold = () => {
    setFold(!fold);
    if (onFold) {
      onFold(!fold);
    }
  };

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
          {species?.length > 0 ? (
            <ul
              role="list"
              className="specie-list-items flex flex-col overflow-auto flex-grow-1"
            >
              {filteredItems.map((specie, index) => (
                <ListItem key={index} selected={specie.id === selectedSpecieId}>
                  <CardSpecie
                    specie={specie}
                    filterText={filterText}
                    onClick={() => handleSelection(specie.id)}
                  ></CardSpecie>
                </ListItem>
              ))}
            </ul>
          ) : (
            <NoResults itemName="especies" />
          )}
        </div>
      )}
    </ResizableDiv>
  );
}
