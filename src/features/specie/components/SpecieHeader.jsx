// LIBRARIES

// CUSTOM COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";

// ICONS
import EditIcon from "../../../components/icons/EditIcon";

export default function SpecieHeader({
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
    <div className={`specie-header p-1rem`}>
      <div
        className={"p-1rem"}
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
      </div>
      {!isListItem && (
        <div className="flex-row p-1rem gap-1rem">
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
