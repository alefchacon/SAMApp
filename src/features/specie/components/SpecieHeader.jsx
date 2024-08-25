// LIBRARIES

// CUSTOM COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";

// ICONS
import EditIcon from "../../../components/icons/EditIcon";

export default function SpecieHeader({
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
}) {
  const delimiter = (
    <span class="material-symbols-outlined flex-row align-items-center font-size-1rem">
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
            style={{ fontSize: "0.8rem", marginBottom: "-8px" }}
          >
            {rankName}
          </p>
          <p>{rank}</p>
        </div>
        {showDelimiter && delimiter}
      </div>
    );
  }

  const hasSubspecie = Boolean(specie.subspecie);

  const buttons = (
    <div className="flex-row gap-1rem justify-content-center">
      <Button
        label="Editar especie"
        className={"secondary"}
        iconType="edit"
        onClick={() => onEdit(specie)}
      >
        Editar especie
      </Button>

      <Button
        className={"secondary danger"}
        iconType={"delete"}
        onClick={() => console.log("sadf")}
      >
        Eliminar especie
      </Button>
    </div>
  );

  return (
    <div className={`specie-header p-1rem bg-white`}>
      <div
        className={"p-1rem flex-col gap-1rem"}
        onClick={isListItem ? () => onClick(index) : console.log}
      >
        <p style={{ textAlign: "center" }} className="bold ellipsis">
          {specie.scientific_name}
        </p>
        <div className="ellipsis flex-row justify-content-center">
          <p className="caption ellipsis flex-row taxonomy gap-05rem">
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
          </p>
        </div>
        {buttons}
      </div>
    </div>
  );
}
