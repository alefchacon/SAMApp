export default function ListItem({ children, position = "position-relative", selected = false }) {
  return (
    <li
      className={`list-item flex-col selectable p-1rem hoverable2 rounded-5 ${position} ${selected ? "selected" : ""}`}
    >
      {children}
    </li>
  );
}
