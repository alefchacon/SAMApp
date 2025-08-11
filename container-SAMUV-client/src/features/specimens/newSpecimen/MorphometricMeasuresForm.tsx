import React from "react";
import { EReproductiveStatus } from "../domain/enum/EReproductiveStatus";
import { useFormikContext } from "formik";
import { ISpecimen } from "../domain/model/Specimen";
import { ESex } from "../domain/enum/ESex";
import Select from "react-select";
import FormInput from "@/components/ui/FormInput";
import { Input } from "@/components/ui/input";

export default function MorphometricMeasuresForm({ inputWidth = "" }) {
  const { values, errors, touched, handleBlur, handleChange, setFieldValue } =
    useFormikContext<ISpecimen>();

  return (
    <div className="flex-col gap-2rem">
      <div className="input-group">
        <FormInput
          label="Sexo"
          name="sex"
          errorMessage={errors.sex}
          hasError={Boolean(errors.sex && touched.sex)}
          required
        >
          <Select
            value={{ label: values?.sex, value: values?.sex }}
            options={[
              { label: "Macho", value: ESex.MALE },
              { label: "Hembra", value: ESex.FEMALE },
              { label: "No identificado", value: ESex.ND },
            ]}
            onChange={(e) => setFieldValue("sex", e?.value)}
            onBlur={handleBlur}
          ></Select>
        </FormInput>
        <FormInput
          label="Estado reproductivo"
          name="reproductive_status"
          errorMessage={errors.reproductive_status}
          hasError={Boolean(
            errors.reproductive_status && touched.reproductive_status
          )}
          required
        >
          <Select
            value={{
              label: values?.reproductive_status,
              value: values?.reproductive_status,
            }}
            options={[
              { label: "Activo", value: EReproductiveStatus.ACTIVE },
              { label: "inactivo", value: EReproductiveStatus.INACTIVE },
              { label: "Lactante", value: EReproductiveStatus.LACTANT },
              { label: "Postlactante", value: EReproductiveStatus.POSTLACTANT },
              {
                label: "TE (Testículos escrotados)",
                value: EReproductiveStatus.TE,
              },
              { label: "No identificado", value: "ND" },
            ]}
            onChange={(e) => setFieldValue("reproductive_status", e?.value)}
            onBlur={handleBlur}
          ></Select>
        </FormInput>
        <FormInput
          label="Edad"
          name="class_age"
          errorMessage={errors.class_age}
          hasError={Boolean(errors.class_age && touched.class_age)}
          required
        >
          <Select
            value={{ label: values?.class_age, value: values?.class_age }}
            options={[
              { label: "Juvenil", value: "Juvenil" },
              { label: "Adulto", value: "Adulto" },
              { label: "Subadulto", value: "Subadulto" },
              { label: "Lactante", value: "Lactante" },
              { label: "No definido", value: "No definido" },
            ]}
            onChange={(e) => setFieldValue("class_age", e?.value)}
            onBlur={handleBlur}
          ></Select>
        </FormInput>
      </div>

      <div className="input-group">
        <FormInput
          label={"Largo total"}
          name="length_total"
          hasError={Boolean(errors.length_total)}
          errorMessage={errors.length_total}
        >
          <Input
            type="number"
            name="length_total"
            id="length_total"
            value={values?.length_total}
            defaultValue={values?.length_total}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label={"Largo de la cola"}
          name="length_tail"
          hasError={Boolean(errors.length_tail)}
          errorMessage={errors.length_tail}
        >
          <Input
            type="number"
            name="length_tail"
            id="length_tail"
            value={values?.length_tail}
            defaultValue={values?.length_tail}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label={"Largo de la pata"}
          name="length_paw"
          hasError={Boolean(errors.length_paw)}
          errorMessage={errors.length_paw}
        >
          <Input
            type="number"
            name="length_paw"
            id="length_paw"
            value={values?.length_paw}
            defaultValue={values?.length_paw}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label={"Largo de la oreja"}
          name="length_ear"
          hasError={Boolean(errors.length_ear)}
          errorMessage={errors.length_ear}
        >
          <Input
            type="number"
            name="length_ear"
            id="length_ear"
            value={values?.length_ear}
            defaultValue={values?.length_ear}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label={"Peso"}
          name="weight"
          hasError={Boolean(errors.weight)}
          errorMessage={errors.weight}
        >
          <Input
            type="number"
            name="weight"
            id="weight"
            value={values?.weight}
            defaultValue={values?.weight}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
        <FormInput
          label={"Número de embriones"}
          name="number_embryos"
          hasError={Boolean(errors.number_embryos)}
          errorMessage={errors.number_embryos}
        >
          <Input
            type="number"
            name="number_embryos"
            id="number_embryos"
            value={values?.number_embryos}
            defaultValue={values?.number_embryos}
            onChange={handleChange}
            step={0.001}
            min={0}
            max={99.999}
          ></Input>
        </FormInput>
      </div>
    </div>
  );
}
