import React from "react";
import Taxonomy from "./Taxonomy";
import Highlight from "@/components/ui/Highlight";
import { defaultSpecie, Specie } from "../domain/Specie";
// import { filter } from "lodash";

interface ICardSpecieProps {
  specie: Specie;
  showRankName?: boolean;
  clickableRank?: boolean;
  filterText?: string;
  selected?: boolean;
  onClick?: () => void;
}
export default function CardSpecie(props: ICardSpecieProps) {
  const {
    specie = defaultSpecie,
    showRankName = true,
    clickableRank = false,
    filterText = "",
    selected = false,
    onClick,
  } = props;

  return (
    <div onClick={onClick}>
      <p className="font-weight-500 text-lg">
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
