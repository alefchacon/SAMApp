import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";
import Card from "../../../components/ui/Card.jsx";

import HeaderPage from "../../../components/ui/HeaderPage";

import useAccessRequests from "../../../features/access/businessLogic/useAccessRequests.jsx";

export default function AccessRequestForm() {
  const [addAccessRequest] = useAccessRequests();

  const handleSubmit = async (values, actions) => {
    console.log(values);
    const response = await addAccessRequest(values);
    console.log(response);
    //console.log(actions);
  };

  return (
    <Formik
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
        <div>
          <HeaderPage
            title="Solicitar acceso a la colección"
            subtitle={
              "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario y nos pondremos en contacto con usted. Todos los campos son obligatorios."
            }
          ></HeaderPage>

          <Form
            className="flex-col page-padding"
            autoComplete="off"
            style={{
              justifyContent: "start",
              alignItems: "start",
              height: "fit-content",
            }}
          >
            <br />
            <br />
            <Card>
              <div className="form-section flex-col gap-2rem">
                <TextField
                  name="orcid"
                  value={values.orcid}
                  onChange={handleChange}
                  label={"ORCID"}
                  helperText={
                    "Ingrese los 19 caracteres de su ORCID, incluyendo los guiones siguiendo el formato: 0000-0000-0000-0000"
                  }
                  iconType={<ORCIDIcon />}
                  maxWidth={230}
                  maxLength={19}
                ></TextField>

                <div>
                  <p style={{ fontWeight: 600, margin: 0, padding: 0 }}>
                    ¿Cuál es la naturaleza de su investigación?
                  </p>
                  <textarea
                    value={values.about}
                    onChange={handleChange}
                    name="about"
                    id="about"
                    className="input"
                    style={{ minHeight: 100, margin: 0, padding: 0 }}
                  ></textarea>
                </div>

                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label={"E-mail"}
                ></TextField>
              </div>

              <div className="button-row">
                <Button type="submit" iconType="send">
                  Enviar solicitud
                </Button>
              </div>
            </Card>
          </Form>
        </div>
      )}
    </Formik>
  );
}
