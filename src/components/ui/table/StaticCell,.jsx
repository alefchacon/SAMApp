export default function StaticCell({ children, onDoubleClick }) {
  const isNull = children === "N/A" || children === 0;

  return (
    <p
      onDoubleClick={onDoubleClick}
      className="w-100 h-100"
      style={{
        color: isNull ? "lightgrey" : "black",
        padding: "0.5rem",
        display: "flex",
        alignItems: "center",
      }}
    >
      {children}
    </p>
  );
}
