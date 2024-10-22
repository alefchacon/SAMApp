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
  const delimiter = ">";
  if (filterText) {
    console.log(filterText);
  }

  function Highlight({ text, highlight }) {
    if (!highlight) return <span>{text}</span>;

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span
              key={index}
              style={{
                backgroundColor: "yellow",
                borderRadius: "5px",
                border: "1px solid orange",
              }}
            >
              {part}
            </span>
          ) : (
            part
          )
        )}
      </span>
    );
  }

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
