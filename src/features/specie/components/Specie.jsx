// LIBRARIES
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// CUSTOM COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";
import Modal from "../../../components/ui/modal/Modal";
import ModalActions from "../../../components/ui/modal/ModalActions";

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
  className,
  onDelete,
  onEdit,
}) {
  const delimiter = ">";

  return (
    <div
      className={`specie selectable rounded ${className}  ${
        selectedIndex === index ? "selected" : ""
      }`}
    >
      <li
        className={""}
        onClick={isListItem ? () => onClick(index) : console.log}
      >
        <p className="bold ellipsis">{specie.scientific_name}</p>
        <div className="">
          <p className="caption">
            {specie.orden} {delimiter} {specie.family} {delimiter}{" "}
            {specie.gender} {delimiter} {specie.epithet} {delimiter}{" "}
            {specie.subspecie}
          </p>
        </div>
      </li>
      {!isListItem && (
        <div className="specie-actions">
          <LinkButton
            label="Editar especie"
            variant={"secondary"}
            icon={<EditIcon></EditIcon>}
            href={`/editarEspecie?id=${specie.id}`}
          ></LinkButton>

          <Button
            className={"secondary danger"}
            iconType={"delete"}
            onClick={() => console.log("sadf")}
          >
            Eliminar especie
          </Button>
        </div>
      )}
    </div>
  );
}
