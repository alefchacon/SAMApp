// LIBRARIES
import React, { useEffect } from "react";
import { Form, useFormikContext } from "formik";

// CUSTOM COMPONENTS
import TextField from "../../../components/ui/TextField";
import { Button } from "@/components/ui/button";
import ContributorForm from "@/features/contributors/components/ContributorForm";
import ContributorAutocomplete from "@/features/contributors/components/ContributorAutocomplete";
import moment from "moment";
import { useModal } from "../../../components/contexts/ModalContext";
import RadioList from "../../../components/ui/RadioList";
//VALIDATION SCHEMAS
// import TextArea from "../../../components/ui/TextArea";
import useContributorsAndRoles from "../../contributors/businessLogic/useContributorsAndRoles";
import { EContributorRoles } from "@/stores/EContributorRoles";
import { getContributorTypeById } from "@/stores/EContributorRoles";
import NATURE from "../../../stores/nature";
import ContributorRoleMap from "@/stores/ContributorRoleMap";
import EContributorTypes from "@/stores/EContributorRoles";
import {
  IContributor,
  IContributorSpecimen,
} from "@/features/contributors/domain/Contributor";
import { ISpecimen } from "../domain/model/Specimen";

import Select, {
  FormatOptionLabelContext,
  FormatOptionLabelMeta,
  GroupBase,
} from "react-select";
import FormInput from "@/components/ui/FormInput";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";

