import TextField from "../../../components/ui/TextField";
import RadioList from "../../../components/ui/RadioList";
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
  onBlur,
}) {
  return (
    <Form className="form-section flex-col gap-2rem input-group">
      <RadioList
        required
        onBlur={onBlur}
        label="Sexo"
        options={[
          { label: "Macho", value: "M" },
          { label: "Hembra", value: "H" },
          { label: "No identificado", value: "N" },
        ]}
        name="sex"
        onChange={handleChange}
        errorMessage={errors.sex}
        maxWidth={inputWidth}
        hasError={errors.sex && touched.sex}
      />
      <RadioList
        required
        onBlur={onBlur}
        label="Edad"
        options={[
          { label: "Juvenil", value: "Juvenil" },
          { label: "Adulto", value: "Adulto" },
          { label: "Subadulto", value: "Subadulto" },
          { label: "Lactante", value: "Lactante" },
          { label: "No definido", value: "No definido" },
        ]}
        name="class_age"
        onChange={handleChange}
        errorMessage={errors.class_age}
        maxWidth={inputWidth}
        hasError={errors.class_age && touched.class_age}
      />
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
    </Form>
  );
}
