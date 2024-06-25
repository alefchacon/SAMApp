// LIBRARIES
import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

// CUSTOM COMPONENTS
import SearchField from "../../components/ui/SearchField";
import Button from "../../components/ui/Button";
import AddIcon from "../../components/icons/AddIcon";
import CloseIcon from "../../components/icons/CloseIcon";

// VALIDATION SCHEMAS
import { specieSchema } from "./formikSchemas/specieSchema";

// CONTEXTS
import { useSnackbar } from "../../components/contexts/SnackbarContext";
import { specieSnackbarTypes } from "./contexts/specieSnackbarTypes";

// API CALLS
import {
  mockGetSpecies,
  getOrdens,
  getFamilies,
  getGenders,
  getEpithets,
  getSubspecies,
} from "./api/getSpecies";

import { mockGetSpecie } from "./api/getSpecie";

export default function NewSpecie({
  specie = {
    orden: "",
    family: "",
    gender: "",
    epithet: "",
    subspecie: "",
  },
}) {
  const [showModal, setShowModal] = useState(false);
  const { showSnackbar } = useSnackbar();

  const submitSpecie = () => {
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
    <div>
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
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form action="">
                <SearchField
                  id="orden"
                  name="orden"
                  errorMessage={errors.orden}
                  hasError={errors.orden && touched.orden}
                  required={false}
                  label="Orden"
                  options={ordens}
                ></SearchField>

                <SearchField
                  id="family"
                  name="family"
                  errorMessage={errors.family}
                  hasError={errors.family && touched.family}
                  label="Familia"
                  helperText="Sólo se permiten letras y números"
                  options={families}
                ></SearchField>
                <SearchField
                  id="gender"
                  name="gender"
                  errorMessage={errors.gender}
                  hasError={errors.gender && touched.gender}
                  label="Género"
                  helperText="Sólo se permiten letras y números"
                  options={genders}
                ></SearchField>
                <SearchField
                  id="epithet"
                  name="epithet"
                  errorMessage={errors.epithet}
                  hasError={errors.epithet && touched.epithet}
                  label="Epíteto"
                  helperText="Sólo se permiten letras y números"
                  options={epithets}
                ></SearchField>
                <SearchField
                  id="subspecie"
                  name="subspecie"
                  errorMessage={errors.subspecie}
                  hasError={errors.subspecie && touched.subspecie}
                  label="Subespecie"
                  helperText="Sólo se permiten letras y números"
                  options={subspecies}
                ></SearchField>

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
                    isDisabled={!isValid || !dirty}
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
