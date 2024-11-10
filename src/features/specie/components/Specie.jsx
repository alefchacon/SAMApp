import Taxonomy from "./Taxonomy";
import Highlight from "../../../components/ui/Highlight";
import { filter } from "lodash";
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
  showRankName = false,
  clickableRank = false,
  filterText,
  selected,
  onClick,
}) {
  return (
    <div
      className={`selectable p-1rem  ${selected ? "selected" : ""}`}
      onClick={onClick}
    >
      <p style={{ fontWeight: 500 }}>
        {" "}
        <i>
          <Highlight text={specie.epithet} highlight={filterText}></Highlight>
        </i>
      </p>
      <Taxonomy
        specie={specie}
        center={false}
        clickableRank={clickableRank}
        showRankName={showRankName}
        filterText={filterText}
      ></Taxonomy>
    </div>
  );
}
