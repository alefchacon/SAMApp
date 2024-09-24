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

export default function ContributorsForm({ onLoad }) {
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
    <div className="input-group">
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
        required
        label={"Colector"}
        contributors={contributors}
      ></ContributorAutocomplete>
      <ContributorAutocomplete
        label={"Preparador"}
        required
        contributors={contributors}
      ></ContributorAutocomplete>
      <Formik
        //validationSchema={specimenSchema}
        onSubmit={handleSubmit}
        initialValues={{
          coordinates_cartesian_plane_x: "1",
          coordinates_cartesian_plane_y: "",
          geographical_coordinates_x: "",
          geographical_coordinates_y: "",
          utm_region: "",
          msnm_google: "",
          municipality: "",
          state: "",
          country: "",
        }}
      >
        {({ errors, touched, isValid, dirty, setFieldValue, values }) => (
          <Form></Form>
        )}
      </Formik>
    </div>
  );
}
