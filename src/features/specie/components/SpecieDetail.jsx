// LIBRARIES
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";
import Specie from "./Specie";
import SpecieHeader from "./SpecieHeader";
import Table from "../../../components/ui/Table";
import AddIcon from "../../../components/icons/AddIcon";
import DownloadIcon from "../../../components/icons/DownloadIcon";
import Tabs from "../../../components/ui/Tabs";

import moment from "moment";
import "moment/dist/locale/es-mx";

import Multigraph from "../../graphing/Multigraph";

// API CALLS
import { getSpecimens } from "../../specimens/api/GetSpecimens";

export default function SpecieDetail({
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
  const [specimens, setSpecimens] = useState([]);
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const max = 10;
      const min = 5;
      const newSpecimens = await getSpecimens(
        Math.floor(Math.random() * (max - min + 1) + min)
      );
      setSpecimens(newSpecimens);
    }
    fetchData();
  }, [specie]);

  const especimenesRef = useRef(null);
  const metricasRef = useRef(null);

  function compareDates(spec1, spec2) {
    const date1 = moment(spec1.colection_date, "YYYY-MM-DD");
    const date2 = moment(spec2.colection_date, "YYYY-MM-DD");

    if (date1.isBefore(date2)) {
      return -1;
    }
    if (date2.isBefore(date1)) {
      return 1;
    }
    return 0;
  }

  const orderSpecimens = () => {
    const sorted = specimens.sort(compareDates);
    const dates = sorted.map((specimen) =>
      moment(specimen["colection_date"]).month()
    );

    const uniqueMonths = Array.from(new Set(dates).values());

    const valueMap = {};
    for (let i = 0; i < uniqueMonths.length; i++) {
      valueMap[uniqueMonths[i]] = 0;
      for (let j = 0; j < specimens.length; j++) {
        const colection_date = moment(specimens[j].colection_date);
        if (colection_date.month() === uniqueMonths[i]) {
          valueMap[uniqueMonths[i]] += 1;
        }
      }
    }

    console.log(valueMap);

    const graphData = Object.entries(valueMap).map((pair) => {
      return {
        name: moment().month(pair[0]).format("MMMM"),
        value: pair[1],
        opacity: 1,
        fill: "#2A4747",
      };
    });

    console.log(graphData);

    setGraphData(graphData);
  };

  return (
    <div className="specie-view" ref={especimenesRef}>
      <SpecieHeader isListItem={false} specie={specie}></SpecieHeader>
      <Button onClick={orderSpecimens}>test</Button>
      <Tabs className={"divider bg-main"}>
        <div label={"Especímenes"} className="flex-col">
          <div className="p-1rem gap-1rem flex-row align-items-center">
            <Button variant={"primary"}>Agregar espécimen</Button>
            <Button
              className={"secondary"}
              label="Descargar .CSV"
              iconType="download"
            >
              Descargar .CSV
            </Button>
            <div></div>
            <input
              type="search"
              placeholder="Buscar especies por ID, Estado, Colaborador, etc"
            />
          </div>
          <div id="especimenes">
            <Table data={specimens}></Table>
          </div>
        </div>
        <div label={"Métricas"}>
          <div className="p-1rem gap-1rem h-100 multigraph">
            <Multigraph
              graphTitle="Especímenes recolectados por mes"
              data={graphData}
            ></Multigraph>
          </div>
        </div>
      </Tabs>
    </div>
  );
}
