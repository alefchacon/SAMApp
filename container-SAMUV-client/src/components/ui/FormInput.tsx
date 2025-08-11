import React from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Check } from "lucide-react";
interface IFormInputProps {
  label?: string;
  name: string;
  hasError?: boolean;
  errorMessage?: string;
  helperText?: string;
  required?: boolean;
  children?: React.ReactNode;
}
export default function FormInput(props: IFormInputProps) {
  const {
    name,
    label = "Label",
    hasError = false,
    errorMessage = "Error message",
    helperText,
    required,
    children,
  } = props;

  return (
    <div className="flex flex-col gap-2 relative pb-5">
      <div className="flex flex-row gap-2">
        <Label htmlFor={name} className="font-semibold">
          {label}
        </Label>
        {required && (
          <span className="flex flex-row gap-1 items-center text-xs bg-green-300 px-2 rounded-sm opacity-80">
            <Check size={"0.8rem"}></Check> Requerido
          </span>
        )}
      </div>
      {helperText && <p className="text-sm color-gray">{helperText}</p>}

      {children}

      {hasError && (
        <>
          <p className="text-sm text-destructive">{errorMessage}</p>
        </>
      )}
    </div>
  );
}
