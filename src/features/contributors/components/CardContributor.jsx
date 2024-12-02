import Highlight from "../../../components/ui/Highlight";

export default function CardContributor({
  contributor = {
    code: "code",
    name: "name",
  },
  index = 0,
  filterText,
}) {
  return (
    <div
      id={`contributor-${index}`}
      className="contributor flex-row align-items-center gap-1rem  "
    >
      <p
        id={`contributor-code-${index}`}
        className="contributor-code"
      >
        <b>
          <Highlight text={contributor.code} highlight={filterText}></Highlight>
        </b>
      </p>
      {Boolean(contributor.name) && (
        <p id={`contributor-name-${index}`} className="contributor-name">
          <Highlight text={contributor.name} highlight={filterText}></Highlight>
        </p>
      )}
    </div>
  );
}
