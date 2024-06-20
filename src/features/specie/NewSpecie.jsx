import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import TextField from "../../components/ui/TextField";
import SearchField from "../../components/ui/SearchField";
import Button from "../../components/ui/Button";
import Message from "../../components/ui/Message";

import { specieSchema } from "./formikSchemas/specieSchema";

export default function NewSpecie() {
  return (
    <div className="sam-form">
      <h2 className="form-title">Nueva especie</h2>
      <Formik
        validationSchema={specieSchema}
        initialValues={{
          orden: "",
          family: "",
          gender: "",
          epithet: "",
          subspecie: "",
        }}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form action="">
            <SearchField
              id="orden"
              name="orden"
              errorMessage={errors.orden}
              hasError={errors.orden && touched.orden}
              required={false}
              label="Orden"
            ></SearchField>

            <TextField
              id="family"
              name="family"
              errorMessage={errors.family}
              hasError={errors.family && touched.family}
              label="Familia"
              helperText="Sólo se permiten letras y números"
            ></TextField>
            <TextField
              id="gender"
              name="gender"
              errorMessage={errors.gender}
              hasError={errors.gender && touched.gender}
              label="Género"
              helperText="Sólo se permiten letras y números"
            ></TextField>
            <TextField
              id="epithet"
              name="epithet"
              errorMessage={errors.epithet}
              hasError={errors.epithet && touched.epithet}
              label="Epíteto"
              helperText="Sólo se permiten letras y números"
            ></TextField>
            <TextField
              id="subspecie"
              name="subspecie"
              errorMessage={errors.subspecie}
              hasError={errors.subspecie && touched.subspecie}
              label="Subespecie"
              helperText="Sólo se permiten letras y números"
            ></TextField>

            <div className="form-actions">
              <Button
                type="button"
                variant={"secondary"}
                label="Cancelar"
                isDisabled={false}
              ></Button>
              <Button
                type="submit"
                variant={"primary"}
                label="Agregar especie"
                isDisabled={!isValid || !dirty}
              ></Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
