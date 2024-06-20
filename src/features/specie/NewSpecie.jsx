import { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";

import TextField from "../../components/ui/TextField";
import SearchField from "../../components/ui/SearchField";
import Button from "../../components/ui/Button";
import Message from "../../components/ui/Message";
import AddIcon from "../../components/icons/AddIcon";
import CheckIcon from "../../components/icons/CheckIcon";
import CloseIcon from "../../components/icons/CloseIcon";

import { specieSchema } from "./formikSchemas/specieSchema";

import Snackbar from "../../components/ui/Snackbar";

import {
  mockGetSpecies,
  getOrdens,
  getFamilies,
  getGenders,
  getEpithets,
  getSubspecies,
} from "./api/getSpecies";

export default function NewSpecie() {
  const [showSnackbar, setShowSnackbar] = useState(false);
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
    }
    fetchData();

    setIsReady(true);
  }, []);

  return (
    <div>
      <Snackbar visible={showSnackbar}></Snackbar>
      <h2 className="form-title">Nueva especie</h2>
      <div className="sam-form">
        {isReady && (
          <Formik
            validationSchema={specieSchema}
            initialValues={{
              orden: "",
              family: "",
              gender: "",
              epithet: "",
              subspecie: "",
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
                    onClick={() => setShowSnackbar(!showSnackbar)}
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
