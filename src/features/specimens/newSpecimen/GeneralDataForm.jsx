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

      <Autocomplete
        id="class_age"
        required
        name="class_age"
        label={"Edad"}
        items={["Juvenil", "Adulto", "Subadulto", "Lactante"]}
        value={values.class_age}
        hasError={errors.class_age && touched.class_age}
        errorMessage={errors.class_age}
        setFieldValue={setFieldValue}
        onChange={handleChange}
        onBlur={onBlur}
      ></Autocomplete>

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
        label="Naturaleza del ejemplar"
        options={[
          { label: "PC (Piel y craneo)", value: "PC" },
          { label: "E/A (En alcohol)", value: "E/A" },
          { label: "SE (Solo esqueleto)", value: "SE" },
          { label: "EP (Equeleto postcraneal)", value: "EP" },
          { label: "PE (Piel y equeleto)", value: "PE" },
          { label: "CE (Craneo, esqueleto y piel)", value: "CE" },
          { label: "CA (Craneo y piel en alcohol)", value: "CA" },
          { label: "SC (Sólo craneo)", value: "SC" },
          { label: "SP (Sólo piel)", value: "SP" },
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
