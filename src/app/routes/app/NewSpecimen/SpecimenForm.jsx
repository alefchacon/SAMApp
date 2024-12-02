// LIBRARIES
import { useState } from "react";

import Header from "../../../../components/ui/Header";
import Button from "../../../../components/ui/Button";
// FORMS
import LocationForm from "../../../../features/specimens/newSpecimen/LocationForm";
import Card from "../../../../components/ui/Card";
import ContributorsForm from "./ColectForm";
import MorphometricMeasuresForm from "../../../../features/specimens/newSpecimen/MorphometricMeasuresForm";
import Specie from "../../../../features/specie/domain/specie";
// COMPONENTS
import Stepper from "../../../../components/ui/Stepper";
import CardSpecie from "../../../../features/specie/components/CardSpecie";
//import Stepper from "../../../../components/ui/Stepper";
import { Formik, Form, Field } from "formik";
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";
import Page from "../../../../components/ui/Page";

import { useSpecimens } from "../../../../features/specimens/businessLogic/useSpecimens";
import { useLocations } from "../../../../features/specimens/businessLogic/useLocations";
import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";
import CONTRIBUTOR_ROLES from "../../../../stores/contributorRoles";
import { useLocation } from "react-router-dom";

import SpecimenFormik from "../../../../features/specimens/domain/specimenFormik";
import HttpStatus from "../../../../stores/httpStatus";

export default function SpecimenForm({ onResetScroll }) {
  const { addSpecimen } = useSpecimens();
  const { addLocation } = useLocations();
  const { addContributorSpecimen } = useContributorsAndRoles();

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

    //const responseCurator = await
  };

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
          submitForm
        }) => (
          <Form
            className="w-100"
            autoComplete="off"
          >
              <button type="button" onClick={() => console.log(values)}>asdf</button>
              <Stepper
                onEndButtonClick={submitForm}
                selectedStepId={"medidas-morfometricas"}
                onResetScroll={onResetScroll}
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
                  <ContributorsForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    onBlur={handleBlur}
                  ></ContributorsForm>
                </div>
              </Stepper>

            {/*
            
            
            
            */}
          </Form>
        )}
      </Formik>
    
    
    </Page>
  );

  function StepForm() {
    return;
  }
}
