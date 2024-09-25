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
    <Form className="input-group" autoComplete="off">
      <div className="flex-row gap-2rem align-items-center">
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
    </Form>
  );
}
