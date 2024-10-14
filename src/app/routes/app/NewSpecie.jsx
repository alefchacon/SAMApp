// LIBRARIES
import { useState, useEffect, useRef } from "react";
import { Formik, Form, Field } from "formik";

// CUSTOM COMPONENTS
import SearchField from "../../../components/ui/SearchField";
import Button from "../../../components/ui/Button";
import AddIcon from "../../../components/icons/AddIcon";
import CloseIcon from "../../../components/icons/CloseIcon";
import Autocomplete from "../../../components/ui/Autocomplete";

// VALIDATION SCHEMAS
import { specieSchema } from "../../../features/specie/formikSchemas/specieSchema";

// API CALLS
import {
  mockGetSpecies,
  getOrdens,
  getFamilies,
  getGenders,
  getEpithets,
  getSubspecies,
} from "../../../features/specie/businessLogic/getSpecies";

export default function NewSpecie({
  onSubmit,
  specie = {
    orden: "",
    family: "",
    gender: "",
    specie_specie: "",
    subspecie: "",
  },
  open,
}) {
  const formikRef = useRef();
  const submitSpecie = async (values, actions) => {
    values.scientific_name = `${values.gender} ${values.epithet}`;
    await onSubmit(values);
    actions.resetForm();
  };

  const [ordens, setOrdens] = useState([]);
  const [families, setFamilies] = useState([]);
  const [genders, setGenders] = useState([]);
  const [epithets, setEpithets] = useState([]);
  const [subspecies, setSubspecies] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setOrdens(await getOrdens());

      setFamilies(await getFamilies());
      setGenders(await getGenders());
      setEpithets(await getEpithets());
      setSubspecies(await getSubspecies());
    }

    fetchData();

    setIsReady(true);
  }, []);

  return (
    <div className="fullwidth">
      {isReady && (
        <Formik
          validationSchema={specieSchema}
          initialValues={specie}
          onSubmit={submitSpecie}
          innerRef={formikRef}
          enableReinitialize
        >
          {({
            values,
            errors,
            touched,
            isValid,
            dirty,
            setFieldValue,
            handleChange,
            handleBlur,
          }) => (
            <Form className="input-group" action="" autoComplete="off">
              <Autocomplete
                required
                id="orden"
                name="orden"
                items={ordens}
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
                items={families}
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
                items={genders}
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
                items={epithets}
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
                items={subspecies}
                value={values.subspecie}
                hasError={errors.subspecie && touched.subspecie}
                errorMessage={errors.subspecie}
                setFieldValue={setFieldValue}
                onChange={handleChange}
                onBlur={handleBlur}
              ></Autocomplete>

              <div className="flex-row justify-content-right ptop-2rem">
                <Button
                  type="submit"
                  label="Agregar especie"
                  isDisabled={false}
                >
                  Agregar especie
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
