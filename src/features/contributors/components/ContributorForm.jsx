//LIBRARIES
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { contributorSchema } from "../formikSchemas/contributorSchema";

import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import Modal from "../../../components/ui/modal/Modal";

import useContributorsAndRoles from "../businessLogic/useContributorsAndRoles";
import Contributor from "../domain/contributor";

export default function ContributorForm({
  onSubmit,
  contributor = new Contributor(),
}) {
  const handleSubmit = async (values, actions) => {
    console.log(values);
    const response = await onSubmit(values);

    if (response.status === 201) {
      actions.resetForm();
    }
    //onSecondaryClick();
  };

  console.log(contributor);

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
              hasError={errors.code && touched.code}
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
              hasError={errors.name && touched.name}
              maxLength={200}
              isFormik
            ></TextField>
            <div className="button-row">
              <Button
                className="primary"
                label="Agregar colaborador"
                type="submit"
              >
                Agregar colaborador
              </Button>
            </div>
          </div>
          <Button onClick={() => console.log(values)}></Button>
        </Form>
      )}
    </Formik>
  );
}
