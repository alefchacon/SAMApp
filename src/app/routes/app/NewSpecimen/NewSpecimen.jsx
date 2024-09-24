// LIBRARIES
import { useState } from "react";

import HeaderPage from "../../../../components/ui/HeaderPage";
import Button from "../../../../components/ui/Button";
// FORMS
import LocationForm from "../../../../features/specimens/newSpecimen/LocationForm";
import Card from "../../../../components/ui/Card";
import ContributorsForm from "./ContributorsForm";
import GeneralDataForm from "../../../../features/specimens/newSpecimen/GeneralDataForm";
import MorphometricMeasuresForm from "../../../../features/specimens/newSpecimen/MorphometricMeasuresForm";
import Taxonomy from "../../../../features/specie/components/Taxonomy";
// COMPONENTS
import Stepper from "../../../../components/ui/Stepper";
//import Stepper from "../../../../components/ui/Stepper";
import { Formik, Form, Field } from "formik";
import { specimenSchema } from "../../../../features/specimens/formikSchemas/specimenSchema";
import TextField from "../../../../components/ui/TextField";

const INPUT_WIDTH = 300;

export default function NewSpecimen({ specie_id, onResetScroll }) {
  const [stepId, setStepId] = useState("datos-generales");
  const [generalDataValues, setGeneralDataValues] = useState({
    colection_code: "",
    catalog_id: "",
    colection_date: "",
    hour: "",
    status: "",
    sex: "",
    number_embryos: 0,
    comment: "",

    //Morphometric measures
    length_total: "",
    length_ear: "",
    length_paw: "",
    length_tail: "",
    weight: "",
  });

  console.log(stepId);
  const handleStepChange = (newStepId) => {
    setStepId(newStepId);
  };

  const handleSubmit = (v) => {
    console.log(v);
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title="Nuevo espécimen">
        <h2>Especie</h2>
        <Taxonomy center={false}></Taxonomy>
      </HeaderPage>
      <br />
      <br />
      <Formik
        validationSchema={specimenSchema}
        initialValues={{
          //datos-generales
          colection_code: "",
          catalog_id: "",
          colection_date: "",
          hour: "",
          status: "",
          sex: "",
          number_embryos: 0,
          comment: "",

          //medidas-morfometricas
          length_total: "",
          length_ear: "",
          length_paw: "",
          length_tail: "",
          weight: "",

          //ubicacion
          coordinates_cartesian_plane_x: "",
          coordinates_cartesian_plane_y: "",
          geographical_coordinates_x: "",
          geographical_coordinates_y: "",
          utm_region: "",
          msnm_google: "",
          altitude: "",
          institute_code: "",
          institute: "",
          specific_location: "",
          municipality: "",
          state: "",
          country: "",

          //colaboradores
          colector: { contributor_id: "", contributor_role_id: "" },
          preparador: { contributor_id: "", contributor_role_id: "" },
        }}
        onSubmit={handleSubmit}
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
        }) => (
          <div className="flex-col page-padding flex-grow-1" autoComplete="off">
            <Card>
              <Stepper selectedStepId={stepId} onResetScroll={onResetScroll}>
                <div label={"Datos generales"} id={"datos-generales"}>
                  <GeneralDataForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    inputWidth={INPUT_WIDTH}
                  >
                    <Button
                      value={"medidas-morfometricas"}
                      iconType="chevron_right"
                      className="secondary"
                      onClick={validateForm}
                    >
                      Continuar con las medidas morfométricas
                    </Button>
                  </GeneralDataForm>
                </div>
                <div
                  label={"Medidas morfométricas"}
                  id={"medidas-morfometricas"}
                >
                  <MorphometricMeasuresForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    inputWidth={INPUT_WIDTH}
                  ></MorphometricMeasuresForm>
                </div>
                <div label={"Ubicación"} id={"ubicacion"}>
                  <LocationForm
                    handleChange={handleChange}
                    touched={touched}
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    inputWidth={INPUT_WIDTH}
                  ></LocationForm>
                </div>
                <div label={"Colaboradores"} id={"colaboradores"}>
                  <ContributorsForm
                    onLoad={() => console.log("loading contributors!!!!")}
                  ></ContributorsForm>
                </div>
              </Stepper>
            </Card>
            <button
              onClick={() => {
                validateForm().then((r) => console.log(r));
                console.log(values);
              }}
            >
              asdf
            </button>
          </div>
        )}
      </Formik>
    </div>
  );
}
