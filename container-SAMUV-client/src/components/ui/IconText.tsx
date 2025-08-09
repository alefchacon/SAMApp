import React from "react";

interface IIconTextProps {
  text: string | React.ReactNode;
  icon: React.ReactNode;
  fullheight?: boolean;
}
export default function IconText({
  text,
  icon,
  fullheight = false,
}: IIconTextProps) {
  return (
    <div className="info-item flex flex-row gap-2 align-items-center">
      {icon}
      {text && (
        <div className={`label ${fullheight ? "" : "ellipsis"}`}>{text}</div>
      )}
    </div>
  );
}
