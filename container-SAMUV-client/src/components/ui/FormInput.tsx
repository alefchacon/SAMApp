import React, { ChangeEvent } from "react";
import { Input } from "./input";
import { Label } from "./label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TriangleAlert } from "lucide-react";
interface IFormInputProps {
  id?: string;
  label?: string;
  name: string;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  type?: "text" | "number" | "date" | "password";
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
  value?: any;
}
export default function FormInput(props: IFormInputProps) {
  const {
    id,
    name,
    label = "Label",
    hasError = false,
    className = "",
    errorMessage = "Error message",
    type = "text",
    onChange,
    onBlur,
    value,
  } = props;

  let style = className;
  if (hasError) {
    style = style?.concat(" pr-8 border-destructive");
  }

  console.error(style);

  return (
    <div className="flex flex-col gap-2 relative pb-5">
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        className={style}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      ></Input>

      {hasError && (
        <>
          <TriangleAlert className="absolute right-3 top-6/16 -translate-y-1/2 h-4 w-4 text-destructive" />
          <p className="text-sm text-destructive">{errorMessage}</p>
        </>
      )}
    </div>
  );
}
