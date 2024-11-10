export default function DropdownItem({ primary, secondary, onClick }) {
  return (
    <li className="flex-col p-05rem selectable bottom-0" onClick={onClick}>
      {primary}
    </li>
  );
}
