import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";
import Tabs from "../../../components/ui/Tabs";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";
import { loginSchema } from "../formikSchemas/loginSchema";

import logIn from "../api/logIn.js";

export default function LogInForm() {
  const handleSubmit = (values, actions) => {
    logIn(values.username, values.password);
  };

  return (
    <div className="log-in-form flex-col" label="Entrar">
      <div className="flex-col p-2rem gap-1rem">
        <Formik
          initialValues={{ username: "asdf", password: "pass" }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => (
            <Form autoComplete="off">
              <TextField
                name="username"
                label={"Nombre de usuario"}
                iconType={"person"}
                required
                fullwidth
                errorMessage={errors.username}
                hasError={errors.username && touched.username}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                isFormik
              ></TextField>
              <br />
              <TextField
                isFormik
                name="password"
                label={"Contraseña"}
                iconType={"key"}
                type="password"
                required
                fullwidth
                errorMessage={errors.password}
                hasError={errors.password && touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></TextField>
              <br />
              <br />
              <div className="flex-col align-items-center w-100 gap-1rem">
                <Button iconType="login" type="submit">
                  Entrar
                </Button>
                <Button iconType="passkey" className="secondary">
                  Solicitar acceso
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
