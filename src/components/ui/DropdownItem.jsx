export default function DropdownItem({ primary, secondary, onClick }) {
  return (
    <div className="flex-col p-1rem rounded selectable" onClick={onClick}>
      {primary}
    </div>
  );
}
