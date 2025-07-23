import React from "react";
import { Link } from "react-router-dom";
import InfoItem from "../InfoItem";

interface INavLinkProps {
  route: string;
  label?: string;
  iconType: string;
  selected: boolean;
}
export default function NavLink({
  route,
  label = "",
  iconType,
  selected,
}: INavLinkProps) {
  return (
    <Link
      to={route}
      className={`nav-link flex flex-row selectable-dark p-1 align-center rounded-sm ${
        selected ? "selected" : ""
      }`}
    >
      <InfoItem label={label} iconType={iconType}></InfoItem>
    </Link>
  );
}
