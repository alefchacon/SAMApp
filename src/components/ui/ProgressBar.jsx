export default function ProgressBar({ main = false, visible = true }) {
  return (
    <div
      className={`progress-bar ${main && "main"} ${
        visible ? "visible" : "invisible"
      }`}
    >
      <div className="progress-bar-value"></div>
    </div>
  );
}
