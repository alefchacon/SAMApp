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
  console.log(location.pathname.split("/"));

  return (
    <div
      className={`header bg-gradient p-1rem flex-col ${
        padding ? "page-padding" : "p-2rem"
      }`}
      style={{ backgroundColor: "red" }}
    >
      <div className={`flex-col`} style={{ padding: "1rem 0 0 0" }}>
        <div id="crumbs" className="flex-row">
          {location.pathname.split("/").map(
            (crumb, index) =>
              crumb && (
                <div id={`crumb-${index}`} className="crumb flex-row gap-05rem">
                  <Link
                    className="link"
                    style={{ opacity: 0.8, color: "inherit" }}
                  >
                    {crumb}
                  </Link>
                  /
                </div>
              )
          )}
        </div>
        <h1>{title}</h1>
        {children}
      </div>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
