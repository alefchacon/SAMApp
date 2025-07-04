import React from "react";

export interface ITabProps {
  children: React.ReactElement;
  label: string | React.ReactElement;
}
export default function Tab({ children, label }: ITabProps) {
  return <div>{children}</div>;
}
