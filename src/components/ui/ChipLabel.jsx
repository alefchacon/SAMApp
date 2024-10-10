export default function ChipLabel({
  iconType = null,
  children,
  backgroundColor = "var(--selected)",
  color = "var(--uv-green)",
  width = "fit-content",
}) {
  return (
    <span
      className="required flex-row align-items-center gap-05rem"
      style={{
        color: color,
        fontSize: "14px",
        backgroundColor: backgroundColor,

        padding: "0  0.5rem",
        borderRadius: "3px",
        width: width,
        minWidth: "fit-content",
        height: "fit-content",
      }}
    >
      {iconType && (
        <span
          className="material-symbols-outlined"
          style={{ fontSize: "20px" }}
        >
          {iconType}
        </span>
      )}
      {children}
    </span>
  );
}
