import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Specie from "./Specie";
import Table from "../../../components/ui/Table";
import AddIcon from "../../../components/icons/AddIcon";
import DownloadIcon from "../../../components/icons/DownloadIcon";

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

  return (
    <div className="specie-view">
      <Specie isListItem={false} specie={specie}></Specie>
      <div className="test action-bar flex-row align-items-center">
        <Button
          variant={"primary"}
          label="Agregar espécimen"
          icon={<AddIcon />}
        ></Button>
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
      <Table></Table>
    </div>
  );
}
