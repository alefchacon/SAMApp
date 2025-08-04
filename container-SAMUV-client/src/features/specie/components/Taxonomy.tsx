import React from "react";
import { defaultSpecie, Specie } from "../domain/Specie";
import { Link } from "react-router-dom";
import Highlight from "@/components/ui/Highlight";
import { ChevronRight } from "lucide-react";

interface ITaxonomyProps {
  specie?: Specie;
  center?: boolean;
  showRankName?: boolean;
  clickableRank?: boolean;
  filterText?: string;
}
export default function Taxonomy(props: ITaxonomyProps) {
  const {
    specie = defaultSpecie,
    center = true,
    showRankName = true,
    clickableRank = true,
    filterText = null,
  } = props;

  const delimiter = <ChevronRight size={"1rem"} />;

  function Rank({
    rank = "rank",
    rankName = "rankName",
    showRankName = true,
    showDelimiter = true,
    queryType = "orden",
  }) {
    return (
      <div className="flex flex-row gap-1 items-center">
        <div className="flex-col">
          {showRankName && <p className="rank text-xs">{rankName}</p>}
          <div className="text-sm">
            <Highlight text={rank} highlight={filterText}></Highlight>
          </div>
        </div>
        {showDelimiter && delimiter}
      </div>
    );
  }

  const hasSubspecie = Boolean(specie?.subspecie);

  return (
    <div
      className={`taxonomy flex flex-row flex-wrap-wrap gap-1 font-size-inherit items-center 
        ${center ? "justify-center" : "justify-start"}`}
    >
      <Rank
        showRankName={showRankName}
        rankName="Orden"
        rank={specie?.orden}
      ></Rank>
      <Rank
        showRankName={showRankName}
        rankName="Familia"
        rank={specie?.family}
      ></Rank>
      <Rank
        showRankName={showRankName}
        rankName="Género"
        rank={specie?.gender}
      ></Rank>
      <Rank
        showRankName={showRankName}
        rankName="Especie"
        rank={specie?.specie_specie}
        showDelimiter={hasSubspecie}
      ></Rank>
      {hasSubspecie && (
        <>
          <Rank
            showRankName={showRankName}
            rankName="Subespecie"
            rank={specie.subspecie}
            showDelimiter={false}
          ></Rank>
        </>
      )}
    </div>
  );
}
