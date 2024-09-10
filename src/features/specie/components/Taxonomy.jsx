import defaultSpecie from "../store/defaultSpecie";
import { Link } from "react-router-dom";

export default function Taxonomy({ specie = defaultSpecie, center = true }) {
  const delimiter = (
    <span className="material-symbols-outlined flex-row align-items-center font-size-1rem color-uv-green">
      chevron_right
    </span>
  );

  function Rank({
    rank = "rank",
    rankName = "rankName",
    showDelimiter = true,
    queryType = "orden",
  }) {
    return (
      <div className="flex-row gap-05rem ">
        <div className="flex-col">
          <p
            className="caption rank"
            style={{ fontSize: "0.8rem", marginBottom: "-6px" }}
          >
            {rankName}
          </p>
          <Link className="font-weight-500" style={{ fontSize: "0.9rem" }}>
            {rank}
          </Link>
        </div>
        {showDelimiter && delimiter}
      </div>
    );
  }

  const hasSubspecie = Boolean(specie.subspecie);

  return (
    <div
      className={`taxonomy caption flex-row gap-05rem ${
        center ? "justify-content-center" : "justify-content-start"
      }`}
      style={{ fontSize: "inherit" }}
    >
      <Rank rankName="Orden" rank={specie.orden}></Rank>
      <Rank rankName="Familia" rank={specie.family}></Rank>
      <Rank rankName="Género" rank={specie.gender}></Rank>
      <Rank
        rankName="Epíteto"
        rank={specie.epithet}
        showDelimiter={hasSubspecie}
      ></Rank>
      {hasSubspecie && (
        <>
          <Rank
            rankName="Subespecie"
            rank={specie.subspecie}
            showDelimiter={false}
          ></Rank>
        </>
      )}
    </div>
  );
}
