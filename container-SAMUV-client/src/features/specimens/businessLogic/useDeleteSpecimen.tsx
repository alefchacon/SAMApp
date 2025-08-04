import React, { useState } from "react";
import Specimen from "../domain/model/Specimen";
import DialogCustom, {
  IDialogCustomProps,
} from "@/components/ui/DialogControlled";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSpecimens } from "./useSpecimens";

export default function useDeleteSpecimen() {
  const { deleteSpecimen } = useSpecimens();

  const [specimenToDelete, setSpecimenToDelete] = useState<Specimen | null>(
    null
  );

  const handleSubmit = async () => {
    if (!specimenToDelete) {
      return;
    }
    const apiResult = await deleteSpecimen(specimenToDelete);
    handleClose();
  };

  const handleClose = () => {
    setSpecimenToDelete(null);
  };

  const dialogProps: IDialogCustomProps = {
    title: "Eliminar espécimen",
    description: (
      <>
        ¿Desea eliminar el espécimen con ID {specimenToDelete?.id}?{" "}
        <b>Esta acción no puede deshacerse</b>.
      </>
    ),
    open: Boolean(specimenToDelete),
    submitButton: (
      <Button onClick={handleSubmit} variant={"destructive"}>
        <Trash /> Eliminar espécimen
      </Button>
    ),
    onClose: handleClose,
  };

  const dialogDeleteSpecimen = <DialogCustom {...dialogProps}></DialogCustom>;

  return { dialogDeleteSpecimen, setSpecimenToDelete };
}
