import Button from "./Button";

export default function HeaderPage({
  children,
  title = "Título",
  subtitle = null,
  centerText = false,
}) {
  return (
    <div
      className={`page-padding p-1rem bg-white divider ${
        centerText && "justify-content-center"
      }`}
    >
      <div
        className={`flex-row ${centerText && "justify-content-center"}`}
        style={{ padding: "2rem 0 0 0" }}
      >
        <h1>{title}</h1>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
