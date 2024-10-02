import Button from "./Button";
import { Link, useLocation } from "react-router-dom";

export default function HeaderPage({
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
      style={{ backgroundColor: "red" }}
    >
      <div className={`flex-col`} style={{ padding: "1rem 0 0 0" }}>
        <h1>{title}</h1>
        {children}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
