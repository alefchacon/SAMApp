import React from "react";
import { useLocation } from "react-router-dom";

interface IHeaderProps {
  children?: React.ReactNode;
  title?: string | React.ReactNode;
  rightContent?: React.ReactNode;
  subtitle?: string | React.ReactNode;
  padding?: boolean;
  sticky?: boolean;
}
export default function Header(props: IHeaderProps) {
  const {
    children,
    title,
    subtitle = null,
    padding = true,
    sticky = false,
  } = props;

  let baseStyle =
    "header flex flex-col lg:flex-row  gap-5 outline outline-black/8 py-5 bg-white";
  baseStyle = baseStyle.concat(padding ? " page-padding" : " p-5");
  baseStyle = baseStyle.concat(sticky ? " sticky top-0 bg-white" : "");

  return (
    <div className={baseStyle}>
      <div className={`flex flex-col flex-1`}>
        {title && <h1>{title}</h1>}
        {children}
        {subtitle && subtitle}
      </div>
      {props.rightContent}
    </div>
  );
}
