import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./button";

export interface IDialogCustomProps {
  title: string;
  description: React.ReactNode;
  onClose: () => void;
  open: boolean;
  children?: React.ReactNode;
  submitButton?: React.ReactNode;
}
const DialogControlled = ({
  title,
  description,
  onClose,
  open,
  children,
  submitButton,
}: IDialogCustomProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex! flex-column!" showCloseButton>
        <div className="flex flex-col gap-8 w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogControlled;
