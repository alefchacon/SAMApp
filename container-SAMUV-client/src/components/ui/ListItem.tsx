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
      className={`list-item flex-col selectable p-1rem hoverable2 rounded-5 ${position} ${
        selected ? "selected" : ""
      }`}
    >
      {children}
    </li>
  );
}
