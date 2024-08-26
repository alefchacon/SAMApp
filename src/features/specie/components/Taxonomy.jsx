import defaultSpecie from "../store/defaultSpecie";

export default function Taxonomy({ specie = defaultSpecie }) {
  const delimiter = (
    <span class="material-symbols-outlined flex-row align-items-center font-size-1rem color-uv-green">
      chevron_right
    </span>
  );

  function Rank({
    rank = "rank",
    rankName = "rankName",
    showDelimiter = true,
  }) {
    return (
      <div className="flex-row gap-05rem">
        <div className="flex-col">
          <p
            className="caption rank"
            style={{ fontSize: "0.9rem", marginBottom: "-8px" }}
          >
            {rankName}
          </p>
          <p className="font-weight-500">{rank}</p>
        </div>
        {showDelimiter && delimiter}
      </div>
    );
  }

  const hasSubspecie = Boolean(specie.subspecie);

  return (
    <div className="taxonomy caption flex-row gap-05rem justify-content-center">
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
