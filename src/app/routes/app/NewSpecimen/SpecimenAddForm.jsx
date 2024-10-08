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

export default function SpecimenAddForm({
  //selectedSpecie = {},
  specie_id,
  onResetScroll,
}) {
  const { addSpecimen } = useSpecimens();
  const [, , addLocation] = useLocations();
  const [, , , addContributorSpecimen] = useContributorsAndRoles();

  const location = useLocation();
  const selectedSpecie = location.state;

  console.log(selectedSpecie);

  const [stepId, setStepId] = useState("medidas-morfometricas");

  const handleSubmit = async (values) => {
    const responseSpecimen = await addSpecimen(values, selectedSpecie.id);

    if (!responseSpecimen.status === 201) {
      return;
    }

    const newSpecimenId = responseSpecimen.data.specimen_id;
    const responseLocation = await addLocation(values, newSpecimenId);

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
      contributor_role: CONTRIBUTOR_ROLES.PREPARADOR,
    };
    const preparatorResponse = await addContributorSpecimen(preparatorSpecimen);
    if (!preparatorResponse.status === 200) {
      return;
    }

    //const responseCurator = await
  };

  const defaultData = {
    catalog_id: "ASDF",
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title={`Agregar espécimen`}>
        <h2>
          <i>{selectedSpecie.epithet}</i>
        </h2>
      </HeaderPage>
      <br />
      <br />
      <Formik
        validationSchema={specimenSchema}
        initialValues={new SpecimenFormik(defaultData)}
        onSubmit={handleSubmit}
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
          validateForm,
          submitForm,
        }) => (
          <div className="flex-col page-padding flex-grow-1" autoComplete="off">
            <Card>
              <Stepper selectedStepId={stepId} onResetScroll={onResetScroll}>
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
                console.log("errors");
                console.log(errors);
                console.log(values);
              }}
            >
              asdff
            </button>
          </div>
        )}
      </Formik>
      <Footer></Footer>
    </div>
  );
}
