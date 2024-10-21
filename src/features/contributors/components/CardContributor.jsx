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
      style={{ maxWidth: "fit-content", padding: "0.1rem 1rem" }}
      id={`contributor-${index}`}
      className="contributor flex-row align-items-center gap-1rem  "
    >
      <p
        id={`contributor-code-${index}`}
        className="contributor-code"
        style={{ letterSpacing: "1px" }}
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
