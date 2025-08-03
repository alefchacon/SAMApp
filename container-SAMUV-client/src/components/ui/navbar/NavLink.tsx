import React from "react";
import { Link } from "react-router-dom";
import InfoItem from "../InfoItem";

interface INavLinkProps {
  route?: string;
  label?: string;
  iconType?: string;
  selected: boolean;
  children?: React.ReactNode;
}
export default function NavLink({
  route,
  label = "",
  iconType,
  selected,
  children,
}: INavLinkProps) {
  return (
    <Link
      to={route || "#"}
      className={`nav-link flex flex-row p-1 selectable-dark align-center rounded-sm ${
        selected ? "selected" : ""
      }`}
    >
      <div className="flex flex-row items-center justify-center gap-3">
        {children}
      </div>
    </Link>
  );
}
