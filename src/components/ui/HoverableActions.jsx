import Button from "./Button";

export default function HoverableActions({ primaryAction, secondaryAction }) {
  return (
    <div className="hoverable-actions ">
      <Button
        className="secondary only-icon"
        iconType="edit"
        onClick={secondaryAction}
      ></Button>

      <Button
        onClick={primaryAction}
        className="only-icon danger"
        iconType="delete"
      ></Button>
    </div>
  );
}
