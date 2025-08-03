import React, { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { ChevronRight, Delete } from "lucide-react";
import { Combobox } from "@/components/ui/Combobox";
import { Specie } from "@/features/specie/domain/Specie";
import Specimen from "../domain/model/Specimen";
import { ArrowLeftRight, Search } from "lucide-react";
import TApiResult from "@/dataAccess/domain/TApiResult";

interface IDialogDeleteSpecimenProps {
  specimen: Specimen | null;
  dialogTrigger?: React.ReactNode;
  onClose: () => void;
  onSubmit: (updatedSpecimen: Specimen) => Promise<TApiResult<Specimen>>;
}
export function DialogDeleteSpecimen({
  specimen,
  dialogTrigger,
  onClose,
  onSubmit,
}: IDialogDeleteSpecimenProps) {
  const handleSubmit = async () => {
    if (!specimen) {
      return;
    }

    const apiResult = await onSubmit(specimen);

    if (apiResult.success) {
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={!!specimen}>
      <form onSubmit={handleSubmit}>
        <DialogTrigger asChild onClick={onClose}>
          {dialogTrigger}
        </DialogTrigger>
        <DialogContent className="flex! flex-column!" showCloseButton={false}>
          <div className="flex flex-col gap-8">
            <DialogHeader>
              <DialogTitle>Cambiar especie</DialogTitle>
              <DialogDescription>
                ¿Desea eliminar el espécimen con ID {specimen?.id}?{" "}
                <b>Esta acción no puede deshacerse.</b>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" onClick={handleClose}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button onClick={handleSubmit} variant={"destructive"}>
                {" "}
                <Delete /> Eliminar espécimen
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
