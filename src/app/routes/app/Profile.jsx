import Page from "../../../components/ui/Page";
import Tabs from "../../../components/ui/Tabs";
import Button from "../../../components/ui/Button";
import HoverableActions from "../../../components/ui/HoverableActions";
import { useModal } from "../../../components/contexts/ModalContext";
import { useEffect } from "react";
import useUsers from "../../../features/user/businessLogic/useUsers";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import CardContributor from "../../../features/contributors/components/CardContributor";
import ContributorForm from "../../../features/contributors/components/ContributorForm";
import ContributorPanel from "../../../features/contributors/components/ContributorPanel";
import TechnicalPersonPanel from "../../../features/user/technicalperson/TechnicalPersonPanel";
import ListItem from "../../../components/ui/ListItem";

import TehnicalPersonForm from "../../../features/user/technicalperson/TechnicalPersonForm";
import TextField from "../../../components/ui/TextField";
import PasswordValidator from "../../../features/auth/components/PasswordValidator";
import { Formik, Form } from "formik";
import Credentials from "../../../features/auth/domain/credentials";
import useAuth from "../../../features/auth/businessLogic/useAuth";

export default function Profile({ profile }) {
  //

  const { resetPassword } = useAuth();

  const handleSubmit = (values) => {
    resetPassword(values);
  };

  return (
    <Page title={profile.fullname} subtitle={profile.position}>
      <h2>Actualizar contrasena</h2>
      <Formik onSubmit={handleSubmit} initialValues={new Credentials()}>
        {({ values, errors, touched, handleChange }) => (
          <Form className="input-group">
            <TextField
              isFormik
              name="old_password"
              value={values.old_password}
              onChange={handleChange}
              hasError={errors.old_password && touched.old_password}
              errorMessage={errors.old_password}
              label="Contrasena actual"
              required
              type="password"
            ></TextField>
            <PasswordValidator
              label="Contraseña nueva"
              name="new_password"
              password={values.new_password}
              passwordConfirmation={values.passwordConfirmation}
              onChange={handleChange}
              passwordHasError={errors.new_password && touched.new_password}
              passwordConfirmationHasError={
                errors.new_password && touched.new_password
              }
              passwordConfirmationErrorMessage={errors.new_password}
              passwordErrorMessage={errors.new_password}
            ></PasswordValidator>
            <div className="button-row">
              <Button iconType="update" type="submit">
                Actualizar contrasena
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
