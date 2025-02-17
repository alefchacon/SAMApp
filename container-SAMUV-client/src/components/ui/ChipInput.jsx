import Button from "./Button";

export default function Chip({ children, index = 0, onRemove }) {
  return (
    <div
      className="chip  rounded-5 flex-row justify-content-space-between align-items-center bg-darkgray border "
      style={{
        maxWidth: "fit-content",
        maxHeight: "fit-content",
        overflow: "auto",
        padding: "0 0.5rem",
      }}
    >
      {children}

      {onRemove && (
        <Button
          iconType="cancel"
          onClick={() => onRemove(index)}
          className="icon-only"
        ></Button>
      )}
    </div>
  );
}
