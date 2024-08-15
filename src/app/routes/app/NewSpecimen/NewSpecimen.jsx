// LIBRARIES
import { useState } from "react";

// FORMS
import LocationForm from "./LocationForm";
import ContributorsForm from "./ContributorsForm";

// COMPONENTS
import Stepper from "../../../../components/ui/Stepper";
//import Stepper from "../../../../components/ui/Stepper";

import TextField from "../../../../components/ui/TextField";

export default function NewSpecimen({ specie_id }) {
  return (
    <div>
      <Stepper>
        <div label={"Caacterísticas físicas"}>
          <p>This is the oither one duh</p>
        </div>
        <div label={"Recolección"}>
          <p>This is the oither one duh</p>
        </div>
        <div label={"Ubicación"}>
          <LocationForm></LocationForm>
        </div>
        <div label={"Contribuidores"}>
          <ContributorsForm></ContributorsForm>
        </div>
      </Stepper>
    </div>
  );
}
