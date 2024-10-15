import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";

import { Formik, Form } from "formik";
import { loginSchema } from "../formikSchemas/loginSchema";

import logIn from "../businessLogic/logIn.js";
import { useStatus } from "../../../components/contexts/StatusContext.jsx";
import ROUTES from "../../../stores/routes.js";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import { useNavigate } from "react-router-dom";

export default function LogInForm({ onSubmit }) {
  const { setCredentials } = useStatus();
  const { closeModal } = useModal();
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    const credentials = await logIn(values.username, values.password);
    setCredentials(credentials);
    onSubmit();
  };

  return (
    <div className="log-in-form flex-col" label="Entrar">
      <div className="flex-col p-2rem gap-1rem">
        <Formik
          initialValues={{ username: "asdf", password: "pass" }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form autoComplete="off">
              <TextField
                name="username"
                label={"Nombre de usuario"}
                iconType={"person"}
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
                fullwidth
                errorMessage={errors.password}
                hasError={errors.password && touched.password}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              ></TextField>
              <br />
              <br />
              <br />
              <div className="flex-col ">
                <Button
                  iconType="login"
                  type="submit"
                  className="w-100 primary"
                >
                  Entrar
                </Button>
                <br />
                <Button
                  iconType="passkey"
                  className="secondary w-100"
                  fullwidth
                  onClick={() => {
                    closeModal();
                    navigate(ROUTES.SOLICITAR_ACCESO);
                  }}
                >
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
