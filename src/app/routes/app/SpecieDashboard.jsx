import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecimenView from "../../../features/specie/components/SpecimenView";
import Table from "../../../components/ui/Table";
import {
  mockGetSpecies,
  getSpecieList,
} from "../../../features/specie/dataAccess/getSpecies";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";
import Uploader from "../../../components/ui/Uploader";
import Header from "../../../components/ui/Header";
import TextField from "../../../components/ui/TextField";

import NewSpecie from "./NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { useStatus } from "../../../components/contexts/StatusContext";
import addSpecie from "../../../features/specie/dataAccess/addSpecie";
import Multigraph from "../../../features/graphing/Multigraph";
import Footer from "../../../components/ui/Footer";
import Specie from "../../../features/specie/components/Specie";
import { useSpecimens } from "../../../features/specimens/dataAccess/useSpecimens";

import DATE_TYPES from "../../../features/graphing/dateTypes";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";
const METRICAS_TAB_KEY = "METRICAS";

export default function SpecieDashboard({
  onSelectionChange,
  role = ROLE_TYPES.VISITOR,
}) {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [species, setSpecies] = useState([]);
  const selectedSpecie = species.find((specie) => specie.id === selectedIndex);
  const [specimens] = useSpecimens(selectedIndex);

  const { showModal } = useModal();

  const handleAddSpecie = async (newSpecie) => {
    // fkin api call goes here!! :D
    const response = await addSpecie(newSpecie);
    console.log(response.data.specie_id);
    newSpecie.id = response.data.specie_id;
    setSpecies((prev) => [newSpecie, ...prev]);
  };

  const handleUpdateSpecie = (updatedSpecie) => {
    const updatedItems = species.map((specie) =>
      specie.id === updatedSpecie.id ? updatedSpecie : specie
    );
    setSpecies(updatedItems);
  };

  const handleMultiAddSpecie = (species = []) => {
    console.log("ASDF");
    for (let i = 0; i < species.length; i++) {
      species[i].scientific_name = `${species[i].gender} ${species[i].epithet}`;
      handleAddSpecie(species[i]);
    }
  };

  function AddSpecimenButton() {
    return (
      <Button
        variant={"primary"}
        onClick={async () => {
          console.log(await getSpecimens(role, specie.id));
        }}
      >
        Agregar espécimen
      </Button>
    );
  }

  function MultiAddSpecie() {
    return (
      <Tabs>
        <div label="Una especie">
          <NewSpecie onSubmit={handleAddSpecie} />
        </div>
        <div
          label="Múltiples"
          className="flex-row justify-content-center align-items-center"
        >
          <br />
          <Uploader
            accept={FILE_TYPES_STRING.CSV}
            buttonLabel="Agregar especies"
            displayExtension=".CSV"
            multiple
            onUpload={(species) => handleMultiAddSpecie(species)}
          ></Uploader>
        </div>
      </Tabs>
    );
  }

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <MultiAddSpecie />);

  const showSpecieEditModal = (specie) =>
    showModal(
      "Editar especie",
      <NewSpecie specie={specie} onSubmit={handleUpdateSpecie} />
    );

  useEffect(() => {
    async function fetchSpecies() {
      //const species = await mockGetSpecies();
      const species = (await getSpecieList()).data;
      setSpecies(species);
    }
    fetchSpecies();
  }, []);

  const handleSelectedSpecieChange = async (newSelectedIndex) => {
    setSelectedIndex(newSelectedIndex);
  };

  function SpecieButtons() {
    return (
      <div className="flex-row gap-1rem justify-content-center">
        <Button
          className={"secondary"}
          iconType="edit"
          onClick={() => showSpecieEditModal(selectedSpecie)}
        >
          Editar especie
        </Button>

        <Button className={"secondary danger"} iconType={"delete"}>
          Eliminar especie
        </Button>
      </div>
    );
  }

  return (
    <>
      <SpecieList
        role={role}
        species={species}
        onSelectionChange={handleSelectedSpecieChange}
        onAdd={showSpecieAddModal}
        onEdit={showSpecieEditModal}
      ></SpecieList>
      <div className="specie-view">
        <Header
          header={selectedSpecie?.scientific_name ?? "asdf"}
          isListItem={false}
          specie={selectedSpecie}
          onEdit={showSpecieEditModal}
        >
          <Taxonomy specie={selectedSpecie}></Taxonomy>
        </Header>

        <Tabs
          className={"divider"}
          buttons={role === ROLE_TYPES.TECHNICAL_PERSON && <SpecieButtons />}
        >
          {ROLE_TYPES.validate(role) && (
            <div
              label={"Especímenes"}
              className="specimens flex-col h-100"
              style={{ overflow: "auto" }}
            >
              <div className="specimens-controls p-1rem gap-1rem flex-row align-items-center">
                <TextField
                  maxWidth={"60%"}
                  iconType={"search"}
                  placeholder={
                    "Buscar especímenes por IDs, estado, nombre de colaborador(es)..."
                  }
                ></TextField>
                {role === ROLE_TYPES.TECHNICAL_PERSON && <AddSpecimenButton />}
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

        <Footer></Footer>
      </div>
    </>
  );
}
