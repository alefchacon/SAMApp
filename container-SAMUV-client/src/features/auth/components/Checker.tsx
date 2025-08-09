import React from "react";
import { CircleCheck, CircleX } from "lucide-react";
interface ICheckerProps {
  children: React.ReactNode;
  fulfilled: boolean;
  hasError: boolean;
  id: string;
}
export default function Checker({
  children,
  fulfilled = false,
  hasError = true,
  id,
}: ICheckerProps) {
  return (
    <div className="flex-row gap-1rem">
      <span
        role="img"
        data-testid={id}
        className={` ${fulfilled ? "color-uv-green" : "color-lightgray"} ${
          hasError && !fulfilled ? "color-error" : "color-lightgray"
        }`}
      >
        {fulfilled ? <CircleCheck /> : <CircleX />}
      </span>
      <p className="helper-text">{children}</p>
    </div>
  );
}
