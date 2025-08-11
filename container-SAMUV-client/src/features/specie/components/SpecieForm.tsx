// LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";

// CUSTOM COMPONENTS
import { Button } from "@/components/ui/button";
import Autocomplete from "../../../components/ui/Autocomplete";
import FormInput from "@/components/ui/FormInput";
// VALIDATION SCHEMAS
import { specieSchema } from "../formikSchemas/specieSchema";

import { useSpecie } from "../businessLogic/useSpecie";
import { defaultSpecie, ISpecie, Specie } from "../domain/Specie";
import { ITaxonomyRanks } from "../domain/ITaxonomyRanks";
import CreatableSelect from "react-select/creatable";
import { Plus } from "lucide-react";

interface ISpecieFormProps {
  onSubmit: (values: Specie) => void;
  specie?: Specie;
  isUpdate?: boolean;
}
export default function SpecieForm(props: ISpecieFormProps) {
  const { onSubmit, specie = defaultSpecie, isUpdate = false } = props;

  const submitSpecie = async (values: any, actions: any) => {
    await onSubmit(values);
    actions.resetForm();
    fetchTaxonomyRanks();
  };

  const { getTaxonomyRanks } = useSpecie();

  const [isReady, setIsReady] = useState(false);

  const [ranks, setRanks] = useState<ITaxonomyRanks>({
    orden: [],
    family: [],
    gender: [],
    specie_specie: [],
    subspecie: [],
  });

  const fetchTaxonomyRanks = () => {
    getTaxonomyRanks().then((response) => {
      if (!response.apiResponse) {
        return;
      }
      const { data } = response.apiResponse;

      setRanks({
        orden:
          data.orden?.map((orden) => ({ value: orden, label: orden })) ?? [],
        family:
          data.family?.map((family) => ({ value: family, label: family })) ??
          [],
        gender:
          data.gender?.map((gender) => ({ value: gender, label: gender })) ??
          [],
        specie_specie:
          data.specie_specie?.map((specie_specie) => ({
            value: specie_specie,
            label: specie_specie,
          })) ?? [],
        subspecie:
          data.subspecie?.map((subspecie) => ({
            value: subspecie,
            label: subspecie,
          })) ?? [],
      });
    });
  };

  useEffect(() => {
    fetchTaxonomyRanks();
    setIsReady(true);
  }, []);

  return (
    <Formik
      validationSchema={specieSchema}
      initialValues={specie}
      onSubmit={submitSpecie}
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        setFieldValue,
        handleChange,
        handleBlur,
      }) => (
        <Form className="input-group" action="" autoComplete="off">
          <FormInput
            label="Orden"
            required
            name="orden"
            errorMessage={errors.orden}
            hasError={Boolean(errors.orden && touched.orden)}
          >
            <CreatableSelect
              id="orden"
              options={ranks.orden}
              onBlur={handleBlur}
              value={{ label: values.orden, value: values.orden }}
              onChange={(e) => setFieldValue("orden", e?.value)}
              isClearable
            />
          </FormInput>
          <FormInput
            label="Familia"
            required
            name="family"
            errorMessage={errors.family}
            hasError={Boolean(errors.family && touched.family)}
          >
            <CreatableSelect
              id="family"
              options={ranks.family}
              onBlur={handleBlur}
              value={{ label: values.family, value: values.family }}
              onChange={(e) => setFieldValue("family", e?.value)}
              isClearable
            />
          </FormInput>
          <FormInput
            label="Género"
            required
            name="gender"
            errorMessage={errors.gender}
            hasError={Boolean(errors.gender && touched.gender)}
          >
            <CreatableSelect
              id="gender"
              options={ranks.gender}
              onBlur={handleBlur}
              value={{ label: values.gender, value: values.gender }}
              onChange={(e) => setFieldValue("gender", e?.value)}
              isClearable
            />
          </FormInput>
          <FormInput
            label="Especie"
            required
            name="specie_specie"
            errorMessage={errors.specie_specie}
            hasError={Boolean(errors.specie_specie && touched.specie_specie)}
          >
            <CreatableSelect
              id="specie_specie"
              options={ranks.specie_specie}
              onBlur={handleBlur}
              value={{
                label: values.specie_specie,
                value: values.specie_specie,
              }}
              onChange={(e) => setFieldValue("specie_specie", e?.value)}
              isClearable
            />
          </FormInput>
          <FormInput
            label="Subespecie"
            required
            name="subspecie"
            errorMessage={errors.subspecie}
            hasError={Boolean(errors.subspecie && touched.subspecie)}
          >
            <CreatableSelect
              id="subspecie"
              options={ranks.subspecie}
              onBlur={handleBlur}
              value={{
                label: values.subspecie,
                value: values.subspecie,
              }}
              onChange={(e) => setFieldValue("subspecie", e?.value)}
              isClearable
            />
          </FormInput>

          <div className="button-row">
            <Button onClick={(e) => console.error(values)}>
              <Plus /> Agregar especie
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
