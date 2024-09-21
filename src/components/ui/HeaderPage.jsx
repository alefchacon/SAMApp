import Button from "./Button";

export default function HeaderPage({
  children,
  title = "Título",
  subtitle = null,
  centerText = false,
}) {
  return (
    <div
      className={`page-padding bg-gradient p-1rem ${
        centerText && "justify-content-center"
      }`}
      style={{ backgroundColor: "red" }}
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
