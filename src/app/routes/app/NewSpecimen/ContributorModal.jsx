//LIBRARIES
import { useState } from "react";
import { Formik, Form, Field } from "formik";
import { contributorSchema } from "../../../../features/contributors/formikSchemas/contributorSchema";

import Button from "../../../../components/ui/Button";
import TextField from "../../../../components/ui/TextField";
import Modal from "../../../../components/ui/modal/Modal";

export default function ContributorModal({
  open,
  onSecondaryClick,
  onPrimaryClick,
  onSubmit,
}) {
  const handleSubmit = (values, actions) => {
    const newItem = {
      id: Math.floor(Math.random() * 200),
      name: values.name,
    };
    console.log(newItem);
    onSubmit(newItem);
    actions.resetForm();
    //onSecondaryClick();
  };
  return (
    <Modal open={open}>
      <Formik
        validationSchema={contributorSchema}
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, handleSubmit }) => (
          <Form action="" autoComplete="false">
            <div className="modal-body">
              <TextField
                name="name"
                id="name"
                label={"Nombre completo del colaborador"}
                errorMessage={errors.name}
                hasError={errors.name && touched.name}
                required
                isFormik
              ></TextField>
            </div>
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
                label="Registrar colaborador"
                onClick={handleSubmit}
              >
                Registrar colaborador
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
