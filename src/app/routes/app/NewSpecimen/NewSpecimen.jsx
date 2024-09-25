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

import { useSpecimens } from "../../../../features/specimens/businessLogic/useSpecimens";

const INPUT_WIDTH = 300;

export default function NewSpecimen({ specie_id, onResetScroll }) {
  const [, , addSpecimen] = useSpecimens();

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

  const handleStepChange = (newStepId) => {
    setStepId(newStepId);
  };

  const handleSubmit = async (v) => {
    const response = await addSpecimen(v, 195);
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
          colector: "",
          preparator: "",
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
          submitForm,
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
                    onBlur={handleBlur}
                    setFieldValue={setFieldValue}
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
                <div label={"Colaboradores"} id={"colaboradores"}>
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
