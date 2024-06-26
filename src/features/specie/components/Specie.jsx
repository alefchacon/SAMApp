// LIBRARIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";

// ICONS
import EditIcon from "../../../components/icons/EditIcon";
import DeleteIcon from "../../../components/icons/DeleteIcon";

export default function Specie({
  specie = {
    id: 0,
    scientific_name: "Nombre de la especie",
    orden: "Orden",
    family: "Familia",
    gender: "Género",
    epithet: "építeto",
    subspecie: "subespecie",
  },
  selectedIndex = 0,
  index = -1,
  isListItem = true,
  onClick,
}) {
  const delimiter = ">";

  return (
    <>
      <li
        className={`specie ${isListItem ? "selectable" : "specie-header"} ${
          selectedIndex === index ? "selected" : ""
        }`}
        onClick={isListItem ? () => onClick(index) : console.log}
      >
        <p className="bold ellipsis">{specie.scientific_name}</p>
        <div className="ellipsis">
          <p className="caption ellipsis">
            {specie.orden} {delimiter} {specie.family} {delimiter}{" "}
            {specie.gender} {delimiter} {specie.epithet} {delimiter}{" "}
            {specie.subspecie}
          </p>
        </div>
        {!isListItem && (
          <div className="specie-actions">
            <LinkButton
              label="Editar especie"
              variant={"secondary"}
              icon={<EditIcon></EditIcon>}
              href={`/editarEspecie?id=${specie.id}`}
            ></LinkButton>

            <Button
              label="Eliminar especie"
              variant={"secondary danger"}
              icon={<DeleteIcon />}
            ></Button>
          </div>
        )}
      </li>
    </>
  );
}
