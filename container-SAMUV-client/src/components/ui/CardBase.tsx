import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";

interface ICardBaseProps {
  title: string | React.ReactNode;
  description?: string;
  action?: React.ReactNode;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  clickable?: boolean;
  onClick?: () => void;
}

export default function CardBase({
  title,
  description,
  action,
  content,
  footer,
  clickable,
  onClick,
}: ICardBaseProps) {
  const clickableStyle =
    "hover:bg-gray-100 active:bg-gray-200 transition-colors duration-100 cursor-pointer";

  return (
    <Card className={`w-full ${clickable && clickableStyle}`} onClick={onClick}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {content && <CardContent className="flex-1">{content}</CardContent>}
      {footer && <CardFooter className="flex-col gap-2">{footer}</CardFooter>}
    </Card>
  );
}
