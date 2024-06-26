// LIBRARIES
import { useState, useEffect, useRef } from "react";

// COMPONENTS
import Button from "../../../components/ui/Button";
import LinkButton from "../../../components/ui/LinkButton";
import Specie from "./Specie";
import Table from "../../../components/ui/Table";
import AddIcon from "../../../components/icons/AddIcon";
import DownloadIcon from "../../../components/icons/DownloadIcon";
import Tabs from "../../../components/ui/Tabs";

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

  useEffect(() => {
    async function fetchData() {
      const newSpecimens = await getSpecimens(10);
      //console.log(newSpecimens);
      setSpecimens(newSpecimens);
    }
    //fetchData();
  }, [specie]);

  const handleTabSelection = (e) => {
    const selectedTab = e.target.closest("a");

    if (!selectedTab) {
      return;
    }

    console.log(selectedTab);
    e.preventDefault();

    const activePanelId = selectedTab.getAttribute("href");
  };

  const especimenesRef = useRef(null);
  const metricasRef = useRef(null);

  return (
    <div className="specie-view" ref={especimenesRef}>
      <Specie isListItem={false} specie={specie}></Specie>

      <Tabs className={"divider bg-main"}>
        <div label={"Especímenes"} className="flex-col">
          <div className="test action-bar flex-row align-items-center">
            <LinkButton
              variant={"primary"}
              label="Agregar espécimen"
              icon={<AddIcon />}
            ></LinkButton>
            <Button
              variant={"secondary"}
              label="Descargar .CSV"
              icon={<DownloadIcon />}
            ></Button>
            <div></div>
            <Button variant={"secondary"} label="Administrar columnas"></Button>
            <input
              type="search"
              placeholder="Buscar especies por ID, Estado, Colaborador, etc"
            />
          </div>
          <div id="especimenes">
            <Table></Table>
          </div>
        </div>
        <div label={"Métricas"}>
          <p>Métricas</p>
        </div>
      </Tabs>
    </div>
  );
}
