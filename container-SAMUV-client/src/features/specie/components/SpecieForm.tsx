// LIBRARIES
import React, { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";

// CUSTOM COMPONENTS
import Button from "../../../components/ui/Button";
// import Autocomplete from "../../../components/ui/Autocomplete";

// VALIDATION SCHEMAS
import { specieSchema } from "../formikSchemas/specieSchema";

import { useSpecie } from "../businessLogic/useSpecie";
import { defaultSpecie, ISpecie, Specie } from "../domain/Specie";
import { ITaxonomyRanks } from "../domain/ITaxonomyRanks";

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
    fetchTaxonomyWanks();
  };

  const { getTaxonomyRanks } = useSpecie();

  const [isReady, setIsReady] = useState(false);

  const [ranks, setRanks] = useState<ITaxonomyRanks>({
    ordens: [],
    families: [],
    genders: [],
    species_specie: [],
    subspecies: [],
  });

  const fetchTaxonomyWanks = () => {
    getTaxonomyRanks().then((response) => {
      if (response.data) {
        setRanks(response.data);
      }
    });
  };

  useEffect(() => {
    fetchTaxonomyWanks();
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
          {/*
          <Autocomplete
            required
            id="orden"
            name="orden"
            items={ranks?.ordens}
            label="Orden"
            errorMessage={errors.orden}
            hasError={errors.orden && touched.orden}
            value={values.orden}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Autocomplete>
          <Autocomplete
            required
            id="family"
            name="family"
            items={ranks?.families}
            label="Familia"
            errorMessage={errors.family}
            hasError={errors.family && touched.family}
            value={values.family}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            ></Autocomplete>

          <Autocomplete
            id="gender"
            name="gender"
            label="Género"
            required
            items={ranks?.genders}
            value={values.gender}
            hasError={errors.gender && touched.gender}
            errorMessage={errors.gender}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
          ></Autocomplete>
          <Autocomplete
            id="specie_specie"
            name="specie_specie"
            label="Especie"
            required
            items={ranks?.species_specie}
            value={values.specie_specie}
            hasError={errors.specie_specie && touched.specie_specie}
            errorMessage={errors.specie_specie}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            ></Autocomplete>
          <Autocomplete
            id="subspecie"
            required
            name="subspecie"
            label="Sub especie"
            items={ranks?.subspecies}
            value={values.subspecie}
            hasError={errors.subspecie && touched.subspecie}
            errorMessage={errors.subspecie}
            setFieldValue={setFieldValue}
            onChange={handleChange}
            onBlur={handleBlur}
            ></Autocomplete>
            */}

          <div className="flex-row justify-content-right ptop-2rem">
            <button type="submit">
              {isUpdate ? "Editar" : "Agregar"} especie
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
