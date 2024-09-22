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
import { Form } from "formik";

import TextField from "../../../../components/ui/TextField";

export default function NewSpecimen({ specie_id, onResetScroll }) {
  const [stepId, setStepId] = useState("datos-generales");

  console.log(stepId);
  const handleStepChange = (newStepId) => {
    setStepId(newStepId);
  };

  return (
    <div className="form flex-col w-100">
      <HeaderPage title="Nuevo espécimen">
        <h2>Especie</h2>
        <Taxonomy center={false}></Taxonomy>
      </HeaderPage>
      <br />
      <br />
      <div className="flex-col page-padding flex-grow-1" autoComplete="off">
        <Card>
          <Stepper selectedStepId={stepId} onResetScroll={onResetScroll}>
            <div label={"Datos generales"} id={"datos-generales"}>
              <GeneralDataForm>
                <Button
                  value={"medidas-morfometricas"}
                  iconType="chevron_right"
                  className="secondary"
                  onClick={handleStepChange}
                >
                  Continuar con las medidas morfométricas
                </Button>
              </GeneralDataForm>
            </div>
            <div label={"Medidas morfométricas"} id={"medidas-morfometricas"}>
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
      </div>
    </div>
  );
}
