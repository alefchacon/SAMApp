import { useState, useEffect, useRef } from "react";
import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import HeaderPage from "../../../components/ui/HeaderPage";
import Uploader from "../../../components/ui/Uploader";
import UploaderImage from "../../../components/ui/UploaderImage";
import Photosheet from "../../../features/photosheets/components/Photosheet";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import usePhotosheets from "../../../features/photosheets/businessLogic/usePhotosheets";
import { SERVER_URL } from "../../../config/env";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";
import useTextFilter from "../../../hooks/useTextFilter";
import { Formik, Form } from "formik";

import Footer from "../../../components/ui/Footer";

import { photosheetSchema } from "../../../features/photosheets/formikSchemas/photosheetSchema";

export default function Photosheets({ isTechnicalPerson = false }) {
  const { showModal } = useModal();

  const [
    photosheets,
    addPhotosheet,
    updatePhotosheet,
    confirmDeletePhotosheet,
  ] = usePhotosheets();

  const [filteredItems, handleFilterChange] = useTextFilter(photosheets);

  function PhotosheetForm({
    photosheet = {
      id: "",
      description: "",
      sheet: "",
    },
    add = true,
  }) {
    const formikRef = useRef(null);

    const handleSubmit = async (values, actions) => {
      if (add) {
        await addPhotosheet(values);
      } else {
        await updatePhotosheet(values);
      }
      actions.resetForm();
    };

    return (
      <>
        <Formik
          initialValues={photosheet}
          innerRef={formikRef}
          onSubmit={handleSubmit}
          validationSchema={photosheetSchema}
          enableReinitialize
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
            <Form className="flex-col" autoComplete="off">
              <UploaderImage
                imageURL={photosheet.sheet}
                onUpload={(sheet) => setFieldValue("sheet", sheet)}
              ></UploaderImage>
              <TextField
                label={"Descripción de la ficha"}
                id="description"
                name="description"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                errorMessage={errors.description}
                hasError={errors.description && touched.description}
                maxLength={100}
                isFormik
              ></TextField>
              <div className="button-row">
                <Button
                  onClick={(sheet) => {
                    submitForm();
                  }}
                >
                  Agregar ficha fotográfica
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  const showAddPhotosheetModal = () => {
    showModal("Agregar ficha fotográfica", <PhotosheetForm />);
  };

  const handleDelete = (id = 0) => {
    confirmDeletePhotosheet(id);
  };

  const showEditPhotosheetModal = (photosheet) => {
    showModal(
      "Editar ficha fotográfica",
      <PhotosheetForm photosheet={photosheet} add={false} />
    );
  };

  return (
    <div className="flex-col w-100">
      <div className="flex-row gap-1rem align-items-center justify-content-center p-2rem">
        {" "}
        <TextField
          iconType={"search"}
          placeholder={"Filtrar fichas por descripción"}
          onChange={handleFilterChange}
          maxWidth={"50%"}
        ></TextField>
        {isTechnicalPerson && (
          <Button onClick={showAddPhotosheetModal}>
            Agregar ficha fotográfica
          </Button>
        )}
      </div>
      <div
        className="photosheet-gallery h-100 p-2rem"
        style={{ gap: "0.2rem" }}
      >
        {filteredItems.map((photosheet, index) => (
          <Photosheet
            photosheet={photosheet}
            key={index}
            onDelete={handleDelete}
            onUpdate={showEditPhotosheetModal}
            role={isTechnicalPerson}
          />
        ))}
      </div>
      <Footer></Footer>
    </div>
  );
}
