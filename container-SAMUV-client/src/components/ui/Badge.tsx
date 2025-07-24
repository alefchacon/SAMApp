import React from "react";

interface IBadgeProps {
  children: React.ReactElement | string;
}
export default function Badge({ children }: IBadgeProps) {
  return (
    <span className="badge flex-row justify-content-center align-items-center">
      {children}
    </span>
  );
}
