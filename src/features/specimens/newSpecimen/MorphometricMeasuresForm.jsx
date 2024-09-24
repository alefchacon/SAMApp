import TextField from "../../../components/ui/TextField";
import { Form } from "formik";

export default function MorphometricMeasuresForm({
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
        label={"Largo total"}
        type="number"
        name="length_total"
        value={values.length_total}
        onChange={handleChange}
        hasError={Boolean(errors.length_total)}
        errorMessage={errors.length_total}
        maxWidth={inputWidth}
        step={0.001}
        min={0}
        max={99.999}
      ></TextField>
      <TextField
        label={"Largo de la oreja"}
        type="number"
        name="length_ear"
        value={values.length_ear}
        onChange={handleChange}
        hasError={Boolean(errors.length_ear)}
        errorMessage={errors.length_ear}
        maxWidth={inputWidth}
        step={0.001}
        min={0}
        max={99.999}
      ></TextField>
      <TextField
        label={"Largo de la pata"}
        type="number"
        name="length_paw"
        value={values.length_paw}
        onChange={handleChange}
        hasError={Boolean(errors.length_paw)}
        errorMessage={errors.length_paw}
        maxWidth={inputWidth}
        step={0.001}
        min={0}
        max={99.999}
      ></TextField>
      <TextField
        label={"Largo de la cola"}
        type="number"
        name="length_tail"
        value={values.length_tail}
        onChange={handleChange}
        hasError={Boolean(errors.length_tail)}
        errorMessage={errors.length_tail}
        maxWidth={inputWidth}
        step={0.001}
        min={0}
        max={99.999}
      ></TextField>
      <TextField
        label={"Peso"}
        type="number"
        name="weight"
        value={values.weight}
        onChange={handleChange}
        hasError={Boolean(errors.weight)}
        errorMessage={errors.weight}
        maxWidth={inputWidth}
        step={0.001}
        min={0}
        max={99.999}
      ></TextField>
    </Form>
  );
}
