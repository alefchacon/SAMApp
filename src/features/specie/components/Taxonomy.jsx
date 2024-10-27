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
      className="material-symbols-outlined flex-row align-items-center font-size-1rem"
      style={{ color: "inherit" }}
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
              className="rank"
              style={{ fontSize: "0.8rem", marginBottom: "-6px" }}
            >
              {rankName}
            </p>
          )}

          {clickableRank ? (
            <Link style={{ fontSize: "0.9rem", color: "inherit" }}>
              <Highlight text={rank} highlight={filterText}></Highlight>
            </Link>
          ) : (
            <div style={{ fontSize: "0.9rem" }}>
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
      className={`taxonomy flex-row gap-05rem ${
        center ? "justify-content-center" : "justify-content-start"
      }`}
      style={{ fontSize: "inherit" }}
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
