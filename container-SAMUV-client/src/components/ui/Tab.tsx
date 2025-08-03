import React from "react";

export interface ITabProps {
  children?: React.ReactElement;
  label?: string | React.ReactElement;
  onClick?: () => void;
}
export default function Tab({ children, label, onClick }: ITabProps) {
  return (
    <div className="flex-1" onClick={onClick}>
      {children}
    </div>
  );
}
