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
import RadioList from "../../../../components/ui/RadioList";
//VALIDATION SCHEMAS
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";
import TextArea from "../../../../components/ui/TextArea";
import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";
import CONTRIBUTOR_ROLES from "../../../../stores/contributorRoles";

const CONTRIBUTOR_ROLE_NAMES = Object.freeze({
  1: "colector",
  2: "preparator",
});

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
  const { contributors, getContributors, addContributor } =
    useContributorsAndRoles();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getContributors();
  }, []);

  const handleShowAddContributorModal = () => {
    showModal(
      "Agregar colaborador",
      <ContributorForm onSubmit={addContributor} />
    );
  };

  const contributorHelperText = (
    <div className="flex-row align-items-center gap-05rem">
      Busque y seleccione a uno de los colaboradores existentes, o{" "}
      <Button
        iconType="person_add"
        className="secondary"
        onClick={handleShowAddContributorModal}
      >
        Registre uno nuevo
      </Button>
    </div>
  );

  const handleContributorChange = (newContributor) => {
    const thisContributorRoleName =
      CONTRIBUTOR_ROLE_NAMES[newContributor.contributor_role_id];

    const userSelectedSameContributor =
      values[thisContributorRoleName]?.contributor_id === newContributor.id;

    if (userSelectedSameContributor) {
      return;
    }

    let newContributorSpecimenRelationship = {
      contributor_id: newContributor.id,
      contributor_role_id: newContributor.contributor_role_id,
      name: newContributor.name,
      code: newContributor.code,
    };

    const relationshipId = values[thisContributorRoleName]?.id;
    const userIsEditingExistingSpecimen = Boolean(relationshipId);
    if (userIsEditingExistingSpecimen) {
      newContributorSpecimenRelationship.id = relationshipId;
    }

    setFieldValue(thisContributorRoleName, newContributorSpecimenRelationship);
  };

  return (
    <Form className="" autoComplete="off">
      <div className="input-group">
        <h3>Colecta</h3>
        <div className="flex-row gap-1rem align-items-end">
          <TextField
            onBlur={onBlur}
            required
            isFormik
            name="colection_date"
            label={"Fecha de colecta"}
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
        <RadioList
          required
          onBlur={onBlur}
          label="Naturaleza del ejemplar"
          value={values.nature}
          options={[
            { label: "PC (Piel y craneo)", value: "PC" },
            { label: "E/A (En alcohol)", value: "E/A" },
            { label: "SE (Solo esqueleto)", value: "SE" },
            { label: "EP (Equeleto postcraneal)", value: "EP" },
            { label: "PE (Piel y equeleto)", value: "PE" },
            { label: "CE (Craneo, esqueleto y piel)", value: "CE" },
            { label: "CA (Craneo y piel en alcohol)", value: "CA" },
            { label: "SC (Sólo craneo)", value: "SC" },
            { label: "SP (Sólo piel)", value: "SP" },
          ]}
          name="nature"
          onChange={handleChange}
          errorMessage={errors.nature}
          maxWidth={inputWidth}
          hasError={errors.nature && touched.nature}
        />
        <ContributorAutocomplete
          roleId={CONTRIBUTOR_ROLES.COLECTOR}
          required
          id="colector"
          value={values.colector}
          name="colector"
          onBlur={onBlur}
          onChange={handleContributorChange}
          label={"Colector"}
          helperText={contributorHelperText}
          hasError={Boolean(errors.colector && touched.colector)}
          errorMessage={errors.colector}
          contributors={contributors}
        ></ContributorAutocomplete>

        <TextField
          label={"Número de colecta"}
          id="colection_number"
          name="colection_number"
          onChange={handleChange}
          onBlur={onBlur}
          value={values.colection_number}
          errorMessage={errors.colection_number}
          type="number"
          min={0}
          hasError={Boolean(
            errors.colection_number && touched.colection_number
          )}
          isFormik
          required
        ></TextField>
      </div>
      <hr />
      <div className="input-group">
        <h3>Preparación</h3>
        <ContributorAutocomplete
          roleId={CONTRIBUTOR_ROLES.PREPARATOR}
          value={values.preparator}
          id="preparator"
          name="preparator"
          onBlur={onBlur}
          onChange={handleContributorChange}
          helperText={contributorHelperText}
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
      <hr />
      <div className="input-group">
        <RadioList
          required
          onBlur={onBlur}
          label="Estado"
          value={values.status === "true"}
          options={[
            { label: "Publicado", value: true },
            { label: "Dañado", value: false },
          ]}
          name="status"
          onChange={handleChange}
          errorMessage={errors.status}
          hasError={Boolean(errors.status && touched.status)}
          maxWidth={inputWidth}
        />

        <TextArea
          onBlur={onBlur}
          label={"Observaciones"}
          maxLength={200}
          isFormik
          name="comment"
          value={values.comment}
          onChange={handleChange}
          hasError={Boolean(errors.comment && touched.comment)}
          errorMessage={errors.comment}
        ></TextArea>
      </div>
    </Form>
  );
}
