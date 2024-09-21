import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";
import Card from "../../../components/ui/Card.jsx";
import Footer from "../../../components/ui/Footer.jsx";
import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea.jsx";
import HeaderPage from "../../../components/ui/HeaderPage";
import { useModal } from "../../../components/contexts/ModalContext.jsx";
import useAccessRequests from "../../../features/access/businessLogic/useAccessRequests.jsx";
import { accessRequestSchema } from "../../../features/access/formikSchemas/accessRequestSchema.js";
import { Link } from "react-router-dom";

export default function AccessRequestForm() {
  const [
    pendingAccessRequests,
    getPendingAccessRequests,
    pendingAccessRequestCount,
    getPendingAccessRequestCount,
    approveAccessRequest,
    rejectAccessRequest,
    addAccessRequest,
  ] = useAccessRequests();

  const { showModal, closeModal } = useModal();

  const handleSubmit = async (values, actions) => {
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
  };

  return (
    <Formik
      validationSchema={accessRequestSchema}
      onSubmit={handleSubmit}
      initialValues={{
        orcid: "",
        about: "",
        email: "",
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
        <div className="flex-col">
          <HeaderPage
            title="Solicitar acceso a la colección"
            subtitle={
              "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario y nos pondremos en contacto con usted. Todos los campos son obligatorios."
            }
          ></HeaderPage>

          <Form
            className="flex-col page-padding flex-grow-1"
            autoComplete="off"
          >
            <br />
            <br />
            <Card>
              <div className="form-section flex-col gap-2rem">
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
