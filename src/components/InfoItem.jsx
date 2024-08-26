export default function InfoItem({ label, iconType, fullheight = false }) {
  return (
    <div
      style={{ height: fullheight && "100%" }}
      className="flex-row gap-05rem"
    >
      <span className="material-symbols-outlined">{iconType}</span>{" "}
      <p className={!fullheight && "ellipsis"}>{label}</p>
    </div>
  );
}
