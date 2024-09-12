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

import { mockGetSpecie } from "../../../features/specie/businessLogic/getSpecie";

export default function NewSpecie({
  onSubmit,
  specie = {
    orden: "",
    family: "",
    gender: "",
    epithet: "",
    subspecie: "",
  },
  open,
}) {
  const formikRef = useRef();
  const submitSpecie = (values, actions) => {
    values.scientific_name = `${values.gender} ${values.epithet}`;
    onSubmit(values);
    actions.resetForm();
    //showSnackbar(specieSnackbarTypes.addSpecieSuccess);
    /*
    if (!true) {
    } else {
      showSnackbar(specieSnackbarTypes.addSpecieError);
    }
      */
  };

  /*
  
  the following should be temporal only:
  it mocks the component receiving its props
  
  */

  /*
  useEffect(() => {
    if (!open) {
      console.log("cleaning up!!");
      console.log(specie);
      console.log(formikRef.current?.values);
      console.log(formikRef.current?.initialValues);
      formikRef.current?.resetForm();
    }
  }, [open]);
  */
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
      <div className="p-2rem">
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
              <Form action="" autoComplete="off">
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
                  id="epithet"
                  name="epithet"
                  label="Epíteto"
                  required
                  items={epithets}
                  value={values.epithet}
                  hasError={errors.epithet && touched.epithet}
                  errorMessage={errors.epithet}
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
    </div>
  );
}
