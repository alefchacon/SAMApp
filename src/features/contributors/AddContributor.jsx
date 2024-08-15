//LIBRARIES
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { contributorSchema } from "./formikSchemas/contributorSchema";

import Button from "../../components/ui/Button";
import TextField from "../../components/ui/TextField";

export default function AddContributor({
  children,
  open,
  onSecondaryClick,
  onPrimaryClick,
  onSubmit,
  contributor,
}) {
  const handleSubmit = (values, actions) => {
    const newItem = {
      id: Math.floor(Math.random() * 200),
      name: values.name,
    };
    onSubmit(newItem);
    actions.resetForm();
  };

  console.log(contributor);

  return (
    <Formik
      validationSchema={contributorSchema}
      initialValues={{
        name: "",
      }}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, handleSubmit, values }) => (
        <Form action="" autoComplete="false">
          <TextField
            name="name"
            id="name"
            label={"Nombre completo del colaborador"}
            value={values.name}
            errorMessage={errors.name}
            hasError={errors.name && touched.name}
            required
            isFormik
          ></TextField>

          <div className="form-actions">
            <Button
              className="secondary"
              iconType="close"
              onClick={onSecondaryClick}
            >
              Cancelar
            </Button>
            <Button
              className="primary"
              type="submit"
              label="Registrar colaborador"
              onClick={handleSubmit}
            >
              Registrar colaborador
            </Button>
            <button onClick={() => console.log(values)} type="button"></button>
          </div>
          {children}
        </Form>
      )}
    </Formik>
  );
}
