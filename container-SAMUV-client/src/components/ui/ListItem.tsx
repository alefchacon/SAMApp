import React from "react";

interface IListItem {
  children: React.ReactNode;
  position?: string;
  selected?: boolean;
  onClick?: () => void;
}
export default function ListItem(props: IListItem) {
  const {
    children,
    position = "position-relative",
    selected = false,
    onClick,
  } = props;

  return (
    <li
      onClick={onClick}
      className={`list-item flex flex-col hover:!bg-green-100 active:!bg-green-200 hoverable2 outline-black/5 cursor-pointer p-3 ${position} ${
        selected ? "bg-white shadow-md font-medium" : ""
      }`}
    >
      {children}
    </li>
  );
}
