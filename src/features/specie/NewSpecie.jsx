import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import TextField from "../../components/ui/TextField";
import Button from "../../components/ui/Button";
import Message from "../../components/ui/Message";

import { specieSchema } from "./formikSchemas/specieSchema";

export default function NewSpecie() {
  return (
    <>
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
            <h2>Nueva especie</h2>
            <TextField
              id="orden"
              name="orden"
              errorMessage={errors.orden}
              hasError={errors.orden && touched.orden}
              label="Orden"
              helperText="Debe escribirse sólo con letras del alfabeto. Ejemplo: Chiroptera"
            ></TextField>

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
            <Message isVisible={!isValid}>
              Hay Y campos con información errónea. Por favor corrígalos antes
              de enviar la información.
            </Message>
            <Button
              type="submit"
              variant={"primary"}
              label="Agregar especie"
              isDisabled={!isValid || !dirty}
            ></Button>
          </Form>
        )}
      </Formik>
    </>
  );
}
