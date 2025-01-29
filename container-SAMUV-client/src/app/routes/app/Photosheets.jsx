import {useRef } from "react";
import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import UploaderImage from "../../../components/ui/UploaderImage";
import Photosheet from "../../../features/photosheets/components/Photosheet";
import { useModal } from "../../../components/contexts/ModalContext";
import usePhotosheets from "../../../features/photosheets/businessLogic/usePhotosheets";
import useTextFilter from "../../../hooks/useTextFilter";
import { Formik, Form } from "formik";
import Highlight from "../../../components/ui/Highlight";
import Page from "../../../components/ui/Page";
import { photosheetSchema } from "../../../features/photosheets/formikSchemas/photosheetSchema";

export default function Photosheets({ isTechnicalPerson = false }) {
  const { showModal } = useModal();

  const [
    photosheets,
    addPhotosheet,
    updatePhotosheet,
    confirmDeletePhotosheet,
  ] = usePhotosheets();

  const [filteredItems, handleFilterChange, filterText] = useTextFilter(photosheets);

  function PhotosheetForm({
    photosheet = {
      id: "",
      description: "",
      sheet: "",
    },
    isEdit = false,
  }) {
    const formikRef = useRef(null);

    const handleSubmit = async (values, actions) => {
      if (isEdit) {
        await updatePhotosheet(values);
      } else {
        await addPhotosheet(values);
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
            <Form className="flex-col input-group" autoComplete="off">
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
                  {isEdit ? "Editar" : "Agregar"} ficha de fotocolecta
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </>
    );
  }

  const showAddPhotosheetModal = () => {
    showModal("Agregar ficha de fotocolecta", <PhotosheetForm />);
  };

  const handleDelete = (id = 0) => {
    confirmDeletePhotosheet(id);
  };

  const showEditPhotosheetModal = (photosheet) => {
    showModal(
      "Editar ficha fotográfica",
      <PhotosheetForm photosheet={photosheet} isEdit />
    );
  };

  return (
    <Page title={"Fichas de fotocolecta"} >
        <div className="flex-row gap-1rem align-items-center justify-content-center p-1rem">
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
      <div className="h-100">
        <div
          className="photosheet-gallery flex-row flex-wrap-wrap justify-content-center"
        >
          
          {filteredItems.map((photosheet, index) => (
            <Photosheet
              photosheet={photosheet}
              key={index}
              onDelete={handleDelete}
              onUpdate={showEditPhotosheetModal}
              isTechnicalPerson={isTechnicalPerson}
            ><Highlight text={photosheet.description} highlight={filterText}></Highlight></Photosheet>
          ))}
        </div>
      </div>
    </Page>
  );
}
