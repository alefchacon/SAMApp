import Button from "../../../components/ui/Button.jsx";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon.jsx";
import { Formik, Form } from "formik";
import Card from "../../../components/ui/Card.jsx";
import Footer from "../../../components/ui/Footer.jsx";
import TextField from "../../../components/ui/TextField.jsx";
import TextArea from "../../../components/ui/TextArea.jsx";
import HeaderPage from "../../../components/ui/HeaderPage.jsx";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import useAccessRequests from "../../../features/access/businessLogic/useAccessRequests.jsx";
import { accessRequestSchema } from "../../../features/access/formikSchemas/accessRequestSchema.js";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import InfoItem from "../../../components/ui/InfoItem.jsx";
import PasswordValidator from "../../../features/auth/components/PasswordValidator.jsx";

import { useEffect } from "react";
import { academicSchema } from "../../../features/user/formikSchemas/academicSchema.js";

export default function SignupForm() {
  const [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
    verifyAccessRequestToken,
  ] = useAccessRequests();

  const { showModal, closeModal } = useModal();
  const { token } = useParams();

  useEffect(() => {}, []);

  const handleSubmit = async (values, actions) => {
    console.log(values);

    /*
    await addAccessRequest(values);

    showModal(
      "Solicitud enviada",
      <div>
        <p>
          Recibirá una respuesta a su correo, <b>{values.email}</b>, confirmando
          su acceso.
        </p>
      </div>
    );

    actions.resetForm();
    */
  };

  return (
    <Formik
      validationSchema={academicSchema}
      onSubmit={handleSubmit}
      initialValues={{
        names: "",
        father_last_name: "",
        mother_last_name: "",
        state: "",
        major: "NINGUNO", // ignored at stakeholder's request
        city: "",
        college: "",
        position: "",
        degree: "",

        username: "",
        password: "",

        //FRONTEND ONLY:
        passwordConfirmation: "",
      }}
    >
      {({ values, errors, touched, setFieldError, handleChange }) => (
        <div style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
          <HeaderPage
            title="Regístrese"
            subtitle={
              "Le agradecemos su paciencia. Antes de acceder a la colección, le pedimos que ingrese algunos datos personales a continuación. Todos los campos son necesarios."
            }
          ></HeaderPage>

          <Form
            className="flex-col page-padding"
            autoComplete="off"
            style={{
              flexGrow: 1,
            }}
          >
            <br />
            <br />
            <Card className={"flex-col gap-2rem"}>
              <div className="form-section flex-col gap-2rem">
                <h2>Datos personales</h2>
                <TextField
                  isFormik
                  name="names"
                  value={values.names}
                  onChange={handleChange}
                  hasError={errors.names && touched.names}
                  errorMessage={errors.names}
                  label={"Nombre(s)"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="father_last_name"
                  value={values.father_last_name}
                  onChange={handleChange}
                  hasError={errors.father_last_name && touched.father_last_name}
                  errorMessage={errors.father_last_name}
                  label={"Apellido paterno"}
                  maxLength={50}
                ></TextField>
                <TextField
                  isFormik
                  name="mother_last_name"
                  value={values.mother_last_name}
                  onChange={handleChange}
                  hasError={errors.mother_last_name && touched.mother_last_name}
                  errorMessage={errors.mother_last_name}
                  label={"Apellido materno"}
                  maxLength={50}
                ></TextField>
                <TextField
                  isFormik
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  hasError={errors.state && touched.state}
                  errorMessage={errors.state}
                  label={"Estado"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  hasError={errors.city && touched.city}
                  errorMessage={errors.city}
                  label={"Ciudad"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="college"
                  value={values.college}
                  onChange={handleChange}
                  hasError={errors.college && touched.college}
                  errorMessage={errors.college}
                  label={"Universidad"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  hasError={errors.position && touched.position}
                  errorMessage={errors.position}
                  label={"Posición / puesto"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="degree"
                  value={values.degree}
                  onChange={handleChange}
                  hasError={errors.degree && touched.degree}
                  errorMessage={errors.degree}
                  label={"Licenciatura"}
                  maxLength={100}
                ></TextField>
              </div>

              <div className="form-section flex-col gap-2rem">
                <h2>Datos de acceso</h2>
                <TextField
                  isFormik
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  hasError={errors.username && touched.username}
                  errorMessage={errors.username}
                  label={"Nombre de usuario"}
                  maxLength={50}
                ></TextField>

                <PasswordValidator
                  name="password"
                  password={values.password}
                  passwordConfirmation={values.passwordConfirmation}
                  onChange={handleChange}
                  passwordHasError={errors.password && touched.password}
                  passwordConfirmationHasError={
                    errors.passwordConfirmation && touched.passwordConfirmation
                  }
                  setFieldError={setFieldError}
                  passwordConfirmationErrorMessage={errors.passwordConfirmation}
                  passwordErrorMessage={errors.password}
                ></PasswordValidator>
              </div>

              <div className="button-row">
                <Button type="submit" iconType="send">
                  Enviar solicitud
                </Button>
              </div>
            </Card>
          </Form>
          <Footer></Footer>
        </div>
      )}
    </Formik>
  );
}
