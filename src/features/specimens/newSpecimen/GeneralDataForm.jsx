import TextField from "../../../components/ui/TextField";
import TextArea from "../../../components/ui/TextArea";
import RadioList from "../../../components/ui/RadioList";
import HeaderPage from "../../../components/ui/HeaderPage";
import moment from "moment";
import { specimenSchema } from "../formikSchemas/specimenSchema";
import Autocomplete from "../../../components/ui/Autocomplete";

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
    </Form>
  );
}
