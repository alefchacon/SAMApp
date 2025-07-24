import React from "react";
import Highlight from "../../../components/ui/Highlight";
import { IContributorSpecimen } from "../domain/Contributor";

interface ICardContributorProps {
  contributor: IContributorSpecimen;
  index: number;
  filterText: string;
}
export default function CardContributor({
  contributor = {
    code: "code",
    name: "name",
  },
  index = 0,
  filterText,
}: ICardContributorProps) {
  return (
    <div
      id={`contributor-${index}`}
      className="contributor flex-row align-items-center gap-1rem  "
    >
      <p id={`contributor-code-${index}`} className="contributor-code">
        <b>
          <Highlight
            text={contributor.code ?? ""}
            highlight={filterText}
          ></Highlight>
        </b>
      </p>
      {Boolean(contributor.name) && (
        <p id={`contributor-name-${index}`} className="contributor-name">
          <Highlight
            text={contributor.name ?? ""}
            highlight={filterText}
          ></Highlight>
        </p>
      )}
    </div>
  );
}
