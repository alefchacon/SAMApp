import React, { useState, useEffect, useMemo, Component } from "react";

import SpecieSidebar from "../../../features/specie/components/SpecieSidebar";

import EditableTable from "../../../components/ui/table/EditableTable";
import Taxonomy from "../../../features/specie/components/Taxonomy";
// import Button from "../../../components/ui/Button";

import SpecieForm from "@/features/specie/components/SpecieForm";

import { useModal } from "../../../components/contexts/ModalContext";
import { ROLE_TYPES, UserRoles } from "../../../stores/EUserRoles";
import Multigraph from "../../../features/graphing/components/Multigraph";
import { useSpecimens } from "../../../features/specimens/businessLogic/useSpecimens";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";

import DATE_TYPES, { DateTypes } from "@/features/graphing/stores/dateTypes";
import Header from "@/components/ui/Header";
import NoResults from "../../../components/ui/NoResults";
import { useNavigate } from "react-router-dom";
import FrontendRoutes from "@/routing/FrontendRoutes";
import editableSpecimenColumns from "../../../features/specimens/EditableSpecimenColumns";
import Map from "@/features/mapping/components/Map";
import { useParams } from "react-router-dom";
import { Specie, defaultSpecie } from "@/features/specie/domain/Specie";
import Tab from "@/components/ui/Tab";
import { Button } from "@/components/ui/button";
import { Plus, Download, PawPrint, Edit } from "lucide-react";
import useSwitchSpecie from "@/features/specimens/businessLogic/useSwitchSpecie";
import useDeleteSpecimen from "@/features/specimens/businessLogic/useDeleteSpecimen";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import SpecimenMetrics from "@/features/specimens/components/SpecimenMetrics";

const METRICS_TAB_ID = "METRICAS";
const SPECIMENS_TAB_ID = "METRICAS";

interface ISpecieDashboardProps {
  role: UserRoles;
  onSpecieSelection: (selectedSpecie: Specie) => void;
}
export default function SpecieDashboard(props: ISpecieDashboardProps) {
  const { role, onSpecieSelection } = props;

  const {
    species,
    getSpecies,
    addSpecie,
    updateSpecie,
    selectedSpecieDefault,
  } = useSpecie();
  const navigate = useNavigate();
  const { specieId } = useParams();

  const [selectedSpecieId, setSelectedSpecieId] = useState(
    Number(specieId) ?? 0
  );

  const selectedSpecie: Specie = useMemo(
    () =>
      species?.find((specie) => specie.id === selectedSpecieId) ??
      defaultSpecie,
    [selectedSpecieId]
  );

  useEffect(() => {
    if (!selectedSpecie) {
      return;
    }
    // DEV ONLY: fix navigation
    //navigate(`/${FrontendRoutes.COLLECTION}/${selectedSpecie?.id}`);
    onSpecieSelection(selectedSpecie);
  }, [selectedSpecie]);

  const { specimens, downloadSpecimens, deleteSpecimen } =
    useSpecimens(selectedSpecie);
  const [specieListFolded, setSpecieListFolded] = useState(false);

  const { dialogSwitchSpecie, setSpecimenToSwitch } = useSwitchSpecie({
    species: species,
  });

  const { dialogDeleteSpecimen, setSpecimenToDelete } = useDeleteSpecimen();

  const { showModal } = useModal();

  useEffect(() => {
    getSpecies();
    // DEV ONLY: check if this dep array works the same as []
  }, [getSpecies]);

  const navigateToAddSpecimen = () =>
    navigate(`${FrontendRoutes.ADD_SPECIMEN}`, {
      state: {
        specie: selectedSpecie,
        currentSpecimenId: specimens[specimens.length - 1]?.id || 0,
      },
    });

  function TechnicalPersonButtons() {
    if (!(role === ROLE_TYPES.TECHNICAL_PERSON)) {
      return null;
    }

    return (
      <div className="flex flex-row gap-3 flex-wrap h-fit">
        <Button onClick={navigateToAddSpecimen}>
          <PawPrint></PawPrint> Agregar espécimen
        </Button>

        <Button onClick={downloadSpecimens} variant={"outline"}>
          <Edit></Edit> Editar especie
        </Button>

        <Button onClick={downloadSpecimens} variant={"outline"}>
          <Download></Download> Descargar especímenes
        </Button>
      </div>
    );
  }

  const showSpecieAddModal = () =>
    showModal({
      title: "Agregar especie",
      content: <SpecieForm onSubmit={addSpecie} />,
    });

  const showSpecieUpdateModal = (specie: Specie) => {
    showModal({
      title: "Editar especie",
      content: <SpecieForm specie={specie} onSubmit={updateSpecie} isUpdate />,
    });
  };

  const handleSelectedSpecieChange = async (newSelectedIndex: number) => {
    setSelectedSpecieId(newSelectedIndex);
  };

  const memoizedTable = useMemo(
    () => (
      <EditableTable
        isTechnicalPerson={role === ROLE_TYPES.TECHNICAL_PERSON}
        data={specimens}
        defaultColumns={editableSpecimenColumns(
          setSpecimenToSwitch,
          setSpecimenToDelete
        )}
      ></EditableTable>
    ),
    [specimens]
  );

  return (
    <>
      <SpecieSidebar
        role={role}
        species={species}
        onSelectionChange={handleSelectedSpecieChange}
        selectedSpecieId={selectedSpecieId}
        onAdd={showSpecieAddModal}
        onEdit={showSpecieUpdateModal}
        onAddSpecimen={navigateToAddSpecimen}
        onFold={setSpecieListFolded}
      ></SpecieSidebar>
      <div
        className={`specie-view rounded-lg outline outline-black/8 bg-white`}
      >
        {dialogSwitchSpecie}
        {dialogDeleteSpecimen}
        <Header
          title={<i>{selectedSpecie?.epithet}</i>}
          padding={false}
          rightContent={<TechnicalPersonButtons />}
        >
          <Taxonomy specie={selectedSpecie} center={false}></Taxonomy>
        </Header>

        {specimens?.length > 0 ? (
          <Tabs defaultValue="specimens" className="h-100 gap-0">
            <div className="px-5 py-3">
              <TabsList>
                <TabsTrigger value="specimens">Especímenes</TabsTrigger>
                <TabsTrigger value="metrics">Métricas</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="specimens" className="h-100">
              <EditableTable
                isTechnicalPerson={role === ROLE_TYPES.TECHNICAL_PERSON}
                data={specimens}
                defaultColumns={editableSpecimenColumns(
                  setSpecimenToSwitch,
                  setSpecimenToDelete
                )}
              ></EditableTable>
            </TabsContent>
            <TabsContent value="metrics" className="px-5 pb-5">
              <SpecimenMetrics
                taxonName={selectedSpecie.epithet}
                specimens={specimens}
              ></SpecimenMetrics>
            </TabsContent>
          </Tabs>
        ) : (
          <NoResults itemName="especímenes" />
        )}
      </div>
    </>
  );
}
