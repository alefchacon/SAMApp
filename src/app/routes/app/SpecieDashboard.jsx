import { useState, useEffect } from "react";

import SpecieList from "../../../features/specie/components/SpecieList";
import SpecimenView from "../../../features/specie/components/SpecimenView";
import Table from "../../../components/ui/Table";
import {
  mockGetSpecies,
  getSpecieList,
} from "../../../features/specie/businessLogic/getSpecies";
import Taxonomy from "../../../features/specie/components/Taxonomy";
import Button from "../../../components/ui/Button";
import Tabs from "../../../components/ui/Tabs";
import Uploader from "../../../components/ui/Uploader";
import Header from "../../../components/ui/Header";
import TextField from "../../../components/ui/TextField";

import { api } from "../../../dataAccess/apiClient";

import NewSpecie from "./NewSpecie";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { useStatus } from "../../../components/contexts/StatusContext";
import postSpecie from "../../../features/specie/businessLogic/postSpecie";
import Multigraph from "../../../features/graphing/Multigraph";
import Footer from "../../../components/ui/Footer";
import Specie from "../../../features/specie/components/Specie";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "../../../features/specie/businessLogic/useSpecie";
import Card from "../../../components/ui/Card";

import DATE_TYPES from "../../../features/graphing/dateTypes";
import { FILE_TYPES_STRING } from "../../../stores/fileTypes";
import axios from "axios";
const METRICAS_TAB_KEY = "METRICAS";
import HeaderPage from "../../../components/ui/HeaderPage";

export default function SpecieDashboard({
  onSelectionChange,
  role = ROLE_TYPES.VISITOR,
}) {
  const [species, getSpecies, addSpecie, updateSpecie] = useSpecie();
  const [selectedSpecieId, setSelectedSpecieId] = useState(1);
  const selectedSpecie = species.find(
    (specie) => specie.id === selectedSpecieId
  );
  const [specimens] = useSpecimens(selectedSpecieId);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
  }, []);

  const handleMultiAddSpecie = (species = []) => {
    console.log(species[0]);
    for (let i = 0; i < species[0].length; i++) {
      species[0][
        i
      ].scientific_name = `${species[0][i].gender} ${species[0][i].epithet}`;
      addSpecie(species[0][i]);
    }
  };

  function AddSpecimenButton() {
    return (
      <div className="flex-row gap-1rem">
        <Button
          className={"primary-white"}
          onClick={async () => {
            console.log(await getSpecimens(role, specie.id));
          }}
        >
          Agregar espécimen
        </Button>
        <Button className="secondary-white" iconType="download">
          Descargar especímenes
        </Button>
      </div>
    );
  }

  function MultiAddSpecie() {
    return (
      <Tabs>
        <div label="Una especie">
          <NewSpecie onSubmit={addSpecie} />
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

  const showDeleteSpecieModal = (specieId) => {
    showModal(
      "Eliminar especie",
      <div className="flex-col">
        <p>¿Está seguro de eliminar esta especie?</p>
        <br />
        <p>{selectedSpecie.scientific_name}</p>
        <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>
        <div className="button-row">
          <Button
            iconType="delete"
            className="danger"
            onClick={() => deleteSpecie(specieId)}
          >
            Sí, elimina la especie
          </Button>
        </div>
      </div>
    );
  };

  const showSpecieAddModal = () =>
    showModal("Agregar especie", <MultiAddSpecie />);

  const showSpecieEditModal = (specie) =>
    showModal(
      "Editar especie",
      <NewSpecie specie={specie} onSubmit={handleUpdateSpecie} />
    );

  const handleSelectedSpecieChange = async (newSelectedIndex) => {
    setSelectedSpecieId(newSelectedIndex);
  };

  return (
    <>
      <SpecieList
        role={role}
        species={species}
        onSelectionChange={handleSelectedSpecieChange}
        onAdd={showSpecieAddModal}
        onEdit={showSpecieEditModal}
        onFold={setSpecieListFolded}
      ></SpecieList>
      <div className={`specie-view`}>
        <HeaderPage
          centerText={false}
          title={<i>{selectedSpecie?.epithet}</i>}
          padding={false}
        >
          <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>

          {role === ROLE_TYPES.TECHNICAL_PERSON && (
            <>
              <br />
              <AddSpecimenButton />
            </>
          )}
        </HeaderPage>

        <Tabs className={`divider`}>
          {ROLE_TYPES.validate(role) && (
            <div
              label={"Especímenes"}
              className={`specimens flex-col h-100 p-1rem`}
              style={{ overflow: "auto" }}
            >
              <div className="specimens-controls p-1rem gap-1rem flex-row align-items-center">
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
        <Footer></Footer>
      </div>
    </>
  );
}
