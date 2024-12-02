import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";
import Card from "../../../components/ui/Card.jsx";
import Footer from "../../../components/ui/Footer.jsx";
import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea.jsx";
import Header from "../../../components/ui/Header.jsx";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import useAccessRequests from "../../../features/access/businessLogic/useAccessRequests.jsx";
import { accessRequestSchema } from "../../../features/access/formikSchemas/accessRequestSchema.js";
import { Link } from "react-router-dom";
import PasswordValidator from "../../../features/auth/components/PasswordValidator.jsx";
import { academicSchema } from "../../../features/user/formikSchemas/academicSchema.js";
import ROUTES from "../../../stores/routes.js";
import { useNavigate } from "react-router-dom";
import HttpStatus from "../../../stores/httpStatus.js";
import flattenObject from "../../../utils/flattenObject.js";
export default function AccessRequestForm() {
  const {
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
  } = useAccessRequests();

  const navigate = useNavigate();

  const { showModal, closeModal } = useModal();

  const extractNestedKeys = (nestedObject, parentKey = "", keysArray = []) => {
    for (let key in nestedObject) {
      if (nestedObject.hasOwnProperty(key)) {
        const newKey = parentKey ? `${parentKey}.${key}` : key; // Create a dot-separated key

        keysArray.push(newKey); // Add the current key to the keys array

        if (
          typeof nestedObject[key] === "object" &&
          nestedObject[key] !== null
        ) {
          extractNestedKeys(nestedObject[key], newKey, keysArray); // Recursively call for nested objects
        }
      }
    }
    return keysArray;
  };

  const handleSubmit = async (values, actions) => {
    const response = await addAccessRequest(values);
    if (response.status === HttpStatus.CREATED) {
      handleShowModal(values);
    }
    actions.resetForm();
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
    <Formik
      validationSchema={academicSchema}
      onSubmit={handleSubmit}
      initialValues={{
        orcid: "",
        about: "",
        email: "",

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
        <div className="form flex-col w-100">
          <Header
            title="Solicitar acceso a la colección"
            subtitle={
              "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario y nos pondremos en contacto con usted. Todos los campos son obligatorios."
            }
          ></Header>

          <Form
            className="flex-col page-padding flex-grow-1"
            autoComplete="off"
          >
            <br />
            <br />
            <Card className={"flex-col gap-2rem p-2rem"}>
              <div className="form-section flex-col gap-2rem">
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
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  hasError={errors.email && touched.email}
                  errorMessage={errors.email}
                  label={"E-mail"}
                  maxLength={100}
                ></TextField>
              </div>
              <hr />
              <div className="form-section flex-col gap-2rem">
                <h2>Sobre usted</h2>

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
                  label={"Licenciatura, título o grado académico"}
                  maxLength={100}
                ></TextField>
              </div>
              <hr />
              <div className="form-section flex-col gap-2rem">
                <div>
                  <h2>Credenciales</h2>
                  <p>
                    Si su solicitud es aprobada, utilizará esta información para
                    iniciar sesión.
                  </p>
                </div>
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
                  passwordConfirmationErrorMessage={errors.passwordConfirmation}
                  passwordErrorMessage={errors.password}
                ></PasswordValidator>
              </div>

              <div className="button-row">
                <Button iconType="send" type="submit">
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
