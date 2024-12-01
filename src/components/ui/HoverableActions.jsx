export default function HoverableActions({ children, position = "absolute" }) {
  return (
    <div
      className="show-on-hover justify-content-center align-items-center"
      style={{
        position: "absolute",
        height: "100%",
        right: 0,
        top: 0
      }}
    >
      <div
        className="bg-black-transparent rounded shadow-down flex-row"
      >
        {children}
      </div>
    </div>
  );
}
