import React from "react";
import Taxonomy from "./Taxonomy";
import Highlight from "@/components/ui/Highlight";
import { defaultSpecie, Specie } from "../domain/Specie";
// import { filter } from "lodash";
import CardBase from "@/components/ui/CardBase";
import { useNavigate } from "react-router-dom";
import FrontendRoutes from "@/routing/FrontendRoutes";

interface ICardSpecieProps {
  specie: Specie;
  showRankName?: boolean;
  clickableRank?: boolean;
  filterText?: string;
  selected?: boolean;
  onClick?: () => void;
  canNavigate: boolean;
}
export default function CardSpecie(props: ICardSpecieProps) {
  const {
    specie = defaultSpecie,
    showRankName = true,
    clickableRank = false,
    filterText = "",
    selected = false,
    onClick,
    canNavigate = false,
  } = props;

  const navigate = useNavigate();

  const handleClick = () => {
    {
      if (canNavigate) {
        navigate(`/${FrontendRoutes.SPECIES}/${specie.id}`, { state: specie });
        return;
      }
      if (onClick) {
        onClick();
      }
    }
  };

  return (
    <div onClick={handleClick} className="w-full flex flex-row">
      <CardBase
        clickable
        title={
          <i>
            <Highlight text={specie.epithet} highlight={filterText}></Highlight>
          </i>
        }
        content={
          <Taxonomy
            specie={specie}
            center={false}
            clickableRank={clickableRank}
            showRankName={showRankName}
            filterText={filterText}
          ></Taxonomy>
        }
      />
    </div>
  );
}
