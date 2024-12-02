import { Link, useLocation } from "react-router-dom";

export default function Header({
  children,
  title = "Título",
  subtitle = null,
  centerText = false,
  padding = true,
}) {
  const location = useLocation();

  return (
    <div
      className={`header bg-gradient p-1rem flex-col ${
        padding ? "page-padding" : "p-2rem"
      }`}
    >
      <div className={`flex-col`}>
        <h1>{title}</h1>
        {children}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
