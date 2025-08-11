import React from "react";
import { Button } from "@/components/ui/button";
import TextField from "../../../components/ui/TextField";

import { Formik, Form } from "formik";
import { loginSchema } from "../formikSchemas/loginSchema";

import { useStatus } from "../../../components/contexts/StatusContext.js";
import ROUTES from "../../../routing/FrontendRoutes.js";
import { useModal } from "../../../components/contexts/ModalContext.js";
import { useNavigate } from "react-router-dom";
import useAuth from "../businessLogic/useAuth.js";
import IOnCloseParams from "@/components/contexts/IOnCloseProps";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import FormInput from "@/components/ui/FormInput";

interface ILogInFormProps {
  onSubmit?: (params: IOnCloseParams) => void;
}
export default function LogInForm({ onSubmit }: ILogInFormProps) {
  const { closeModal } = useModal();
  const { logIn } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (values: any, actions: any) => {
    await logIn(values.username, values.password);
    if (onSubmit) {
      onSubmit({});
    }
  };

  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form autoComplete="off">
          <FormInput label="Nombre de usuario" name="username">
            <Input
              id="username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            ></Input>
          </FormInput>
          <FormInput label="Contraseña" name="password">
            <Input
              id="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              type="password"
            ></Input>
          </FormInput>

          <div className="flex flex-col gap-3 w-full items-center">
            <Button type="submit" className="w-[200px]">
              Entrar
            </Button>
            <Separator />
            <Button
              className="w-[200px]"
              type="button"
              variant={"outline"}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                // DEV ONLY: test this reason
                closeModal({ event: event, reason: "any" });
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
