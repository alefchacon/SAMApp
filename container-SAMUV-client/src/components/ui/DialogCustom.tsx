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
export default function DialogCustom({
  title,
  description,
  onClose,
  open,
  children,
  submitButton,
}: IDialogCustomProps) {
  return (
    <Dialog open={open}>
      <DialogContent className="flex! flex-column!" showCloseButton={false}>
        <div className="flex flex-col gap-8">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" onClick={onClose}>
                Cancelar
              </Button>
            </DialogClose>
            {submitButton}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
