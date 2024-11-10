export default function HoverableActions({ children, position = "absolute" }) {
  return (
    <div
      className="show-on-hover bg-black-transparent rounded shadow-down"
      style={{
        position: "absolute",
        right: 20,
        top: 10,
        maxWidth: "100px",
      }}
    >
      {children}
    </div>
  );
}
