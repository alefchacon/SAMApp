import React, { useState } from "react";
import { Specie } from "@/features/specie/domain/Specie";
import Specimen from "../domain/model/Specimen";
import TApiResult from "@/dataAccess/domain/TApiResult";
import DialogCustom, {
  IDialogCustomProps,
} from "@/components/ui/DialogControlled";
import { ArrowLeftRight, ChevronRight } from "lucide-react";
import { Combobox } from "@/components/ui/Combobox";
import { Button } from "@/components/ui/button";
import { useSpecimens } from "./useSpecimens";

interface IParams {
  species: Specie[];
}

export default function useSwitchSpecie({ species }: IParams) {
  const { updateSpecimen } = useSpecimens();

  const [specimenToSwitch, setSpecimenToSwitch] = useState<Specimen | null>(
    null
  );
  const [newSpecie, setNewSpecie] = useState<Specie | null>(null);
  const userSelectedANewSpecie = Boolean(newSpecie);
  const oldSpecieElement = (
    <i> {(specimenToSwitch?.specie as Specie)?.epithet}</i>
  );
  const newSpecieElement = <i> {newSpecie?.epithet}</i>;

  const handleSubmit = async () => {
    if (!specimenToSwitch || !newSpecie) {
      return;
    }
    specimenToSwitch!.specie = newSpecie.id;
    const apiResult = await updateSpecimen(specimenToSwitch);
    if (apiResult.success) {
      handleClose();
    }
  };

  const handleClose = () => {
    setNewSpecie(null);
    setSpecimenToSwitch(null);
  };

  const dialogProps: IDialogCustomProps = {
    title: "Cambiar especie",
    description: (
      <>
        El espécimen con ID {specimenToSwitch?.id} pertenece a la especie
        {oldSpecieElement}. Seleccione la nueva especie a la que debe
        pertenecer.
      </>
    ),
    open: Boolean(specimenToSwitch),
    submitButton: (
      <Button onClick={handleSubmit} disabled={!userSelectedANewSpecie}>
        {" "}
        {userSelectedANewSpecie ? (
          <>
            <ArrowLeftRight /> Cambiar especie
          </>
        ) : (
          "Seleccione una especie antes de continuar"
        )}
      </Button>
    ),
    onClose: handleClose,
  };

  const dialogSwitchSpecie = (
    <DialogCustom {...dialogProps}>
      <div className="switch-specie-cols">
        <div className="flex flex-col">
          <label className="text-xs">Especie actual</label>
          {oldSpecieElement}
        </div>
        <ChevronRight></ChevronRight>
        <div>
          <div className="text-xs">Nueva especie</div>
          {newSpecieElement}
          <Combobox options={species} onChange={setNewSpecie}></Combobox>
        </div>
      </div>
    </DialogCustom>
  );

  return { dialogSwitchSpecie, setSpecimenToSwitch };
}
