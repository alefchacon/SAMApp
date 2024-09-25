import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea";
import RadioList from "../../../components/ui/RadioList";
import HeaderPage from "../../../components/ui/HeaderPage";
import moment from "moment";
import { specimenSchema } from "../formikSchemas/specimenSchema";

import { Formik, Form, Field } from "formik";

export default function GeneralDataForm({
  children,
  initialValues,
  handleChange,
  errors = [],
  values,
  touched,
  setFieldValue,
  inputWidth = "",
}) {
  return (
    <Form className="form-section flex-col gap-2rem input-group">
      <TextField
        label={"Número de preparación"}
        isFormik
        name="colection_code"
        value={values.colection_code}
        onChange={handleChange}
        hasError={Boolean(errors.colection_code)}
        errorMessage={errors.colection_code}
        maxWidth={inputWidth}
      ></TextField>
      <TextField
        isFormik
        name="catalog_id"
        value={values.catalog_id}
        onChange={handleChange}
        hasError={Boolean(errors.catalog_id)}
        errorMessage={errors.catalog_id}
        label={"ID del catálogo"}
        maxWidth={inputWidth}
        maxLength={20}
      ></TextField>
      <TextField
        isFormik
        name="class_age"
        value={values.class_age}
        onChange={handleChange}
        hasError={Boolean(errors.class_age)}
        errorMessage={errors.class_age}
        label={"Edad"}
        maxWidth={inputWidth}
        maxLength={50}
      ></TextField>
      <TextField
        isFormik
        name="colection_date"
        label={"Fecha de la colecta"}
        helperText={
          "La fecha se reflejará con el formato YYYY-MM-DD en la base de datos."
        }
        value={values.colection_date}
        onChange={handleChange}
        hasError={Boolean(errors.colection_date)}
        errorMessage={errors.colection_date}
        type="date"
        maxWidth={inputWidth}
        max={moment().format("YYYY-MM-DD")}
      ></TextField>
      <TextField
        isFormik
        label={"Hora de la colecta"}
        helperText={
          "La hora se reflejará con un formato de 24 horas en la base de datos."
        }
        maxWidth={inputWidth}
        type="time"
        name="hour"
        value={values.hour}
        onChange={handleChange}
        hasError={Boolean(errors.hour)}
        errorMessage={errors.hour}
        step={60}
        min="00:00"
        max="23:59"
      ></TextField>

      <RadioList
        label="Estado"
        options={[
          { label: "Publicado", value: true },
          { label: "Dañado", value: false },
        ]}
        name="status"
        onChange={handleChange}
        errorMessage={errors.status}
        hasError={errors.status && touched.status}
        maxWidth={inputWidth}
      />
      <RadioList
        label="Sexo"
        options={[
          { label: "Macho", value: "M" },
          { label: "Hembra", value: "H" },
        ]}
        name="sex"
        onChange={handleChange}
        errorMessage={errors.sex}
        maxWidth={inputWidth}
        hasError={errors.sex && touched.sex}
      />

      <TextField
        label={"Número de embriones"}
        type="number"
        isFormik
        name="number_embryos"
        value={values.number_embryos}
        onChange={handleChange}
        hasError={errors.number_embryos && touched.number_embryos}
        errorMessage={errors.number_embryos}
        min={0}
        maxWidth={inputWidth}
      ></TextField>
      <TextArea
        label={"Observaciones"}
        maxLength={200}
        isFormik
        name="comment"
        value={values.comment}
        onChange={handleChange}
        hasError={errors.comment && touched.comment}
        errorMessage={errors.comment}
      ></TextArea>
    </Form>
  );
}
