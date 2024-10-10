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
import SpecimenFormik from "../../../../features/specimens/domain/specimenFormik";
import Specimen from "../../../../features/specimens/domain/specimen";
import ChipSex from "../../../../features/specimens/ChipSex";
import moment from "moment";
import useGetUpdatedFields from "../../../../components/logic/UpdateListener";
export default function SpecimenAddForm({
  //selectedSpecie = {},
  specie_id,
  onResetScroll,
}) {
  const { addSpecimen } = useSpecimens();
  const { updateLocation } = useLocations();
  const { postContributorSpecimen, updateContributorSpecimen } =
    useContributorsAndRoles();

  const location = useLocation();
  const selectedSpecie = location.state.specie;
  const selectedSpecimen = location.state.specimen;

  const { getUpdatedFields } = useGetUpdatedFields();

  const isEdit = Boolean(selectedSpecimen);
  const title = isEdit
    ? `${selectedSpecimen.specie.epithet} # ${selectedSpecimen.catalog_id}`
    : "Agregar espécimen";

  let updateTypes = {
    specimen: false,
    location: false,
    colector: false,
    preparator: false,
  };

  const submitUpdates = async (values, initialValues) => {
    const updatedFields = getUpdatedFields(values, initialValues);

    const specimenRelationships = ["location", "colector", "preparator"];

    console.log(updatedFields);

    if (updatedFields.includes(specimenRelationships[0])) {
      await updateLocation(values.location);
      // await update location
    }
    if (updatedFields.includes(specimenRelationships[1])) {
      console.log("await update colector");
      console.log(values.colector.id);
      await updateContributorSpecimen(values.colector);
      // await update colector
    }
    if (updatedFields.includes(specimenRelationships[2])) {
      await updateContributorSpecimen(values.preparator);
      console.log("await update preparator");
      // await update preparator
    }

    const specimenUpdatedFields = updatedFields.filter(
      (field) => !specimenRelationships.includes(field)
    );

    //console.log(updatedFields);
    //console.log(specimenUpdatedFields);
    //console.log(values.preparator);
    //console.log(values.colector);

    if (specimenUpdatedFields.length > 0) {
      console.log("await update specimen");
      // await update specimen
    }
  };

  const handleSubmit2 = async (values) => {
    const responseSpecimen = await addSpecimen(values, selectedSpecie.id);

    if (!responseSpecimen.status === 201) {
      return;
    }

    const newSpecimenId = responseSpecimen.data.specimen_id;
    const responseLocation = await updateLocation(values, newSpecimenId);

    if (!responseLocation.status === 201) {
      return;
    }

    const colectorSpecimen = {
      contributor: values.colector.id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.COLECTOR,
    };
    const colectorResponse = await addContributorSpecimen(colectorSpecimen);
    if (!colectorResponse.status === 200) {
      return;
    }

    const preparatorSpecimen = {
      contributor: values.preparator.id,
      specimen: newSpecimenId,
      contributor_role: CONTRIBUTOR_ROLES.PREPARATOR,
    };
    const preparatorResponse = await addContributorSpecimen(preparatorSpecimen);
    if (!preparatorResponse.status === 200) {
      return;
    }

    //const responseCurator = await
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title={title}>
        {isEdit && (
          <div className="flex-row gap-1rem align-items-center">
            <ChipSex sex={selectedSpecimen.sex}></ChipSex>|
            <p>
              por <b>{selectedSpecimen.colector.code}</b>
            </p>
            |
            <p>
              {moment(selectedSpecimen.colection_date, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              )}
            </p>
          </div>
        )}
        <h2>
          <i>{selectedSpecie?.epithet}</i>
        </h2>
      </HeaderPage>
      <br />
      <br />
      <Formik
        validationSchema={specimenSchema}
        initialValues={selectedSpecimen}
        onSubmit={submitUpdates}
        enableReinitialize
      >
        {({
          values,
          initialValues,
          errors,
          touched,
          isValid,
          dirty,
          status,
          setFieldValue,
          handleChange,
          handleBlur,
          validateForm,
          submitForm,
          isSubmitting,
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
              onClick={async () => {
                const errors = await validateForm();
                if (errors.length > 0) {
                  return;
                }

                submitUpdates(values, initialValues);

                /*
                for (let update of updates) {
                  await update(values);
                }
                  */

                //console.log(values.location);
                //console.log(touched);
                //console.log(errors);
                //handleSubmit(values, initialValues);
                //submitForm();
                //handleUpdatedFields(values, initialValues);
                //console.log(values[getUpdatedFields(values, initialValues)[0]]);
                //console.log(getUpdatedFields(values, initialValues));
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
