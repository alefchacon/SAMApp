//LIBRARIES
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { contributorSchema } from "../formikSchemas/contributorSchema";

import { Button } from "@/components/ui/button";
import TextField from "../../../components/ui/TextField";

import useContributorsAndRoles from "../businessLogic/useContributorsAndRoles";
import Contributor, {
  defaultContributor,
  IContributorSpecimen,
} from "../domain/Contributor";
import EHttpStatus from "@/stores/EHttpStatus";
import TApiResult, { IApiResult } from "@/dataAccess/domain/TApiResult";
import IOnCloseParams, {
  defaultCloseParams,
} from "@/components/contexts/IOnCloseProps";
import FormInput from "@/components/ui/FormInput";
import { Input } from "@/components/ui/input";

interface IContributorFormProps {
  onSubmit: (values: Contributor) => Promise<IApiResult<Contributor>>;
  contributor?: IContributorSpecimen;
  onCancel: (params: IOnCloseParams) => void;
}
export default function ContributorForm({
  onSubmit,
  contributor = defaultContributor,
  onCancel,
}: IContributorFormProps) {
  //
  const handleSubmit = async (
    values: Contributor,
    actions: FormikHelpers<Contributor>
  ) => {
    const response = await onSubmit(values);

    if (response.success) {
      actions.resetForm({
        values: { code: "", name: "" },
      });
    }
  };

  const isEdit = Boolean(contributor.id);

  return (
    <Formik
      validationSchema={contributorSchema}
      initialValues={contributor}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleSubmit, handleChange, resetForm }) => (
        <Form action="" autoComplete="off">
          <FormInput
            name="code"
            label={"Clave"}
            errorMessage={errors.code}
            hasError={Boolean(errors.code && touched.code)}
            required
          >
            <Input
              id="code"
              value={values.code}
              onChange={handleChange}
              maxLength={100}
            ></Input>
          </FormInput>
          <FormInput
            name="name"
            label={"Nombre completo"}
            errorMessage={errors.name}
            hasError={Boolean(errors.name && touched.name)}
          >
            <Input
              id="name"
              value={values.name}
              onChange={handleChange}
              maxLength={100}
            ></Input>
          </FormInput>
          <div className="button-row">
            <Button
              variant={"outline"}
              onClick={() => onCancel(defaultCloseParams)}
            >
              Cancelar
            </Button>
            <Button type="submit" onClick={() => console.error(contributor)}>
              {isEdit ? "Editar" : "Agregar"} contribuidor
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
