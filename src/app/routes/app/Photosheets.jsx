import { useState, useEffect, useRef } from "react";
import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import Uploader from "../../../components/ui/Uploader";
import Photosheet from "../../../features/photosheets/components/Photosheet";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import usePhotosheets from "../../../features/photosheets/dataAccess/usePhotosheets";
import { SERVER_URL } from "../../../config/env";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";

import { Formik, Form } from "formik";

import { photosheetSchema } from "../../../features/photosheets/formikSchemas/photosheetSchema";

export default function Photosheets({
  role = ROLE_TYPES.VISITOR,
  isTechnicalPerson = false,
}) {
  const { showModal } = useModal();

  const [photosheets, addPhotosheet, deletePhotosheets] = usePhotosheets();

  function PhotosheetForm() {
    const [description, setDescription] = useState("");
    const [sheet, setSheet] = useState("");
    const formikRef = useRef(null);

    const handleSubmit = async (values, actions) => {
      //console.log(values);
      //console.log(actions);
      await addPhotosheet(values);
      actions.resetForm();
      //console.log(formikRef.current.submitForm());
    };

    return (
      <Formik
        initialValues={{ description: "", sheet: "" }}
        innerRef={formikRef}
        onSubmit={handleSubmit}
        validationSchema={photosheetSchema}
      >
        {({
          values,
          errors,
          touched,
          isValid,
          dirty,
          setFieldValue,
          submitForm,
          handleChange,
          handleBlur,
        }) => (
          <Form className="flex-col gap-1rem" autoComplete="off">
            <TextField
              name="description"
              errorMessage={errors.description}
              label={"Descripción de la ficha"}
              value={values.description}
              hasError={errors.description && touched.description}
              maxLength={100}
              isFormik
            ></TextField>
            <Uploader
              buttonLabel="Agregar ficha fotográfica"
              displayExtension=".PNG, .JPG, .JPEG o .WEBP"
              accept={FILE_TYPES_STRING.IMG}
              onUpload={(file) => {
                setFieldValue("sheet", file);
                submitForm();
              }}
            ></Uploader>
          </Form>
        )}
      </Formik>
    );
  }

  const showAddPhotosheetModal = () => {
    showModal("Agregar ficha fotográfica", <PhotosheetForm />);
  };

  const handleDelete = (id = 0) => {
    deletePhotosheets(id);
  };
  return (
    <div className="flex-col w-100">
      <Header></Header>
      <div className="p-2rem">
        <div className="flex-row gap-1rem align-items-center justify-content-center">
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
          {photosheets.map((photosheet, index) => (
            <Photosheet
              key={index}
              onDelete={handleDelete}
              id={photosheet.id}
              description={photosheet.description}
              role={role}
              sheetURL={
                photosheet.id
                  ? SERVER_URL.concat(photosheet.sheet)
                  : photosheet.sheet
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
