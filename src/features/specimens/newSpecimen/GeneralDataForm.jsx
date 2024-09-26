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
  onBlur,
}) {
  return (
    <Form className="form-section flex-col gap-2rem input-group">
      <TextField
        label={"Número de preparación"}
        required
        isFormik
        name="colection_code"
        value={values.colection_code}
        onChange={handleChange}
        hasError={errors.colection_code && touched.colection_code}
        errorMessage={errors.colection_code}
        maxWidth={inputWidth}
        onBlur={onBlur}
        maxLength={20}
      ></TextField>
      <TextField
        onBlur={onBlur}
        required
        isFormik
        name="catalog_id"
        value={values.catalog_id}
        onChange={handleChange}
        hasError={Boolean(errors.catalog_id && touched.catalog_id)}
        errorMessage={errors.catalog_id}
        label={"ID del catálogo"}
        maxWidth={inputWidth}
        maxLength={20}
      ></TextField>
      <TextField
        onBlur={onBlur}
        isFormik
        name="class_age"
        value={values.class_age}
        onChange={handleChange}
        hasError={Boolean(errors.class_age && touched.class_age)}
        errorMessage={errors.class_age}
        label={"Edad"}
        maxWidth={inputWidth}
        maxLength={50}
      ></TextField>

      <RadioList
        required
        onBlur={onBlur}
        label="Estado"
        options={[
          { label: "Publicado", value: true },
          { label: "Dañado", value: false },
        ]}
        name="status"
        onChange={handleChange}
        errorMessage={errors.status}
        hasError={Boolean(errors.status && touched.status)}
        maxWidth={inputWidth}
      />
      <RadioList
        required
        onBlur={onBlur}
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
        onBlur={onBlur}
        label={"Número de embriones"}
        type="number"
        isFormik
        name="number_embryos"
        value={values.number_embryos}
        onChange={handleChange}
        hasError={Boolean(errors.number_embryos && touched.number_embryos)}
        errorMessage={errors.number_embryos}
        min={0}
        maxWidth={inputWidth}
        defaultValue={0}
      ></TextField>
      <TextArea
        onBlur={onBlur}
        label={"Observaciones"}
        maxLength={200}
        isFormik
        name="comment"
        value={values.comment}
        onChange={handleChange}
        hasError={Boolean(errors.comment && touched.comment)}
        errorMessage={errors.comment}
      ></TextArea>
    </Form>
  );
}
