export default function Checker({ children, fulfilled = false, hasError = true, id }) {
  return (
    <div className="flex-row gap-1rem">
      <span
        role="img"
        data-testid={id}
        className={`material-symbols-outlined ${
          fulfilled ? "color-uv-green" : "color-lightgray"
        } ${hasError && !fulfilled ? "color-error" : "color-lightgray"}`}
      >
        {fulfilled ? "check_circle" : "circle"}
      </span>
      <p className="helper-text">{children}</p>
    </div>
  );
}
