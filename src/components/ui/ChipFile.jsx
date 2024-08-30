import Button from "./Button";

export default function ChipFile({
  index = 0,
  fileName = "fileName",
  extension = "extension",
  onRemove,
}) {
  return (
    <div
      className="file-chip  rounded flex-row justify-content-space-between align-items-center bg-darkgray border p-05rem"
      style={{ maxWidth: "100%", overflow: "auto" }}
    >
      <div className="ellipsis" style={{ margin: "0 15px" }}>
        {fileName}
        <div className="caption ellipsis">{extension}</div>
      </div>

      <Button
        iconType="delete"
        onClick={() => onRemove(index)}
        className="icon-only"
      ></Button>
    </div>
  );
}
