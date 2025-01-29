import Taxonomy from "./Taxonomy";
import Highlight from "../../../components/ui/Highlight";
import { filter } from "lodash";
export default function CardSpecie({
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
      
      onClick={onClick}
    >
      <div className="font-weight-500">
        
        <i>
          <Highlight text={specie.epithet} highlight={filterText}></Highlight>
        </i>
      </div>
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
