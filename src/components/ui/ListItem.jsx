export default function ListItem({ children }) {
  return (
    <li
      className="selectable p-05rem hoverable2 rounded-5"
      style={{ position: "relative" }}
    >
      {children}
    </li>
  );
}
