import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import { ORCIDIcon } from "../../../components/ui/ORCIDIcon";
import { Formik, Form } from "formik";

import HeaderPage from "../../../components/ui/HeaderPage";

import useAccessRequests from "../../../features/access/dataAccess/useAccessRequests,jsx";

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
        names: "",
        father_last_name: "",
        mother_last_name: "",
        state: "",

        major: "",
        city: "",

        college: "",
        position: "",

        degree: "",

        username: "",
        email: "",
        password: "",
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
              "Si desea consultar información más detallada de la colección mastozoológica del Instituto de Investigaciónes Biológicas de la Universidad Veracruzana, por favor llene el siguiente formulario ynos pondremos en contacto con usted. Todos los campos son obligatorios."
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
            <div
              className="bg-white p-2rem rounded-20 flex-col gap-2rem"
              style={{ flex: 2, alignSelf: "center", width: "100%" }}
            >
              <div className="form-section flex-col gap-2rem">
                <h2>Sobre su investigación</h2>
                <p>
                  En caso de aprobar su solicitud, usted usará estos datos para
                  iniciar sesión.
                </p>

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
              </div>
              <div className="form-section flex-col gap-2rem">
                <h2>Sobre usted</h2>

                <TextField
                  name="names"
                  value={values.names}
                  onChange={handleChange}
                  label={"Nombre(s)"}
                ></TextField>
                <TextField
                  name="father_last_name"
                  value={values.father_last_name}
                  onChange={handleChange}
                  label={"Apellido paterno"}
                ></TextField>
                <TextField
                  name="mother_last_name"
                  value={values.mother_last_name}
                  onChange={handleChange}
                  label={"Apellido materno"}
                ></TextField>
                <TextField
                  name="major"
                  value={values.major}
                  onChange={handleChange}
                  label={"Grado académico"}
                ></TextField>
                <TextField
                  name="degree"
                  value={values.degree}
                  onChange={handleChange}
                  label={"Licenciatura"}
                ></TextField>
                <TextField
                  name="college"
                  value={values.college}
                  onChange={handleChange}
                  label={"Universidad o institución a la que pertenece"}
                ></TextField>
                <TextField
                  name="position"
                  value={values.position}
                  onChange={handleChange}
                  label={"Puesto o cargo"}
                ></TextField>
                <TextField
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  label={"Estado"}
                ></TextField>
                <TextField
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  label={"Ciudad"}
                ></TextField>
              </div>
              <div className="form-section flex-col gap-2rem">
                <h2>Datos de inicio de sesión</h2>
                <p>
                  En caso de aprobar su solicitud, usted usará estos datos para
                  iniciar sesión.
                </p>

                <TextField
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  label={"Nombre de usuario"}
                ></TextField>
                <TextField
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  label={"E-mail"}
                ></TextField>
                <TextField
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  label={"Contraseña"}
                ></TextField>

                <div className="button-row">
                  <Button type="submit" iconType="send">
                    Enviar solicitud
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
