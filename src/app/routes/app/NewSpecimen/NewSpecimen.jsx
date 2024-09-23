// LIBRARIES
import { useState } from "react";

import HeaderPage from "../../../../components/ui/HeaderPage";
import Button from "../../../../components/ui/Button";
// FORMS
import LocationForm from "./LocationForm";
import Card from "../../../../components/ui/Card";
import ContributorsForm from "./ContributorsForm";
import GeneralDataForm from "../../../../features/specimens/newSpecimen/generalData/GeneralDataForm";
import MorphometricMeasuresForm from "./MorphometricMeasuresForm";
import Taxonomy from "../../../../features/specie/components/Taxonomy";
// COMPONENTS
import Stepper from "../../../../components/ui/Stepper";
//import Stepper from "../../../../components/ui/Stepper";
import { Formik, Form, Field } from "formik";
import { generalDataSchema } from "../../../../features/specimens/formikSchemas/generalDataSchema";
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
        validationSchema={generalDataSchema}
        initialValues={{
          colection_code: "",
          catalog_id: "",
          colection_date: "",
          hour: "",
          status: "",
          sex: "",
          number_embryos: 0,
          comment: "",
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
          <Form
            className="flex-col page-padding flex-grow-1"
            autoComplete="off"
          >
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
                  <MorphometricMeasuresForm></MorphometricMeasuresForm>
                </div>
                <div label={"Ubicación"} id={"ubicacion"}>
                  <LocationForm></LocationForm>
                </div>
                <div label={"Colaboradores"} id={"colaboradores"}>
                  <ContributorsForm></ContributorsForm>
                </div>
              </Stepper>
            </Card>
            <button onClick={() => validateForm().then((r) => console.log(r))}>
              asdf
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
