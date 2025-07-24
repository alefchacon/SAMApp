import React from "react";

interface ICardProps {
  children: React.ReactNode;
  className: string;
}
export default function Card({ children, className }: ICardProps) {
  return (
    <div
      className={`card bg-white rounded-5 outline outline-black/10 ${className}`}
    >
      {children}
    </div>
  );
}
