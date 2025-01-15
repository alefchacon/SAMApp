// FORMS
import LocationForm from "../../../features/specimens/newSpecimen/LocationForm";
import ColectForm from "../../../features/specimens/newSpecimen/ColectForm";
import MorphometricMeasuresForm from "../../../features/specimens/newSpecimen/MorphometricMeasuresForm";
import Specie from "../../../features/specie/domain/specie";
// COMPONENTS
import Stepper from "../../../components/ui/Stepper";
import CardSpecie from "../../../features/specie/components/CardSpecie";
//import Stepper from "../../../../components/ui/Stepper";
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
import { keys } from "lodash";

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

    if (!responseSpecimen.status === HttpStatus.CREATED) {
      return;
    }

    const newSpecimenId = responseSpecimen.data.specimen_id;
    const responseLocation = await addLocation(values.location, newSpecimenId);

    if (!responseLocation.status === HttpStatus.CREATED) {
      return;
    }

    const colectorSpecimen = {
      contributor: values.colector.contributor_id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.COLECTOR,
    };
    const colectorResponse = await addContributorSpecimen(colectorSpecimen);
    if (!colectorResponse.status === HttpStatus.OK) {
      return;
    }

    const preparatorSpecimen = {
      contributor: values.preparator.contributor_id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.PREPARATOR,
    };
    const preparatorResponse = await addContributorSpecimen(
      preparatorSpecimen
    );
    if (!preparatorResponse.status === HttpStatus.OK) {
      return;
    }
  };

  //I thought of using selectedStepId as a way of controlling the Stepper
  //with the URL, but I never got around to implementing it.
  //It's currently being used for validation.
  const stepIds = Object.freeze({
    colectStep: "colecta",
    morphometricMeasuresStep: "medidas-morfometricas",
    locationStep: "ubicacion"
  })

  const morphometricFields = [
    "colector", 
    "preparator", 
    "sex", 
    "class_age", 
    "length_total", 
    "length_ear",
    "length_paw",
    "length_tail",
    "weight",
    "colection_code",
    "colection_date",
    "colection_number",
    "nature",
    "status",
  ]
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

  const handleValidation = async (validateForm, submitForm) => {
    const errors = await validateForm();
    findInvalidSteps(errors)
    if (Object.entries(errors).length > 0) { 
      showSnackbar("Por favor, corrija los errores antes de continuar", true);
      return;
    }
    submitForm()
  }

  return (
    <Page title={"Agregar espécimen"} subtitle={<CardSpecie specie={new Specie(selectedSpecie)}/>}>
      <Formik
        validationSchema={specimenSchema}
        initialValues={new SpecimenFormik()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ 
          values,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          validateForm,
          submitForm
        }) => (
          <Form
            className="w-100"
            autoComplete="off"
          >
              <Stepper
                onEndButtonClick={() => handleValidation(validateForm, submitForm)}
                selectedStepId={"medidas-morfometricas"}
                onResetScroll={onResetScroll}
                invalidSteps={invalidSteps}
              >
                <div
                  label={"Medidas morfométricas"}
                  id={"medidas-morfometricas"}
                >
                  <MorphometricMeasuresForm
                    handleChange={handleChange}
                    touched={touched}
                    onBlur={handleBlur}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                  ></MorphometricMeasuresForm>
                </div>
                <div label={"Ubicación"} id={"ubicacion"}>
                  <LocationForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  ></LocationForm>
                </div>
                <div label={"Colecta"} id={"colecta"}>
                  <ColectForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  ></ColectForm>
                </div>
              </Stepper>
          </Form>
        )}
      </Formik>
    
    
    </Page>
  );

}
