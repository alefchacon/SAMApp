// LIBRARIES
import { useState } from "react";

import HeaderPage from "../../../../components/ui/HeaderPage";
import Button from "../../../../components/ui/Button";
// FORMS
import LocationForm from "../../../../features/specimens/newSpecimen/LocationForm";
import Card from "../../../../components/ui/Card";
import ContributorsForm from "./ColectForm";
import GeneralDataForm from "../../../../features/specimens/newSpecimen/GeneralDataForm";
import MorphometricMeasuresForm from "../../../../features/specimens/newSpecimen/MorphometricMeasuresForm";
import Taxonomy from "../../../../features/specie/components/Taxonomy";
// COMPONENTS
import Stepper from "../../../../components/ui/Stepper";
//import Stepper from "../../../../components/ui/Stepper";
import { Formik, Form, Field } from "formik";
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";
import TextField from "../../../../components/ui/TextField";

import { useSpecimens } from "../../../../features/specimens/businessLogic/useSpecimens";
import { useLocations } from "../../../../features/specimens/businessLogic/useLocations";
import useContributorsAndRoles from "../../../../features/contributors/businessLogic/useContributorsAndRoles";
import CONTRIBUTOR_ROLES from "../../../../stores/contributorRoles";
import Footer from "../../../../components/ui/Footer";
const INPUT_WIDTH = 300;
import { useLocation } from "react-router-dom";

import ChipSex from "../../../../features/specimens/ChipSex";
import moment from "moment";
import useGetUpdatedFields from "../../../../components/logic/UpdateListener";
import SpecimenSerializer from "../../../../features/specimens/domain/specimenSerializer";
import SpecimenFormik from "../../../../features/specimens/domain/specimenFormik";

export default function SpecimenAddForm({ onResetScroll }) {
  const { postSpecimen } = useSpecimens();
  const { postLocation } = useLocations();
  const { postContributorSpecimen } = useContributorsAndRoles();

  const location = useLocation();
  const selectedSpecie = location.state.specie;
  const currentSpecimenId = location.state.currentSpecimenId;

  console.log(currentSpecimenId);

  const handleSubmit = async (values) => {
    const responseSpecimen = await postSpecimen(values, selectedSpecie.id);

    if (!responseSpecimen.status === 201) {
      return;
    }

    const newSpecimenId = responseSpecimen.data.specimen_id;
    const responseLocation = await postLocation(values.location, newSpecimenId);

    if (!responseLocation.status === 201) {
      return;
    }

    const colectorSpecimen = {
      contributor: values.colector.contributor_id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.COLECTOR,
    };
    const colectorResponse = await postContributorSpecimen(colectorSpecimen);
    if (!colectorResponse.status === 200) {
      return;
    }

    const preparatorSpecimen = {
      contributor: values.preparator.contributor_id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.PREPARATOR,
    };
    const preparatorResponse = await postContributorSpecimen(
      preparatorSpecimen
    );
    if (!preparatorResponse.status === 200) {
      return;
    }

    //const responseCurator = await
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title={"Agregar espécimen"}>
        <h2>{selectedSpecie.epithet}</h2>
      </HeaderPage>
      <br />
      <br />
      <Formik
        validationSchema={specimenSchema}
        initialValues={new SpecimenFormik()}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({
          values,
          initialValues,
          errors,
          touched,
          setFieldValue,
          handleChange,
          handleBlur,
          submitForm,
        }) => (
          <div className="flex-col page-padding flex-grow-1" autoComplete="off">
            <Card>
              <Stepper
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
                    onLoad={() => console.log("loading contributors!!!!")}
                  ></ContributorsForm>
                </div>
              </Stepper>
            </Card>
            <button
              onClick={() => {
                submitForm();
                console.log(errors);

                //handleUpdatedFields(values, initialValues);
                //console.log(values[getUpdatedFields(values, initialValues)[0]]);
              }}
            >
              asdff
            </button>
            {/*
            
            
            
            */}
          </div>
        )}
      </Formik>
      <Footer></Footer>
    </div>
  );

  function StepForm() {
    return;
  }
}
