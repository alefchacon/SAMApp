import React from "react";

interface IStaticCellProps {
  children: React.ReactNode;
  onDoubleClick: () => void;
}
export default function StaticCell({
  children,
  onDoubleClick,
}: IStaticCellProps) {
  const isNull = children === "N/A" || !Boolean(children) || children == 0.0;

  return (
    <p
      onDoubleClick={onDoubleClick}
      className="w-100 h-100 align-items-center flex-row p-05rem"
      style={{
        color: isNull ? "lightgrey" : "black",
      }}
    >
      {children}
    </p>
  );
}
