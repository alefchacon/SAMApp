export default function ListItem({ children, position = "position-relative" }) {
  return (
    <li
      className={`list-item selectable p-05rem hoverable2 rounded-5 ${position}`}
    >
      {children}
    </li>
  );
}
