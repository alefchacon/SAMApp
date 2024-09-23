export default function Badge({ children }) {
  return (
    <span
      className="flex-row justify-content-center align-items-center"
      style={{
        backgroundColor: "var(--error)",
        position: "absolute",
        top: -10,
        right: -10,
        borderRadius: "50%",
        padding: 2,
        color: "white",
        fontWeight: 700,
        fontSize: "0.8rem",
        width: "20px",
        height: "20px",
      }}
    >
      {children}
    </span>
  );
}
