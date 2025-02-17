import TextField from "../../../components/ui/TextField";
import RadioList from "../../../components/ui/RadioList";
import REPRODUCTIVE_STATUS from "../../../stores/reproductiveStatus";
import { useFormikContext } from "formik";
export default function MorphometricMeasuresForm({
  inputWidth = "",
}) {
  const { values, errors, touched, onBlur, handleChange } = useFormikContext();

  return (
    <div className="flex-col gap-2rem">
      <div className="input-group">
        <RadioList
          value={values?.sex}
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
          hasError={errors.sex && touched.sex}
        />
        <RadioList
          value={values?.reproductive_status}
          required
          onBlur={onBlur}
          label="Estado reproductivo"
          options={[
            { label: "Activo", value: REPRODUCTIVE_STATUS.ACTIVE },
            { label: "inactivo", value: REPRODUCTIVE_STATUS.INACTIVE },
            { label: "Lactante", value: REPRODUCTIVE_STATUS.LACTANT },
            { label: "Postlactante", value: REPRODUCTIVE_STATUS.POSTLACTANT },
            { label: "TE (Testículos escrotados)", value: REPRODUCTIVE_STATUS.TE },
            { label: "No identificado", value: "ND" },
          ]}
          name="reproductive_status"
          onChange={handleChange}
          errorMessage={errors.reproductive_status}
          hasError={errors.reproductive_status && touched.reproductive_status}
        />
        <RadioList
          required
          value={values?.class_age}
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
          hasError={errors.class_age && touched.class_age}
        />
      </div>

      <div className="input-group">
        <TextField
          label={"Largo total"}
          type="number"
          name="length_total"
          id="length_total"
          value={values?.length_total}
          defaultValue={values?.length_total}
          onChange={handleChange}
          hasError={Boolean(errors.length_total)}
          errorMessage={errors.length_total}
          maxWidth={inputWidth}
          step={0.001}
          min={0}
          max={99.999}
          isFormik
        ></TextField>
        <TextField
          isFormik
          label={"Largo de la cola"}
          type="number"
          name="length_tail"
          value={values?.length_tail}
          onChange={handleChange}
          hasError={Boolean(errors.length_tail)}
          errorMessage={errors.length_tail}
          maxWidth={inputWidth}
          step={0.001}
          min={0}
          max={99.999}
        ></TextField>
        <TextField
          isFormik
          label={"Largo de la pata"}
          type="number"
          name="length_paw"
          value={values?.length_paw}
          onChange={handleChange}
          hasError={Boolean(errors.length_paw)}
          errorMessage={errors.length_paw}
          maxWidth={inputWidth}
          step={0.001}
          min={0}
          max={99.999}
        ></TextField>
        <TextField
          isFormik
          label={"Largo de la oreja"}
          type="number"
          name="length_ear"
          value={values?.length_ear}
          onChange={handleChange}
          hasError={Boolean(errors.length_ear)}
          errorMessage={errors.length_ear}
          step={0.001}
          min={0}
          max={99.999}
        ></TextField>
        <TextField
          isFormik
          label={"Peso"}
          type="number"
          name="weight"
          value={values?.weight}
          onChange={handleChange}
          hasError={Boolean(errors.weight)}
          errorMessage={errors.weight}
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
          value={values?.number_embryos}
          onChange={handleChange}
          hasError={Boolean(errors.number_embryos && touched.number_embryos)}
          errorMessage={errors.number_embryos}
          min={0}
          defaultValue={0}
        ></TextField>
      </div>
    </div>
  );
}
