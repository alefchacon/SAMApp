import React from "react";
import Button from "../../../components/ui/ButtonCustom";
import TextField from "../../../components/ui/TextField";

import { Formik, Form } from "formik";
import { loginSchema } from "../formikSchemas/loginSchema";

import { useStatus } from "../../../components/contexts/StatusContext.js";
import ROUTES from "../../../routing/FrontendRoutes.js";
import { useModal } from "../../../components/contexts/ModalContext.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../businessLogic/useAuth.js";
import IOnCloseParams from "@/components/contexts/IOnCloseProps";

interface ILogInFormProps {
  onSubmit: (params: IOnCloseParams) => void;
}
export default function LogInForm({ onSubmit }: ILogInFormProps) {
  const { closeModal } = useModal();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values: any, actions: any) => {
    await logIn(values.username, values.password);
    onSubmit({});
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
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
            hasError={Boolean(errors.username && touched.username)}
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
            hasError={Boolean(errors.password && touched.password)}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
          ></TextField>
          <br />
          <br />
          <br />
          <div className="flex-col ">
            <button type="submit" className="w-100 primary">
              Entrar
            </button>
            <br />
            <button
              className="secondary w-100"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                // DEV ONLY: test this reason
                closeModal({ event: event, reason: "any" });
                navigate(ROUTES.REQUEST_ACCESS);
              }}
            >
              Solicitar acceso
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
