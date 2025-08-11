import React from "react";
import FormInput from "@/components/ui/FormInput";
import { Button } from "@/components/ui/button";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import { technicalPersonSchema } from "../formikSchemas/technicalPersonSchema";
import {
  defaultTecnicalPerson,
  ITechnicalPerson,
  TechnicalPerson,
} from "../domain/TechnicalPerson";
import { Input } from "@/components/ui/input";

interface ITechnicalPersonFormProps {
  onSubmit: (technicalPerson: TechnicalPerson) => void;
}
export default function TehnicalPersonForm({
  onSubmit,
}: ITechnicalPersonFormProps) {
  const handleSubmit = async (
    values: TechnicalPerson,
    actions: FormikHelpers<TechnicalPerson>
  ) => {
    await onSubmit(values);
    actions.resetForm();
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={technicalPersonSchema}
      initialValues={
        defaultTecnicalPerson
        //Los campos faltantes se generan en el back:
        //"username" sale del email, la cadena antes del @
        //"password" es una cadena random
        //"nomination" es la misma que position
        //"fullname" es una concatenación de first_name y last_name
      }
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
      }) => (
        <Form className="input-group">
          <FormInput
            required
            label={"Nombre(s)"}
            name="user.first_name"
            errorMessage={errors.user?.first_name}
            hasError={Boolean(
              errors.user?.first_name && touched.user?.first_name
            )}
          >
            <Input
              id="user.first_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user.first_name}
              maxLength={50}
            ></Input>
          </FormInput>
          <FormInput
            required
            label={"Apellido paterno"}
            name="user.last_name"
            errorMessage={errors.user?.last_name}
            hasError={Boolean(
              errors.user?.last_name && touched.user?.last_name
            )}
          >
            <Input
              id="user.last_name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user.last_name}
              maxLength={50}
            ></Input>
          </FormInput>
          <FormInput
            required
            label={"Puesto"}
            name="user.position"
            errorMessage={errors.position}
            hasError={Boolean(errors.position && touched.position)}
          >
            <Input
              id="user.position"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.position}
              maxLength={50}
            ></Input>
          </FormInput>
          <br />

          <FormInput
            required
            label={"Email"}
            name="user.email"
            errorMessage={errors.user?.email}
            hasError={Boolean(errors.user?.email && touched.user?.email)}
            helperText="El sistema enviara un mensaje a la dirección que usted proporcione, incluyendo una contraseña provicional que permita al nuevo técnico iniciar sesión."
          >
            <Input
              id="user.email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.user.email}
              maxLength={100}
            ></Input>
          </FormInput>

          <div className="button-row">
            <Button type="submit">Agregar técnico</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
