import React from "react";

interface ICardProps {
  children: React.ReactElement;
  className: string;
}
export default function Card({ children, className }: ICardProps) {
  return (
    <div className={`card bg-white rounded-5 border ${className} shadow-all`}>
      {children}
    </div>
  );
}
