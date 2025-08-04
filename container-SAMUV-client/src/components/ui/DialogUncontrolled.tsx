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
  description?: React.ReactNode;
  children?: React.ReactNode;
  submitButton?: React.ReactNode;
  closeButton?: React.ReactNode;
  trigger?: React.ReactNode;
}
export default function DialogUncontrolled({
  title,
  description,
  children,
  submitButton,
  closeButton,
  trigger,
}: IDialogCustomProps) {
  return (
    <Dialog>
      <DialogTrigger>{trigger}</DialogTrigger>
      <DialogContent className="flex! flex-column!" showCloseButton={true}>
        <div className="flex flex-col gap-8 w-full">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            {closeButton && <DialogClose asChild>{closeButton}</DialogClose>}
            {submitButton}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
