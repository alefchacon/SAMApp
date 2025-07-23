import React from "react";

interface IListItem {
  children: React.ReactNode;
  position?: string;
  selected: boolean;
}
export default function ListItem(props: IListItem) {
  const { children, position = "position-relative", selected = false } = props;

  return (
    <li
      className={`list-item flex flex-col hover:!bg-green-100 outline hoverable2 outline-black/5 cursor-pointer p-2 rounded-sm ${position} ${
        selected ? "selected" : ""
      }`}
    >
      {children}
    </li>
  );
}
