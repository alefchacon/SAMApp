// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

// CUSTOM COMPONENTS
import SearchField from "../../../components/ui/SearchField";
import Button from "../../../components/ui/Button";
import AddIcon from "../../../components/icons/AddIcon";
import CloseIcon from "../../../components/icons/CloseIcon";
import Autocomplete from "../../../components/ui/Autocomplete";

// VALIDATION SCHEMAS
import { specieSchema } from "../../../features/specie/formikSchemas/specieSchema";

// CONTEXTS
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { specieSnackbarTypes } from "../../../features/specie/contexts/specieSnackbarTypes";

// API CALLS
import {
  mockGetSpecies,
  getOrdens,
  getFamilies,
  getGenders,
  getEpithets,
  getSubspecies,
} from "../../../features/specie/api/getSpecies";

import { mockGetSpecie } from "../../../features/specie/api/getSpecie";

export default function NewSpecie({
  specie = {
    orden: "",
    family: "",
    gender: "",
    epithet: "",
    subspecie: "",
  },
}) {
  const [showModal, setShowModal] = useState(true);
  const { showSnackbar } = useSnackbar();

  const submitSpecie = () => {
    //console.log(values);
    if (!true) {
      showSnackbar(specieSnackbarTypes.addSpecieSuccess);
    } else {
      showSnackbar(specieSnackbarTypes.addSpecieError);
    }
  };

  /*
  
  the following should be temporal only:
  it mocks the component receiving its props
  
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

      const currentUrl = window.location.href;
      const url = new URL(currentUrl);
      const path = url.pathname;

      console.log(specie);
    }

    fetchData();

    setIsReady(true);
  }, []);

  return (
    <div className="fullwidth">
      <h2 className="form-title">Nueva especie</h2>
      <div className="sam-form">
        {isReady && (
          <Formik
            validationSchema={specieSchema}
            initialValues={{
              orden: specie.orden,
              family: specie.family,
              gender: specie.gender,
              epithet: specie.epithet,
              subspecie: specie.subspecie,
            }}
            onSubmit={(v, a) => console.log(v)}
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
              <Form action="" autoComplete="false">
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
                  name="subspecie"
                  label="Epíteto"
                  items={subspecies}
                  value={values.subspecie}
                  hasError={errors.subspecie && touched.subspecie}
                  errorMessage={errors.subspecie}
                  setFieldValue={setFieldValue}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></Autocomplete>

                <div className="form-actions">
                  <Button
                    type="button"
                    variant={"secondary"}
                    label="Cancelar"
                    isDisabled={false}
                    onClick={() => submitSpecie()}
                    icon={<CloseIcon />}
                  ></Button>
                  <Button
                    type="submit"
                    variant={"primary"}
                    label="Agregar especie"
                    isDisabled={false}
                    icon={<AddIcon />}
                  ></Button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </div>
  );
}
