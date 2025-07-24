import React from "react";
import { useLocation } from "react-router-dom";

interface IHeaderProps {
  children?: React.ReactNode;
  title: string | React.ReactNode;
  rightContent?: React.ReactNode;
  subtitle?: string | React.ReactNode;
  padding?: boolean;
}
export default function Header(props: IHeaderProps) {
  const { children, title = "Título", subtitle = null, padding = true } = props;
  return (
    <div
      className={`header flex flex-col lg:flex-row  gap-5 ${
        padding ? "page-padding" : "p-5"
      }`}
    >
      <div className={`flex flex-col flex-1`}>
        <h1>{title}</h1>
        {children}
      </div>
      {props.rightContent}
      {subtitle && subtitle}
    </div>
  );
}
