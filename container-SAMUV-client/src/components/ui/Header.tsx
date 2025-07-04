import React from "react";
import { useLocation } from "react-router-dom";

interface IHeaderProps {
  children: React.ReactNode;
  title: string | React.ReactElement;
  subtitle?: string;
  padding: boolean;
}
export default function Header(props: IHeaderProps) {
  const { children, title = "Título", subtitle = null, padding = true } = props;
  return (
    <div
      className={`header bg-gradient p-1rem flex-col ${
        padding ? "page-padding" : "p-2rem"
      }`}
    >
      <div className={`flex-col`}>
        <h1>{title}</h1>
        {children}
      </div>
      {subtitle && subtitle}
    </div>
  );
}
