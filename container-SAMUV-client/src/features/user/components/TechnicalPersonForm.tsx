import React from "react";
import TextField from "../../../components/ui/TextField";
import { Button } from "@/components/ui/button";
import { Formik, Form, FormikValues, FormikHelpers } from "formik";
import { technicalPersonSchema } from "../formikSchemas/technicalPersonSchema";
import useUsers from "../businessLogic/useUsers";
import { Academic, defaultAcademic } from "../domain/Academic";
import IOnCloseParams, {
  defaultCloseParams,
} from "@/components/contexts/IOnCloseProps";

interface ITechnicalPersonFormProps {
  onSubmit: (params: any) => void;
}
export default function TehnicalPersonForm({
  onSubmit,
}: ITechnicalPersonFormProps) {
  const { addTechnicalPerson } = useUsers();
  const handleSubmit = (
    values: FormikValues,
    actions: FormikHelpers<Academic>
  ) => {
    addTechnicalPerson(values).then(() => {
      actions.resetForm();
      onSubmit(defaultCloseParams);
    });
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={technicalPersonSchema}
      initialValues={
        defaultAcademic
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
          <TextField
            required
            label={"Nombre(s)"}
            id="user.first_name"
            name="user.first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.first_name}
            errorMessage={errors.user?.first_name}
            hasError={Boolean(
              errors.user?.first_name && touched.user?.first_name
            )}
            maxLength={50}
            isFormik
          ></TextField>
          <TextField
            required
            label={"Apellido paterno"}
            id="user.last_name"
            name="user.last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.last_name}
            errorMessage={errors.user?.last_name}
            hasError={Boolean(
              errors.user?.last_name && touched.user?.last_name
            )}
            maxLength={50}
            isFormik
          ></TextField>
          <TextField
            required
            label={"Puesto"}
            id="position"
            name="position"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.position}
            errorMessage={errors.position}
            hasError={Boolean(errors.position && touched.position)}
            maxLength={50}
            isFormik
          ></TextField>
          <br />

          <TextField
            required
            label={"Email"}
            maxLength={100}
            id="user.email"
            name="user.email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.email}
            errorMessage={errors.user?.email}
            hasError={Boolean(errors.user?.email && touched.user?.email)}
            isFormik
            helperText="El sistema enviara un mensaje a la dirección que usted proporcione, incluyendo una contraseña provicional que permita al nuevo técnico iniciar sesión."
          ></TextField>

          <div className="button-row">
            <Button type="submit">Agregar técnico</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
