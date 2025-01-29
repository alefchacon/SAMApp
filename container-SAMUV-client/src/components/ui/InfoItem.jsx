export default function InfoItem({ label, iconType, fullheight = false }) {
  return (
    <div
      style={{ height: fullheight && "100%" }}
      className="info-item flex-row gap-1rem "
    >
      <span className="material-symbols-outlined">{iconType}</span>{" "}
      {label &&
        <div className={`label ${fullheight ? "" : "ellipsis"}`}>{label}</div>
      }
    </div>
  );
}
