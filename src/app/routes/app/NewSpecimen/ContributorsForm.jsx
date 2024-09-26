// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import proj4 from "proj4";

// CUSTOM COMPONENTS
import TextField from "../../../../components/ui/TextField";
import LoadingTextField from "../../../../components/ui/LoadingTextField";
import Button from "../../../../components/ui/Button";
import SelectList from "../../../../components/ui/SelectList";
import ContributorForm from "./ContributorForm";
import ContributorAutocomplete from "../../../../features/contributors/ContributorAutocomplete";
import moment from "moment";
import { useModal } from "../../../../components/contexts/ModalContext";

//VALIDATION SCHEMAS
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";

import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";

export default function ContributorsForm({
  children,
  initialValues,
  handleChange,
  errors = [],
  values,
  onBlur,
  touched,
  setFieldValue,
  inputWidth = "",
}) {
  const [contributors, getContributors, addContributor] =
    useContributorsAndRoles();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getContributors();
  }, []);

  const handleSubmit = async (values, formActions) => {
    console.log(values);
    console.log(formActions);
  };

  const handleShowAddContributorModal = () => {
    showModal(
      "Agregar colaborador",
      <ContributorForm onSubmit={addContributor} />
    );
  };

  return (
    <Form className="" autoComplete="off">
      <div className="p-2rem flex-row gap-2rem align-items-center">
        <p>
          De clic en los campos de texto para ver o filtrar a los colaboradores
          existentes, o registre uno nuevo.
        </p>
        <Button
          iconType="person_add"
          className="secondary"
          onClick={handleShowAddContributorModal}
        >
          Registrar colaborador
        </Button>
      </div>
      <div className="input-group">
        <h3>Colecta</h3>
        <ContributorAutocomplete
          roleId={1}
          required
          id="colector"
          name="colector"
          onBlur={onBlur}
          setFieldValue={setFieldValue}
          label={"Colector"}
          hasError={Boolean(errors.colector && touched.colector)}
          errorMessage={errors.colector}
          contributors={contributors}
        ></ContributorAutocomplete>
        <TextField
          onBlur={onBlur}
          required
          isFormik
          name="colection_date"
          label={"Fecha de colecta"}
          helperText={
            "La fecha se reflejará con el formato YYYY-MM-DD en la base de datos."
          }
          value={values.colection_date}
          onChange={handleChange}
          hasError={Boolean(errors.colection_date && touched.colection_date)}
          errorMessage={errors.colection_date}
          type="date"
          maxWidth={inputWidth}
          max={moment().format("YYYY-MM-DD")}
        ></TextField>
        <TextField
          onBlur={onBlur}
          isFormik
          label={"Hora de la colecta"}
          helperText={
            "La hora se reflejará con un formato de 24 horas en la base de datos."
          }
          maxWidth={inputWidth}
          type="time"
          name="hour"
          value={values.hour}
          onChange={handleChange}
          hasError={Boolean(errors.hour && touched.hour)}
          errorMessage={errors.hour}
          step={60}
          min="00:00"
          max="23:59"
        ></TextField>
      </div>
      <hr />
      <div className="input-group">
        <h3>Preparación</h3>
        <ContributorAutocomplete
          roleId={2}
          id="preparator"
          name="preparator"
          onBlur={onBlur}
          setFieldValue={setFieldValue}
          hasError={Boolean(errors.preparator && touched.preparator)}
          errorMessage={errors.preparator}
          label={"Preparador"}
          required
          contributors={contributors}
        ></ContributorAutocomplete>

        <TextField
          onBlur={onBlur}
          isFormik
          name="preparation_date"
          label={"Fecha de preparación"}
          helperText={
            "La fecha se reflejará con el formato YYYY-MM-DD en la base de datos."
          }
          value={values.preparation_date}
          onChange={handleChange}
          hasError={Boolean(
            errors.preparation_date && touched.preparation_date
          )}
          errorMessage={errors.preparation_date}
          type="date"
          maxWidth={inputWidth}
          max={moment().format("YYYY-MM-DD")}
        ></TextField>
      </div>
    </Form>
  );
}
