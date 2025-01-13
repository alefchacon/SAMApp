import TextField from "../../../components/ui/TextField";
import Button from "../../../components/ui/Button";
import { Formik, Form } from "formik";
import { technicalPersonSchema } from "../formikSchemas/technicalPersonSchema";
import useUsers from "../businessLogic/useUsers";
export default function TehnicalPersonForm() {
  const {addTechnicalPerson} = useUsers();
  const handleSubmit = (values, actions) => {
    addTechnicalPerson(values).then(() => actions.resetForm());
  }

  return (
    <Formik
      onSubmit={handleSubmit}
      validationSchema={technicalPersonSchema}
      initialValues={{
        position: "",
        user: {
          first_name: "",
          last_name: "",
          email: "",
        }
        //Los campos faltantes se generan en el back: 
        //"username" sale del email, la cadena antes del @
        //"password" es una cadena random
        //"nomination" es la misma que position
        //"fullname" es una concatenación de first_name y last_name
      }}
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
      }) => (
        <Form className="input-group">
          <TextField
            required
            label={"Nombre(s)"}
            id="user.first_name"
            name="user.first_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.first_name}
            errorMessage={errors.first_name}
            hasError={errors.first_name && touched.first_name}
            maxLength={50}
            isFormik
          ></TextField>
          <TextField
            required
            label={"Apellido paterno"}
            id="user.last_name"
            name="user.last_name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.last_name}
            errorMessage={errors.last_name}
            hasError={errors.last_name && touched.last_name}
            maxLength={50}
            isFormik
          ></TextField>
          <TextField
            required
            label={"Puesto"}
            id="position"
            name="position"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.position}
            errorMessage={errors.position}
            hasError={errors.position && touched.position}
            maxLength={50}
            isFormik
          ></TextField>
          <br />

          <TextField
            required
            label={"Email"}
            maxLength={100}
            id="user.email"
            name="user.email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.user.email}
            errorMessage={errors.email}
            hasError={errors.email && touched.email}
            isFormik
            helperText="El sistema enviara un mensaje a la dirección que usted proporcione, incluyendo una contraseña provicional que permita al nuevo técnico iniciar sesión."
          ></TextField>

          <div className="button-row">
            <Button type="submit">Agregar técnico</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
