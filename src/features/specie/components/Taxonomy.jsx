import defaultSpecie from "../store/defaultSpecie";
import { Link } from "react-router-dom";
import Highlight from "../../../components/ui/Highlight";

export default function Taxonomy({
  specie = defaultSpecie,
  center = true,
  showRankName = true,
  clickableRank = true,
  filterText = null,
}) {
  const delimiter = (
    <span
      className="material-symbols-outlined flex-row align-items-center font-size-1rem color-inherit"
    >
      chevron_right
    </span>
  );

  function Rank({
    rank = "rank",
    rankName = "rankName",
    showRankName = true,
    showDelimiter = true,
    queryType = "orden",
    clickableRank = true,
  }) {
    return (
      <div className="flex-row gap-05rem ">
        <div className="flex-col">
          {showRankName && (
            <p
              className="rank font-size-08rem opacity-05"
            >
              {rankName}
            </p>
          )}

          {clickableRank ? (
            <Link className="font-size-09rem color-inherit">
              <Highlight text={rank} highlight={filterText}></Highlight>
            </Link>
          ) : (
            <div className="font-size-09rem">
              <Highlight text={rank} highlight={filterText}></Highlight>
            </div>
          )}
        </div>
        {showDelimiter && delimiter}
      </div>
    );
  }

  const hasSubspecie = Boolean(specie?.subspecie);

  return (
    <div
      className={`taxonomy flex-row gap-05rem font-size-inherit 
        ${center ? "justify-content-center" : "justify-content-start"}`}
    >
      <Rank
        showRankName={showRankName}
        rankName="Orden"
        rank={specie?.orden}
        clickableRank={clickableRank}
      ></Rank>
      <Rank
        clickableRank={clickableRank}
        showRankName={showRankName}
        rankName="Familia"
        rank={specie?.family}
      ></Rank>
      <Rank
        clickableRank={clickableRank}
        showRankName={showRankName}
        rankName="Género"
        rank={specie?.gender}
      ></Rank>
      <Rank
        clickableRank={clickableRank}
        showRankName={showRankName}
        rankName="Especie"
        rank={specie?.specie_specie}
        showDelimiter={hasSubspecie}
      ></Rank>
      {hasSubspecie && (
        <>
          <Rank
            clickableRank={clickableRank}
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
