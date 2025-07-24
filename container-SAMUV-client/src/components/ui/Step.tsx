import React from "react";

export interface IStepProps {
  children: React.ReactElement;
  label: string | React.ReactElement;
  id: string;
}
export default function Step({ children, label, id }: IStepProps) {
  return <div>{children}</div>;
}
