// FORMS
import LocationForm from "../../../features/specimens/newSpecimen/LocationForm";
import ColectForm from "../../../features/specimens/newSpecimen/ColectForm";
import MorphometricMeasuresForm from "../../../features/specimens/newSpecimen/MorphometricMeasuresForm";
import Specie from "../../../features/specie/domain/specie";
// COMPONENTS
import Stepper from "../../../components/ui/Stepper";
import CardSpecie from "../../../features/specie/components/CardSpecie";
import { Formik, Form } from "formik";
import { specimenSchema } from "../../../features/specimens/formikSchemas/specimenSchema";
import Page from "../../../components/ui/Page";

import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useLocations } from "../../../features/specimens/businessLogic/useLocations";
import useContributorsAndRoles from "../../../features/contributors/businessLogic/useContributorsAndRoles";
import CONTRIBUTOR_ROLES from "../../../stores/contributorRoles";
import { useLocation } from "react-router-dom";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import SpecimenFormik from "../../../features/specimens/domain/specimenFormik";
import HttpStatus from "../../../stores/httpStatus";
import { useState } from "react";

export default function SpecimenForm({ onResetScroll }) {
  const { addSpecimen } = useSpecimens();
  const { addLocation } = useLocations();
  const { addContributorSpecimen } = useContributorsAndRoles();
  const { showSnackbar } = useSnackbar();
  const [invalidSteps, setInvalidSteps] = useState([]);
  const location = useLocation();
  const selectedSpecie = location.state.specie;


  const handleSubmit = async (values) => {
    const responseSpecimen = await addSpecimen(values, selectedSpecie.id);
  };

  //I thought of using selectedStepId as a way of controlling the Stepper
  //with the URL, but I never got around to implementing it.
  //It's currently being used for validation.
  const stepIds = Object.freeze({
    colectStep: "colecta",
    morphometricMeasuresStep: "medidas-morfometricas",
    locationStep: "ubicacion"
  })

  const colectFields = [
    "colector", 
    "preparator", 
    "colection_code",
    "colection_date",
    "colection_number",
    "nature",
    "status",
  ]
  const findInvalidSteps = (errors) => {
    setInvalidSteps([])
    const errorKeys = Object.keys(errors);

    if (errorKeys.length < 1){
      return;
    }
    let newInvalidSteps = [];
    for (const key of errorKeys){
      if (colectFields.includes(key)){
        newInvalidSteps.push(stepIds.colectStep) 
      } else if (key === "location"){
        newInvalidSteps.push(stepIds.locationStep) 
      } else {
        newInvalidSteps.push(stepIds.morphometricMeasuresStep) 
      }
    } 
    setInvalidSteps(newInvalidSteps)
  }

  const handleValidation = async (formik) => {
    const errors = await formik.validateForm().then((errors) => {
      const allFieldsTouched = markAllFieldsTouched(formik.values);
      formik.setTouched(allFieldsTouched);
      return errors;
    });

    findInvalidSteps(errors)

    if (Object.entries(errors).length > 0) { 
      showSnackbar("Por favor, corrija los errores antes de continuar", true);
      return;
    }
    formik.submitForm()
  }

  /*
    Fields need to be touched in order to show their error message.
    Typically, when Formik submits, it sets every field as touched.
    Our validation procedure needs to run validateForm() manually
    in order to get the list of errors.
    The problem with validateForm() is that it does not set the fields
    as touched, so we need to do that manually as well.
    The problem with THAT is that the SpecimenFormik object has a
    nested location object in it, so in order to set it as 
    touched I had to do recursion.
  */
  function markAllFieldsTouched(values) {
    const touched = {};
  
    function recurse(currentValues, currentTouched) {
      Object.keys(currentValues).forEach((key) => {
        if (typeof currentValues[key] === 'object' && currentValues[key] !== null) {
          currentTouched[key] = {};
          recurse(currentValues[key], currentTouched[key]);
        } else {
          currentTouched[key] = true;
        }
      });
    }
    recurse(values, touched);
    return touched;
  }

  return (
    <Page title={"Agregar espécimen"} subtitle={<CardSpecie specie={new Specie(selectedSpecie)}/>}>
      <Formik
        validationSchema={specimenSchema}
        initialValues={new SpecimenFormik()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {formik => (
          <Form
            className="w-100"
            autoComplete="off"
          >
              <Stepper
                onEndButtonClick={() => handleValidation(formik)}
                selectedStepId={"medidas-morfometricas"}
                onResetScroll={onResetScroll}
                invalidSteps={invalidSteps}
              >
                <div
                  label={"Medidas morfométricas"}
                  id={"medidas-morfometricas"}
                >
                  <MorphometricMeasuresForm></MorphometricMeasuresForm>
                </div>
                <div label={"Ubicación"} id={"ubicacion"}>
                  <LocationForm></LocationForm>
                </div>
                <div label={"Colecta"} id={"colecta"}>
                  <ColectForm></ColectForm>
                </div>
              </Stepper>
              <button onClick={(e) => console.log(formik.values)}>asdf</button>
          </Form>
        )}
      </Formik>
    </Page>
  );
}
