import React from "react";
import { Button } from "@/components/ui/button";
import { ORCIDIcon } from "@/components/ui/ORCIDIcon";
import { Formik, Form, getIn, FormikHelpers, Field } from "formik";
import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea.js";
import { useModal } from "../../../components/contexts/ModalContext.js";
import useAccessRequests from "../../../features/accessRequests/businessLogic/useAccessRequests.js";
import { Link } from "react-router-dom";
import PasswordValidator from "../../../features/auth/components/PasswordValidator.js";
import { accessRequestSchema } from "../../../features/accessRequests/formikSchemas/accessRequestSchema.js";
import FrontendRoutes from "../../../routing/FrontendRoutes";
import { useNavigate } from "react-router-dom";
import Page from "../../../components/ui/Page.js";
import FormInput from "@/components/ui/FormInput";
import {
  AccessRequest,
  defaultAccessRequest,
  IAccessRequest,
} from "../../../features/accessRequests/domain/AccessRequest.js";
import flattenObject from "@/utils/flattenObject";
import User, { defaultUser } from "@/features/user/domain/User";
import { defaultCloseParams } from "@/components/contexts/IOnCloseProps";
export default function AccessRequestForm() {
  const { addAccessRequest } = useAccessRequests();

  const navigate = useNavigate();

  const { showModal, closeModal } = useModal();

  const handleSubmit = async (
    values: IAccessRequest,
    actions: FormikHelpers<IAccessRequest>
  ) => {
    const response = await addAccessRequest(values);
    if (response?.success && values.academic?.user) {
      handleShowModal(values.academic?.user);
      actions.resetForm();
    }
  };

  const handleShowModal = (values: User) => {
    showModal({
      title: "Solicitud enviada",
      content: (
        <div>
          <p>
            Su solicitud será revisada por la administración de la biocolección.
            Recibirá una respuesta a su correo, <b>{values.email}</b>,
            confirmando su acceso.
          </p>
          <div className="button-row">
            <Link to={FrontendRoutes.COLLECTION}>
              <Button onClick={goToColection}>Regresar a la colección</Button>
            </Link>
          </div>
        </div>
      ),
    });
  };

  const goToColection = () => {
    closeModal(defaultCloseParams);
    navigate(FrontendRoutes.COLLECTION);
  };

  console.error(defaultAccessRequest);

  return (
    <Page
      title={"Solicitar acceso"}
      subtitle={
        "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario y nos pondremos en contacto con usted. Todos los campos son obligatorios."
      }
    >
      <Formik
        validationSchema={accessRequestSchema}
        onSubmit={handleSubmit}
        initialValues={defaultAccessRequest}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form className="" autoComplete="off">
            <div className="input-group">
              <h2>Sobre su investigación</h2>
              <FormInput
                name="orcid"
                value={values.orcid}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(errors.orcid && touched.orcid)}
                errorMessage={errors.orcid}
                label={"ORCID"}
                helperText={
                  "Ingrese los 19 caracteres de su ORCID, incluyendo los guiones siguiendo el formato: 0000-0000-0000-0000"
                }
                inputClassName="w-[160px]"
                maxLength={19}
              ></FormInput>

              <FormInput
                name="about"
                label={"¿Cuál es la naturaleza de su investigación?"}
                id="about"
                value={values.about}
                onBlur={handleBlur}
                onChange={handleChange}
                hasError={Boolean(errors.about && touched.about)}
                errorMessage={errors.about}
                maxLength={500}
              ></FormInput>

              <FormInput
                name="academic.user.email"
                id="academic.user.email"
                value={values.academic?.user?.email}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.user.email") &&
                    getIn(touched, "academic.user.email")
                )}
                errorMessage={getIn(errors, "academic.user.email")}
                label={"E-mail"}
                maxLength={100}
                inputClassName="max-w-[880px]"
              ></FormInput>
            </div>

            <div className="input-group">
              <h2>Sobre usted</h2>

              <FormInput
                name="academic.names"
                id="academic.names"
                value={values.academic?.names}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.names") &&
                    getIn(touched, "academic.names")
                )}
                errorMessage={getIn(errors, "academic.names")}
                label={"Nombre(s)"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
              <FormInput
                name="academic.father_last_name"
                value={values.academic?.father_last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.father_last_name") &&
                    getIn(touched, "academic.father_last_name")
                )}
                errorMessage={getIn(errors, "academic.user.father_last_name")}
                label={"Apellido paterno"}
                inputClassName="max-w-[460px]"
                maxLength={50}
              ></FormInput>
              <FormInput
                name="academic.mother_last_name"
                value={values.academic?.mother_last_name}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.mother_last_name") &&
                    getIn(touched, "academic.mother_last_name")
                )}
                errorMessage={getIn(errors, "academic.mother_last_name")}
                label={"Apellido materno"}
                inputClassName="max-w-[460px]"
                maxLength={50}
              ></FormInput>
              <FormInput
                name="academic.state"
                value={values.academic?.state}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.state") &&
                    getIn(touched, "academic.state")
                )}
                errorMessage={getIn(errors, "academic.state")}
                label={"Estado"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
              <FormInput
                name="academic.city"
                value={values.academic?.city}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.city") &&
                    getIn(touched, "academic.city")
                )}
                errorMessage={getIn(errors, "academic.city")}
                label={"Ciudad"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
              <FormInput
                name="academic.college"
                value={values.academic?.college}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.college") &&
                    getIn(touched, "academic.college")
                )}
                errorMessage={getIn(errors, "academic.college")}
                label={"Universidad"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
              <FormInput
                name="academic.position"
                value={values.academic?.position}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.position") &&
                    getIn(touched, "academic.position")
                )}
                errorMessage={getIn(errors, "academic.position")}
                label={"Posición / puesto"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
              <FormInput
                name="academic.degree"
                value={values.academic?.degree}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.degree") &&
                    getIn(touched, "academic.degree")
                )}
                errorMessage={getIn(errors, "academic.degree")}
                label={"Grado académico"}
                inputClassName="max-w-[880px]"
                maxLength={100}
              ></FormInput>
            </div>

            <div className="input-group flex-col gap-2rem">
              <div>
                <h2>Credenciales</h2>
                <p>
                  Si su solicitud es aprobada, utilizará esta información para
                  iniciar sesión.
                </p>
              </div>
              <br />
              <FormInput
                name="academic.user.username"
                value={values.academic?.user?.username}
                onChange={handleChange}
                onBlur={handleBlur}
                hasError={Boolean(
                  getIn(errors, "academic.user.username") &&
                    getIn(touched, "academic.user.username")
                )}
                errorMessage={getIn(errors, "academic.user.username")}
                label={"Nombre de usuario"}
                maxLength={50}
              ></FormInput>

              <PasswordValidator
                name="academic.user.password"
                passwordConfirmationName="academic.user.passwordConfirmation"
                password={values.academic?.user?.password}
                passwordConfirmation={
                  values.academic?.user?.passwordConfirmation
                }
                onChange={handleChange}
                passwordHasError={Boolean(
                  getIn(errors, "academic.user.password") &&
                    getIn(touched, "academic.user.password")
                )}
                passwordConfirmationHasError={Boolean(
                  getIn(errors, "academic.user.passwordConfirmation") &&
                    getIn(touched, "academic.user.passwordConfirmation")
                )}
                passwordConfirmationErrorMessage={getIn(
                  errors,
                  "academic.user.passwordConfirmation"
                )}
                passwordErrorMessage={getIn(errors, "academic.user.password")}
              ></PasswordValidator>
            </div>

            <div className="button-row">
              <Button
                type="button"
                variant={"destructive"}
                onClick={() => console.error(values)}
              >
                Errors
              </Button>
              <Button type="submit">Enviar solicitud</Button>
            </div>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
