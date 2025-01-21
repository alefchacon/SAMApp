import Page from "../../../components/ui/Page";
import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import PasswordValidator from "../../../features/auth/components/PasswordValidator";
import { Formik, Form } from "formik";
import Credentials from "../../../features/auth/domain/credentials";
import useAuth from "../../../features/auth/businessLogic/useAuth";
import * as yup from "yup";
import messages from "../../../validation/messages";
import { passwordSchema } from "../../../features/user/formikSchemas/passwordSchema";

export default function Profile({ profile }) {
  const { resetPassword } = useAuth();

  const handleSubmit = (values, actions) => {
    resetPassword(values);
    actions.resetForm();
  };

  return (
    <Page title={profile?.fullname} subtitle={profile?.position}>
      <Formik
        onSubmit={handleSubmit}
        initialValues={new Credentials()}
        validationSchema={yup.object().shape({
          old_password: yup.string().required(messages.required),
          ...passwordSchema.fields,
        })}
        enableReinitialize
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <Form className="">
            <div className="input-group">
            <h2>Actualizar contrasena</h2>

              <TextField
                isFormik
                name="old_password"
                value={values.old_password}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={errors.old_password && touched.old_password}
                errorMessage={errors.old_password}
                label="Contraseña antigua"
                required
                type="password"
              ></TextField>
              <PasswordValidator
                required
                label="Contraseña nueva"
                name="password"
                password={values.password}
                passwordConfirmation={values.passwordConfirmation}
                onChange={handleChange}
                onBlur={handleBlur}
                passwordHasError={errors.password && touched.password}
                passwordConfirmationHasError={
                  errors.passwordConfirmation && touched.passwordConfirmation
                }
                passwordConfirmationErrorMessage={errors.passwordConfirmation}
                passwordErrorMessage={errors.password}
              ></PasswordValidator>
              <div className="button-row">
                <Button iconType="update" type="submit">
                  Actualizar contrasena
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
