import Button from "./Button";

export default function HeaderPage({
  children,
  title = "Título",
  subtitle = null,
  centerText = false,
  padding = true,
}) {
  return (
    <div
      className={`header bg-gradient p-1rem flex-col ${
        padding ? "page-padding" : "p-2rem"
      }`}
      style={{ backgroundColor: "red" }}
    >
      <div className={`flex-col`} style={{ padding: "2rem 0 0 0" }}>
        <h1>{title}</h1>
        {children}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
