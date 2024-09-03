import { useState, useEffect } from "react";
import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import Uploader from "../../../components/ui/Uploader";
import Photosheet from "../../../features/photosheets/components/Photosheet";

import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useStatus } from "../../../components/contexts/StatusContext";

import messages from "../../../validation/messages";

import LOREM_IPSUM from "../../../stores/loremIpsum";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";

export default function Photosheets({
  role = ROLE_TYPES.VISITOR,
  isTechnicalPerson = false,
}) {
  const { showModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { profile } = useStatus();

  function PhotosheetForm() {
    return (
      <div className="flex-col gap-1rem">
        <TextField
          label={"Descripción de la ficha"}
          maxLength={100}
        ></TextField>
        <Uploader
          buttonLabel="Agregar ficha fotográfica"
          displayExtension=""
        ></Uploader>
      </div>
    );
  }

  const showAddPhotosheetModal = () => {
    showModal("Agregar ficha fotográfica", <PhotosheetForm />);
  };
  return (
    <div className="flex-col w-100">
      <Header></Header>
      <div className="page h-100">
        <div className="button-row">
          {" "}
          {role === ROLE_TYPES.TECHNICAL_PERSON && (
            <Button onClick={showAddPhotosheetModal}>
              Agregar ficha fotográfica
            </Button>
          )}
          <TextField
            iconType={"search"}
            placeholder={"Filtrar fichas por descripción"}
          ></TextField>
        </div>
        <br />
        <div className="photosheet-gallery h-100 gap-05rem">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num, index) => (
            <Photosheet
              key={index}
              description={LOREM_IPSUM.FIRST_100}
              role={role}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
