// LIBRARIES
import { useState, useEffect } from "react";

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
import { useLocation, useParams, useNavigate } from "react-router-dom";
import SpecimenFormik from "../../../../features/specimens/domain/specimenFormik";
import Specimen from "../../../../features/specimens/domain/specimen";
import ChipSex from "../../../../features/specimens/ChipSex";
import moment from "moment";
import useGetUpdatedFields from "../../../../components/logic/useGetUpdatedFields";
import HttpStatus from "../../../../stores/httpStatus";

export default function SpecimenEditForm({ onResetScroll }) {
  const { updateLocation } = useLocations();
  const { specimenId } = useParams();
  const { updateSpecimen, getSpecimen } = useSpecimens();
  const { getUpdatedFields } = useGetUpdatedFields();
  const { updateContributorSpecimen } = useContributorsAndRoles();

  const [specimen, setSpecimen] = useState();

  useEffect(() => {
    getSpecimen(specimenId).then((response) => setSpecimen(response.data));
  }, []);

  const submitUpdates = async (values, initialValues) => {
    const updatedFields = getUpdatedFields(values, initialValues);

    const specimenRelationships = ["location", "colector", "preparator"];

    const locationWasUpdated = updatedFields.includes(specimenRelationships[0]);
    if (locationWasUpdated) {
      const response = await updateLocation(values.location);
      if (response.status === HttpStatus.OK) {
        setSpecimen((previousSpecimen) => ({
          ...previousSpecimen,
          location: response.data.data,
        }));
      }
    }

    const colectorWasUpdated = updatedFields.includes(specimenRelationships[1]);
    if (colectorWasUpdated) {
      const response = await updateContributorSpecimen(values.colector);
    }

    const preparatorWasUpdated = updatedFields.includes(
      specimenRelationships[2]
    );
    if (preparatorWasUpdated) {
      const response = await updateContributorSpecimen(values.preparator);
    }

    const specimenUpdatedFields = updatedFields.filter(
      (field) => !specimenRelationships.includes(field)
    );
    const specimenWasUpdated = specimenUpdatedFields.length > 0;
    if (specimenWasUpdated) {
      const response = await updateSpecimen(values);
      if (response.status === HttpStatus.OK) {
        setSpecimen(response.data.data);
      }
    }
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title={"title"}>
        <div className="flex-row gap-1rem align-items-center">
          <ChipSex sex={specimen?.sex}></ChipSex>|
          <p>
            por <b>{specimen?.colector.code}</b>
          </p>
          |
          <p>
            {moment(specimen?.colection_date, "YYYY-MM-DD").format(
              "DD/MM/YYYY"
            )}
          </p>
        </div>
      </HeaderPage>
      <br />
      <br />
      <Formik
        validationSchema={specimenSchema}
        initialValues={specimen}
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
