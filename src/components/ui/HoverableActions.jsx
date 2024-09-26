import Button from "./Button";

export default function HoverableActions({ children, action1, action2 }) {
  return (
    <div
      className="show-on-hover bg-black-transparent rounded shadow-down"
      style={{
        position: "absolute",
        right: 20,
      }}
    >
      <Button
        iconType="edit"
        className="icon-only color-white"
        onClick={action1}
      ></Button>
      <Button
        onClick={action2}
        iconType="add"
        className="icon-only color-white"
      ></Button>
    </div>
  );
}
