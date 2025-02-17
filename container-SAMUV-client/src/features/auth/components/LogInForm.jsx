import Button from "../../../components/ui/Button";
import TextField from "../../../components/ui/TextField";

import { Formik, Form } from "formik";
import { loginSchema } from "../formikSchemas/loginSchema";

import { useStatus } from "../../../components/contexts/StatusContext.jsx";
import ROUTES from "../../../routing/frontendRoutes.js";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import { useNavigate } from "react-router-dom";
import useAuth from "../businessLogic/useAuth.jsx";

export default function LogInForm({ onSubmit }) {
  const { closeModal } = useModal();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    await logIn(values.username, values.password);
    onSubmit();
  };

  return (
    
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={handleSubmit}
          validationSchema={loginSchema}
        >
          {({ values, errors, touched, handleChange, handleBlur }) => (
            <Form autoComplete="off" >
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
                    navigate(ROUTES.REQUEST_ACCESS);
                  }}
                >
                  Solicitar acceso
                </Button>
              </div>
            </Form>
          )}
        </Formik>
  );
}
