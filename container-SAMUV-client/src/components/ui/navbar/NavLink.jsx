import { Link } from "react-router-dom";
import InfoItem from "../InfoItem";
export default function NavLink({route, label = "", iconType, selected}) {
  
  return (
    <Link
      to={route}
      className={` nav-link selectable-dark ${
        selected ? "selected" : ""
      }`}
    >
      <InfoItem
        label={label}
        iconType={iconType}
      ></InfoItem>
    </Link>
  );
}
