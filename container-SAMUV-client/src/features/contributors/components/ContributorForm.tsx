//LIBRARIES
import React, { useState } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import { contributorSchema } from "../formikSchemas/contributorSchema";

import Button from "../../../components/ui/ButtonCustom";
import TextField from "../../../components/ui/TextField";

import useContributorsAndRoles from "../businessLogic/useContributorsAndRoles";
import Contributor, {
  defaultContributor,
  IContributorSpecimen,
} from "../domain/Contributor";
import EHttpStatus from "@/stores/EHttpStatus";
import TApiResult from "@/dataAccess/domain/TApiResult";

interface IContributorFormProps {
  onSubmit: (values: Contributor) => Promise<void>;
  contributor?: IContributorSpecimen;
}
export default function ContributorForm({
  onSubmit,
  contributor = defaultContributor,
}: IContributorFormProps) {
  //
  const handleSubmit = async (
    values: Contributor,
    actions: FormikHelpers<Contributor>
  ) => {
    const response = await onSubmit(values);

    /*
    if (response.success) {
      actions.resetForm();
    }
      */
    //onSecondaryClick();
  };

  const isEdit = Boolean(contributor.id);

  return (
    <Formik
      validationSchema={contributorSchema}
      initialValues={contributor}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <Form action="" autoComplete="off">
          <div className="input-group">
            <TextField
              name="code"
              id="code"
              label={"Clave"}
              value={values.code}
              onChange={handleChange}
              errorMessage={errors.code}
              hasError={Boolean(errors.code && touched.code)}
              required
              maxLength={100}
              isFormik
            ></TextField>
            <TextField
              name="name"
              id="name"
              label={"Nombre completo"}
              value={values.name}
              onChange={handleChange}
              errorMessage={errors.name}
              hasError={Boolean(errors.name && touched.name)}
              maxLength={200}
              isFormik
            ></TextField>
            <div className="button-row">
              <Button className="primary" type="submit">
                {isEdit ? "Editar" : "Agregar"} contribuidor
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
