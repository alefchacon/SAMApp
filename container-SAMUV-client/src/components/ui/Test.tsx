import React from "react";

interface ITestProps {
  children: React.ReactNode;
}

export default function Test({ children }: ITestProps) {
  return <button type="button">children</button>;
}
