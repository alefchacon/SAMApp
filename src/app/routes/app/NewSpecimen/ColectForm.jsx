// LIBRARIES
import { useEffect } from "react";
import { Form, useFormikContext } from "formik";

// CUSTOM COMPONENTS
import TextField from "../../../../components/ui/TextField";
import Button from "../../../../components/ui/Button";
import ContributorForm from "../../../../features/contributors/components/ContributorForm";
import ContributorAutocomplete from "../../../../features/contributors/components/ContributorAutocomplete";
import moment from "moment";
import { useModal } from "../../../../components/contexts/ModalContext";
import RadioList from "../../../../components/ui/RadioList";
//VALIDATION SCHEMAS
import TextArea from "../../../../components/ui/TextArea";
import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";
import CONTRIBUTOR_ROLES from "../../../../stores/contributorRoles";
import NATURE from "../../../../stores/nature";
import CONTRIBUTOR_ROLE_NAMES from "../../../../stores/contributorRoleNames";

export default function ContributorsForm({ inputWidth = "" }) {
  const { values, errors, touched, onBlur, handleChange, setFieldValue } =
    useFormikContext();

  const { contributors, getContributors, postContributor } =
    useContributorsAndRoles();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getContributors();
  }, []);

  const handleShowAddContributorModal = () => {
    showModal(
      "Agregar colaborador",
      <ContributorForm onSubmit={postContributor} />
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
    <div className="">
      <div className="input-group">
        <h3>Colecta</h3>
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
        <RadioList
          required
          onBlur={onBlur}
          label="Naturaleza del ejemplar"
          value={values.nature}
          options={[
            { label: "PC (Piel y craneo)", value: NATURE.PC },
            { label: "E/A (En alcohol)", value: NATURE.EA },
            { label: "SE (Solo esqueleto)", value: NATURE.SE },
            { label: "EP (Equeleto postcraneal)", value: NATURE.EP },
            { label: "PE (Piel y equeleto)", value: NATURE.PE },
            { label: "CE (Craneo, esqueleto y piel)", value: NATURE.CE },
            { label: "CA (Craneo y piel en alcohol)", value: NATURE.CA },
            { label: "SC (Sólo craneo)", value: NATURE.SC },
            { label: "SP (Sólo piel)", value: NATURE.SP },
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
    </div>
  );
}