export default function ContributorsForm({ inputWidth = "" }) {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext<ISpecimen>();

  const { contributors, getContributors, addContributor } =
    useContributorsAndRoles();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getContributors();
  }, []);

  const handleShowAddContributorModal = () => {
    showModal({
      title: "Agregar contribuidor",
      content: (
        <ContributorForm onSubmit={addContributor} onCancel={closeModal} />
      ),
    });
  };

  const handleContributorChange = (
    contributorRoleId: EContributorRoles,
    newContributor?: IContributorSpecimen
  ) => {
    if (!newContributor) {
      return;
    }

    newContributor.contributor_role_id = contributorRoleId;

    let thisContributorRoleName = ContributorRoleMap.get(
      newContributor.contributor_role_id
    );

    if (!thisContributorRoleName) {
      thisContributorRoleName = "colector";
    }

    const currentContributor = values[
      thisContributorRoleName
    ] as IContributorSpecimen;

    const userSelectedSameContributor =
      currentContributor.contributor_id === newContributor.id;

    if (userSelectedSameContributor) {
      return;
    }

    let newContributorSpecimenRelationship: IContributorSpecimen = {
      contributor_id: newContributor.id,
      contributor_role_id: newContributor.contributor_role_id,
      name: newContributor.name,
      code: newContributor.code,
    };

    const relationshipId = (
      values[thisContributorRoleName] as IContributorSpecimen
    )?.id;
    const userIsEditingExistingSpecimen = Boolean(relationshipId);
    if (userIsEditingExistingSpecimen) {
      newContributorSpecimenRelationship.id = relationshipId;
    }

    setFieldValue(thisContributorRoleName, newContributorSpecimenRelationship);
  };

  const contributorFormatOptionLabel = (
    option: ContributorOption,
    { context }: FormatOptionLabelMeta<ContributorOption>
  ) => {
    if (context === "menu") {
      return (
        <span className="flex flex-col">
          <p>{option.value.code}</p>
          <p className="text-sm text-gray-600">{option.value.name}</p>
        </span>
      );
    }
    if (context === "value") {
      return (
        <div className="">
          <strong>{option.value.code}</strong>
          <p className="text-sm text-gray-600">{option.value.name}</p>
        </div>
      );
    }
    return option.label;
  };

  class ContributorOption {
    label: string;
    value: IContributorSpecimen;

    constructor(data: IContributorSpecimen) {
      (this.label = `${data.code ?? ""} ${data.name ?? ""}`.trim()),
        (this.value = data);
    }
  }

  return (
    <div>
      <div className="input-group">
        <h2>Colaboradores</h2>
        <p>
          Busque y seleccione los colaboradores que colectaron y prepararon el
          espécimen. Si no encuentra al colaborador, puede registrarlo a
          continuación
        </p>
        <br />
        <Button type="button" onClick={handleShowAddContributorModal}>
          <UserPlus></UserPlus> Registrar colaborador
        </Button>
        <br />
        <br />
        <FormInput
          label="Colector"
          name="colector"
          errorMessage={errors.colector}
          hasError={Boolean(errors.colector && touched.colector)}
          required
        >
          <Select<ContributorOption, false, GroupBase<ContributorOption>>
            formatOptionLabel={contributorFormatOptionLabel}
            options={contributors.map(
              (contributor) =>
                new ContributorOption(contributor as IContributorSpecimen)
            )}
            onChange={(option) =>
              handleContributorChange(EContributorRoles.COLECTOR, option?.value)
            }
            onBlur={handleBlur}
            value={
              new ContributorOption(values.colector as IContributorSpecimen)
            }
          ></Select>
        </FormInput>
        <FormInput
          label="Preparador"
          name="preparator"
          errorMessage={errors.preparator}
          hasError={Boolean(errors.preparator && touched.preparator)}
          required
        >
          <Select<ContributorOption, false, GroupBase<ContributorOption>>
            formatOptionLabel={contributorFormatOptionLabel}
            options={contributors.map(
              (contributor) =>
                new ContributorOption(contributor as IContributorSpecimen)
            )}
            onChange={(option) =>
              handleContributorChange(
                EContributorRoles.PREPARATOR,
                option?.value
              )
            }
            onBlur={handleBlur}
            value={
              new ContributorOption(values.preparator as IContributorSpecimen)
            }
          ></Select>
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Colecta</h2>

        <FormInput
          label="Fecha de colecta"
          name="colection_date"
          hasError={Boolean(errors.colection_date)}
          errorMessage={errors.colection_date}
          required
        >
          <Input
            type="date"
            name="colection_date"
            id="colection_date"
            value={String(values.colection_date)}
            defaultValue={String(values.colection_date)}
            onChange={handleChange}
            maxLength={20}
            className="max-w-[140px]"
          />
        </FormInput>
        <FormInput
          label="Hora de colecta"
          name="colection_date"
          hasError={Boolean(errors.colection_date)}
          errorMessage={errors.colection_date}
        >
          <Input
            type="time"
            name="hour"
            id="hour"
            value={values.hour}
            defaultValue={values.hour}
            onChange={handleChange}
            maxLength={20}
            className="max-w-[115px]"
          />
        </FormInput>
        <FormInput
          label="Naturaleza del ejemplar"
          name="nature"
          errorMessage={errors.nature}
          hasError={Boolean(errors.nature && touched.nature)}
          required
        >
          <Select
            value={{
              label: values?.nature,
              value: values?.nature,
            }}
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
            onChange={(e) => setFieldValue("nature", e?.value)}
            onBlur={handleBlur}
          ></Select>
        </FormInput>
        {/*
        <ContributorAutocomplete
          roleId={EContributorRoles.COLECTOR}
          required
          id="colector"
          defaultContributor={values.colector as IContributorSpecimen}
          name="colector"
          onChange={handleContributorChange}
          label={"Colector"}
          helperText={contributorHelperText}
          hasError={Boolean(errors.colector && touched.colector)}
          errorMessage={errors.colector}
          contributors={contributors}
        ></ContributorAutocomplete>
<ContributorAutocomplete
  roleId={EContributorRoles.PREPARATOR}
  defaultContributor={values.preparator as IContributorSpecimen}
  id="preparator"
  name="preparator"
  onChange={handleContributorChange}
  helperText={contributorHelperText}
  hasError={Boolean(errors.preparator && touched.preparator)}
  errorMessage={errors.preparator}
  label={"Preparador"}
  required
  contributors={contributors}
></ContributorAutocomplete>
        */}

        <FormInput
          label="Número de colecta"
          name="colection_number"
          hasError={Boolean(errors.colection_number)}
          errorMessage={errors.colection_number}
          required
        >
          <Input
            type="text"
            name="colection_number"
            id="colection_number"
            value={values.colection_number}
            defaultValue={values.colection_number}
            onChange={handleChange}
            maxLength={20}
            className="max-w-[115px]"
          />
        </FormInput>
      </div>
      <div className="input-group">
        <h2>Preparación</h2>

        <FormInput
          label="Fecha de preparación"
          name="preparation_date"
          hasError={Boolean(errors.preparation_date)}
          errorMessage={errors.preparation_date}
        >
          <Input
            type="date"
            name="preparation_date"
            id="preparation_date"
            value={String(values.preparation_date)}
            defaultValue={String(values.preparation_date)}
            onChange={handleChange}
            maxLength={20}
            className="max-w-[140px]"
          />
        </FormInput>
      </div>
      <div className="input-group">
        <RadioList
          required
          onBlur={handleBlur}
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

        <FormInput
          label="Observaciones"
          name="comment"
          hasError={Boolean(errors.comment)}
          errorMessage={errors.comment}
        >
          <Input
            type="text"
            name="comment"
            id="comment"
            value={values.comment}
            defaultValue={values.comment}
            onChange={handleChange}
            maxLength={200}
          />
        </FormInput>
      </div>
    </div>
  );
}
