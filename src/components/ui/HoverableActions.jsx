import Button from "./Button";

export default function HoverableActions({ children, position = "absolute" }) {
  return (
    <div
      className="show-on-hover bg-black-transparent rounded shadow-down"
      style={{
        position: position,
        right: 20,
      }}
    >
      {children}
    </div>
  );
}
