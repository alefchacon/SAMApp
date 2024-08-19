import Button from "./Button";

export default function HoverableActions({ primaryAction, secondaryAction }) {
  return (
    <div className="hoverable-actions ">
      <Button
        className="secondary"
        iconType="edit"
        onClick={secondaryAction}
      ></Button>

      <Button
        onClick={primaryAction}
        className="secondary danger"
        iconType="delete"
      ></Button>
    </div>
  );
}
