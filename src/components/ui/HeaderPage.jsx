import Button from "./Button";

export default function HeaderPage({
  children,
  title = "Título",
  subtitle = null,
}) {
  return (
    <div className="page-padding p-1rem bg-white divider">
      <div className="flex-row" style={{ padding: "2rem 0 0 0" }}>
        <h1>{title}</h1>
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
