import React, { useRef } from "react";
import TextField from "../../../components/ui/TextField";
import FormInput from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import UploaderImage from "@/components/ui/UploaderImage";
import Photosheet from "@/features/photosheets/components/Photosheet";
import { useModal } from "../../../components/contexts/ModalContext";
import usePhotosheets from "@/features/photosheets/businessLogic/usePhotosheets";
import useTextFilter from "../../../hooks/useTextFilter";
import { Formik, Form, FormikHelpers } from "formik";
import Highlight from "../../../components/ui/Highlight";
import Page from "../../../components/ui/Page";
import { photosheetSchema } from "@/features/photosheets/formikSchemas/photosheetSchema";
import useSession from "@/features/auth/businessLogic/useSession";
import {
  defaultPhotosheet,
  IPhotosheet,
  Photosheet as PhotosheetModel,
} from "@/features/photosheets/domain/Photosheet";
import { Input } from "@/components/ui/input";

export default function Photosheets({ isTechnicalPerson = false }) {
  const { showModal } = useModal();
  const { getProfile } = useSession();
  const profile = getProfile();
  const {
    photosheets,
    addPhotosheet,
    updatePhotosheet,
    confirmDeletePhotosheet,
  } = usePhotosheets();

  const [filteredItems, handleFilterChange, filterText] =
    useTextFilter<PhotosheetModel>({ items: photosheets });

  function PhotosheetForm({ photosheet = defaultPhotosheet, isEdit = false }) {
    const formikRef = useRef(null);

    const handleSubmit = async (
      values: IPhotosheet,
      actions: FormikHelpers<IPhotosheet>
    ) => {
      if (isEdit) {
        // await updatePhotosheet(values);
      } else {
        debugger;
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
            setFieldValue,
            submitForm,
            handleChange,
            handleBlur,
          }) => (
            <Form className="flex flex-col" autoComplete="off">
              <UploaderImage
                imageURL={photosheet.sheet}
                onUpload={(sheet) => setFieldValue("sheet", sheet)}
              ></UploaderImage>
              <FormInput
                name="description"
                label={"Descripción de la ficha"}
                errorMessage={errors.description}
                hasError={Boolean(errors.description && touched.description)}
              >
                <Input
                  id="description"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                  maxLength={100}
                ></Input>
              </FormInput>
              <div className="button-row">
                <Button>
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
    showModal({
      title: "Agregar ficha de fotocolecta",
      content: <PhotosheetForm />,
    });
  };

  const handleDelete = (id: number = 0) => {
    confirmDeletePhotosheet(id);
  };

  const showEditPhotosheetModal = (photosheet: IPhotosheet) => {
    showModal({
      title: "Editar ficha fotográfica",
      content: <PhotosheetForm photosheet={photosheet} isEdit />,
    });
  };

  return (
    <Page title={"Fichas de fotocolecta"}>
      <div className="flex-row gap-1rem align-items-center justify-content-center p-1rem">
        {" "}
        <TextField
          iconType={"search"}
          placeholder={"Filtrar fichas por descripción"}
          onChange={handleFilterChange}
          maxWidth={"50%"}
        ></TextField>
        {profile.isTechnicalPerson() && (
          <Button onClick={showAddPhotosheetModal}>
            Agregar ficha fotográfica
          </Button>
        )}
      </div>
      <div className="h-100">
        <div className="photosheet-gallery flex-row flex-wrap-wrap justify-content-center">
          {filteredItems.map((photosheet, index) => (
            <Photosheet
              photosheet={photosheet}
              key={index}
              onDelete={handleDelete}
              onUpdate={showEditPhotosheetModal}
              isTechnicalPerson={profile.isTechnicalPerson()}
            >
              <Highlight
                text={photosheet.description}
                highlight={filterText}
              ></Highlight>
            </Photosheet>
          ))}
        </div>
      </div>
    </Page>
  );
}
