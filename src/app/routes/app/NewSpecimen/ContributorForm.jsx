//LIBRARIES
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { contributorSchema } from "../../../../features/contributors/formikSchemas/contributorSchema";

import Button from "../../../../components/ui/Button";
import TextField from "../../../../components/ui/TextField";
import Modal from "../../../../components/ui/modal/Modal";

import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";

export default function ContributorForm({
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
  const handleSubmit = async (values, actions) => {
    const newItem = {
      id: Math.floor(Math.random() * 200),
      name: values.name,
    };
    const response = await onSubmit(values);

    if (response.status === 201) {
      actions.resetForm();
    }
    //onSecondaryClick();
  };
  return (
    <Formik
      validationSchema={contributorSchema}
      initialValues={{
        name: "",
        code: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched, handleSubmit, handleChange }) => (
        <Form action="" autoComplete="off">
          <div className="input-group">
            <TextField
              name="name"
              id="name"
              label={"Nombre completo del colaborador"}
              value={values.name}
              onChange={handleChange}
              errorMessage={errors.name}
              hasError={errors.name && touched.name}
              maxLength={200}
              required
              isFormik
            ></TextField>
            <TextField
              name="code"
              id="code"
              label={"Clave del colaborador"}
              value={values.code}
              onChange={handleChange}
              errorMessage={errors.code}
              hasError={errors.code && touched.code}
              required
              maxLength={100}
              isFormik
            ></TextField>
            <div className="button-row">
              <Button
                className="primary"
                label="Registrar colaborador"
                type="submit"
              >
                Agregar colaborador
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
