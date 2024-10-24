import Taxonomy from "./Taxonomy";

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
  filterText = null,
  showRankName = true,
  clickableRank = true,
}) {
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
        <Taxonomy
          clickableRank={clickableRank}
          showRankName={showRankName}
          specie={specie}
        ></Taxonomy>
      </li>
    </div>
  );
}
