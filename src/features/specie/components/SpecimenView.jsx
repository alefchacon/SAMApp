// LIBRARIES
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import Button from "../../../components/ui/Button";
import Table from "../../../components/ui/Table";
import Tabs from "../../../components/ui/Tabs";
import DATE_TYPES from "../../graphing/dateTypes";
import TextField from "../../../components/ui/TextField";
import NoResults from "../../../components/ui/NoResults";

import "moment/dist/locale/es-mx";

import Multigraph from "../../graphing/Multigraph";

const METRICAS_TAB_KEY = "METRICAS";

//import getSpecimens from "../../specimens/api/GetSpecimenList";

// API CALLS
//import { mockGetSpecimens } from "../../specimens/api/GetSpecimens";
import { ROLE_TYPES } from "../../../stores/roleTypes";

import { useSpecimens } from "../../specimens/businessLogic/useSpecimens";

export default function SpecimenView({
  children,
  role = ROLE_TYPES.VISITOR,
  specie = {
    id: 0,
    scientific_name: `Nombre de la especie ${1}`,
    orden: `Orden ${1}`,
    family: `Familia ${1}`,
    gender: `Género ${1}`,
    epithet: `építeto ${1}`,
    subspecie: `subespecie ${1}`,
  },
}) {
  const [specimens, setSpecimens] = useSpecimens(specie.id);
  //const [specimens, setSpecimens] = useState([]);

  const specimensRef = useRef(null);

  function AddSpecimenButton() {
    return (
      <Button
        variant={"primary"}
      >
        Agregar espécimen
      </Button>
    );
  }

  function SpecimenTabs() {
    return (
      <Tabs className={"divider"}>
        {ROLE_TYPES.validate(role) && (
          <div
            label={"Especímenes"}
            className="specimens flex-col h-100 overflow-auto"
          >
            <div className="specimens-controls p-1rem gap-1rem flex-row align-items-center">
              <TextField
                maxWidth={"60%"}
                iconType={"search"}
                placeholder={
                  "Buscar especímenes por IDs, estado, nombre de contribuidor(es)..."
                }
              ></TextField>
              {role === ROLE_TYPES.TECHNICAL_PERSON && <AddSpecimenButton />}
            </div>
            <Table data={specimens}></Table>
          </div>
        )}
        <div label={"Métricas"} id={METRICAS_TAB_KEY}>
          <div className="p-1rem gap-1rem h-100 multigraph-wrapper">
            <Multigraph
              graphTitle="Especímenes recolectados por mes"
              specimens={specimens}
              attributeToGraph={{
                name: "colection_date",
                type: DATE_TYPES.MONTH,
              }}
              yLabel="Especímenes"
              xLabel="Meses"
            />
            <Multigraph
              graphTitle="Especímenes recolectados por año"
              specimens={specimens}
              attributeToGraph={{
                name: "colection_date",
                type: DATE_TYPES.YEAR,
              }}
              yLabel="Especímenes"
              xLabel="Meses"
            />
            <Multigraph
              graphTitle="Especímenes recolectados por mes"
              specimens={specimens}
              attributeToGraph={{
                name: "colection_date",
                type: DATE_TYPES.MONTH,
              }}
              yLabel="Especímenes"
              xLabel="Meses"
            />
          </div>
        </div>
      </Tabs>
    );
  }

  return (
    <div className="specie-view w-100" ref={specimensRef}>
      {children}
      {specimens.length > 0 ? (
        <SpecimenTabs></SpecimenTabs>
      ) : (
        <NoResults
          itemName="especímenes"
          role={role}
          button={<AddSpecimenButton />}
        />
      )}
    </div>
  );
}
