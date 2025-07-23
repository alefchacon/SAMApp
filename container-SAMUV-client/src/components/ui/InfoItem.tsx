import React from "react";

interface IInfoItemProps {
  label: string;
  iconType: string;
  fullheight?: boolean;
}
export default function InfoItem({
  label,
  iconType,
  fullheight = false,
}: IInfoItemProps) {
  return (
    <div className="info-item flex flex-row gap-2 align-items-center">
      <span className="material-symbols-outlined">{iconType}</span>{" "}
      {label && (
        <div className={`label ${fullheight ? "" : "ellipsis"}`}>{label}</div>
      )}
    </div>
  );
}
