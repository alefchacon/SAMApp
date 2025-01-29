export default function ChipLabel({
  iconType = null,
  children,
  backgroundColor = "var(--selected)",
  color = "var(--uv-green)",
  width = "fit-content",
}) {
  return (
    <span
      className="required font-size-08rem flex-row align-items-center gap-05rem min-w-fit-content h-fit-content"
      style={{
        color: color,
        backgroundColor: backgroundColor,
        padding: "0  0.5rem",
      }}
    >
      {iconType && (
        <span
          className="material-symbols-outlined font-size-1rem"
        >
          {iconType}
        </span>
      )}
      {children}
    </span>
  );
}
