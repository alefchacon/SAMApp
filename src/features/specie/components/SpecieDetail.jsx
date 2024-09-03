// LIBRARIES
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import Button from "../../../components/ui/Button";
import Header from "../../../components/ui/Header";
import Table from "../../../components/ui/Table";
import Tabs from "../../../components/ui/Tabs";
import MetricsSpecimens from "../../specimens/MetricsSpecimens";
import DATE_TYPES from "../../graphing/dateTypes";
import TextField from "../../../components/ui/TextField";

import moment from "moment";
import "moment/dist/locale/es-mx";

import Multigraph from "../../graphing/Multigraph";

const METRICAS_TAB_KEY = "METRICAS";

//import getSpecimens from "../../specimens/api/GetSpecimenList";

// API CALLS
//import { mockGetSpecimens } from "../../specimens/api/GetSpecimens";
import { ROLE_TYPES } from "../../../stores/roleTypes";

import { useSpecimens } from "../../specimens/dataAccess/useSpecimens";

export default function SpecieDetail({
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
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const max = 100;
      const min = 50;

      const newSpecimens = await mockGetSpecimens(
        Math.floor(Math.random() * (max - min + 1) + min)
      );

      //const newSpecimens = (await getSpecimens(role, specie.id)).data;
      setSpecimens(newSpecimens);
    }
    //fetchData();
  }, [specie]);

  const especimenesRef = useRef(null);

  return (
    <div className="specie-view" ref={especimenesRef}>
      {children}
      {/*
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          backgroundColor: "red",
        }}
      >
        asdf
      </div>
          */}
      <Tabs className={"divider"}>
        {ROLE_TYPES.validate(role) && (
          <div label={"Especímenes"} className="flex-col">
            <div className="p-1rem gap-1rem flex-row align-items-center">
              {role === ROLE_TYPES.TECHNICAL_PERSON && (
                <Button
                  variant={"primary"}
                  onClick={async () => {
                    console.log(await getSpecimens(role, specie.id));
                  }}
                >
                  Agregar espécimen
                </Button>
              )}
              <TextField
                iconType={"search"}
                placeholder={
                  "Buscar especímenes por IDs, estado, nombre de colaborador(es)..."
                }
              ></TextField>
            </div>
            <Table data={specimens}></Table>
          </div>
        )}
        <div label={"Métricas"} tabKey={METRICAS_TAB_KEY}>
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
    </div>
  );
}
