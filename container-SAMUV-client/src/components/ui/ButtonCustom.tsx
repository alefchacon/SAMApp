import React, { useState, useEffect } from "react";

interface IButtonProps {
  children?: React.ReactNode | string;
  primary?: boolean;
  type?: "button" | "submit" | "reset";
  isDisabled?: boolean;
  className?: string;
  icon?: string;
  onClick?: (value: any) => void;
  value?: any;
  smallIcon?: boolean;
}
export default function Button({
  children,
  primary = false,
  type = "button",
  isDisabled = false,
  className = "primary",
  icon = "add",
  onClick,
  value = null,
  smallIcon = false,
}: IButtonProps) {
  const handleClick = () => {
    if (value && onClick) {
      return onClick(value);
    } else if (onClick) {
      onClick(null);
    }
  };

  let style =
    "flex gap-2 p-2 w-fit bg-transparent h-fit rounded-sm transition-colors duration-100 cursor-pointer font-medium";

  const primaryStyle = " !text-white !bg-green-600 hover:!bg-green-700";

  const secondaryStyle = " !text-green-600 border hover:!bg-green-100";

  if (primary) {
    style = style.concat(primaryStyle);
  } else {
    style = style.concat(secondaryStyle);
  }

  return (
    <button
      disabled={isDisabled}
      type={type}
      className={style}
      onClick={handleClick}
    >
      <span className={`material-symbols-outlined`}>{icon}</span>
      {children}
    </button>
  );
}
