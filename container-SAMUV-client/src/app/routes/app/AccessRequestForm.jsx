import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";
import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea.jsx";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import useAccessRequests from "../../../features/accessRequests/businessLogic/useAccessRequests.jsx";
import { Link } from "react-router-dom";
import PasswordValidator from "../../../features/auth/components/PasswordValidator.jsx";
import { academicSchema } from "../../../features/accessRequests/formikSchemas/accessRequestSchema.js";
import ROUTES from "../../../routing/frontendRoutes.js";
import { useNavigate } from "react-router-dom";
import HttpStatus from "../../../stores/httpStatus.js";
import Page from "../../../components/ui/Page.jsx";
import AccessRequest from "../../../features/accessRequests/domain/accessRequest.js";
export default function AccessRequestForm() {
  const {
    addAccessRequest,
  } = useAccessRequests();

  const navigate = useNavigate();

  const { showModal, closeModal } = useModal();

  const handleSubmit = async (values, actions) => {
    const response = await addAccessRequest(values);
    if (response?.status === HttpStatus.CREATED) {
      handleShowModal(values);
      actions.resetForm();
    }
  };

  const handleShowModal = (values) => {
    showModal(
      "Solicitud enviada",
      <div>
        <p>
          Su solicitud será revisada por la administración de la biocolección.
          Recibirá una respuesta a su correo, <b>{values.email}</b>, confirmando
          su acceso.
        </p>
        <div className="button-row">
          <Link to={ROUTES.COLLECTION}>
            <Button onClick={goToColection} iconType="pets">
              Regresar a la colección
            </Button>
          </Link>
        </div>
      </div>
    );
  };

  const goToColection = () => {
    closeModal();
    navigate(ROUTES.COLLECTION);
  };

  return (
    <Page
      title={"Solicitar acceso"}
      subtitle={
        "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario y nos pondremos en contacto con usted. Todos los campos son obligatorios."
      }
    >
    <Formik
      validationSchema={academicSchema}
      onSubmit={handleSubmit}
      initialValues={new AccessRequest()}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
      }) => (

          <Form
            className="flex-col flex-grow-1"
            autoComplete="off"
          >
              <div className="input-group flex-col gap-2rem">
                <h2>Sobre su investigación</h2>
                <TextField
                  isFormik
                  name="orcid"
                  value={values.orcid}
                  onChange={handleChange}
                  hasError={errors.orcid && touched.orcid}
                  errorMessage={errors.orcid}
                  label={"ORCID"}
                  helperText={
                    "Ingrese los 19 caracteres de su ORCID, incluyendo los guiones siguiendo el formato: 0000-0000-0000-0000"
                  }
                  iconType={<ORCIDIcon />}
                  maxWidth={230}
                  maxLength={19}
                ></TextField>

                <TextArea
                  name="about"
                  label={"¿Cuál es la naturaleza de su investigación?"}
                  id="about"
                  value={values.about}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  hasError={errors.about && touched.about}
                  errorMessage={errors.about}
                  className="input"
                  maxLength={500}
                ></TextArea>

                <TextField
                  isFormik
                  name="academic.user.email"
                  value={values.academic?.user?.email}
                  onChange={handleChange}
                  hasError={errors.academic?.user?.email && touched.academic?.user?.email}
                  errorMessage={errors.academic?.user?.email}
                  label={"E-mail"}
                  maxLength={100}
                ></TextField>
              </div>

              <div className="input-group flex-col gap-2rem">
                <h2>Sobre usted</h2>

                <TextField
                  isFormik
                  name="academic.names"
                  value={values.academic?.names}
                  onChange={handleChange}
                  hasError={errors.academic?.names && touched.academic?.names}
                  errorMessage={errors.academic?.names}
                  label={"Nombre(s)"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.father_last_name"
                  value={values.academic?.father_last_name}
                  onChange={handleChange}
                  hasError={errors.academic?.father_last_name && touched.academic?.father_last_name}
                  errorMessage={errors.academic?.father_last_name}
                  label={"Apellido paterno"}
                  maxLength={50}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.mother_last_name"
                  value={values.academic?.mother_last_name}
                  onChange={handleChange}
                  hasError={errors.academic?.mother_last_name && touched.academic?.mother_last_name}
                  errorMessage={errors.academic?.mother_last_name}
                  label={"Apellido materno"}
                  maxLength={50}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.state"
                  value={values.academic?.state}
                  onChange={handleChange}
                  hasError={errors.academic?.state && touched.academic?.state}
                  errorMessage={errors.academic?.state}
                  label={"Estado"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.city"
                  value={values.academic?.city}
                  onChange={handleChange}
                  hasError={errors.academic?.city && touched.academic?.city}
                  errorMessage={errors.academic?.city}
                  label={"Ciudad"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.college"
                  value={values.academic?.college}
                  onChange={handleChange}
                  hasError={errors.academic?.college && touched.academic?.college}
                  errorMessage={errors.academic?.college}
                  label={"Universidad"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.position"
                  value={values.academic?.position}
                  onChange={handleChange}
                  hasError={errors.academic?.position && touched.academic?.position}
                  errorMessage={errors.academic?.position}
                  label={"Posición / puesto"}
                  maxLength={100}
                ></TextField>
                <TextField
                  isFormik
                  name="academic.degree"
                  value={values.academic?.degree}
                  onChange={handleChange}
                  hasError={errors.academic?.degree && touched.academic?.degree}
                  errorMessage={errors.academic?.degree}
                  label={"Grado académico"}
                  maxLength={100}
                ></TextField>
              </div>

              <div className="input-group flex-col gap-2rem">
                <div>
                  <h2>Credenciales</h2>
                  <p>
                    Si su solicitud es aprobada, utilizará esta información para
                    iniciar sesión.
                  </p>
                </div>
                <TextField
                  isFormik
                  name="academic.user.username"
                  value={values.academic?.user?.username}
                  onChange={handleChange}
                  hasError={errors.academic?.user?.username && touched.academic?.user?.username}
                  errorMessage={errors.user?.username}
                  label={"Nombre de usuario"}
                  maxLength={50}
                ></TextField>

                <PasswordValidator
                  name="academic.user.password"
                  passwordConfirmationName="academic.user.passwordConfirmation"
                  password={values.academic?.user?.password}
                  passwordConfirmation={values.academic?.user?.passwordConfirmation}
                  onChange={handleChange}
                  passwordHasError={errors.academic?.user?.password && touched.academic?.user?.password}
                  passwordConfirmationHasError={
                    errors.academic?.user?.passwordConfirmation && touched.academic?.user?.passwordConfirmation
                  }
                  passwordConfirmationErrorMessage={errors.academic?.user?.passwordConfirmation}
                  passwordErrorMessage={errors.academic?.user?.password}
                ></PasswordValidator>
              </div>

              <div className="button-row">
                <Button iconType="send" type="submit">
                  Enviar solicitud
                </Button>

              </div>
          </Form>
      )}
    </Formik>
    </Page>
  );
}
