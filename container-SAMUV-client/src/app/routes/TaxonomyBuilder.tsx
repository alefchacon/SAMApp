import React, { useState, useEffect } from "react";
import ResizableDiv from "@/components/ui/ResizableDiv";
import Header from "@/components/ui/Header";
import CardSpecie from "@/features/specie/components/CardSpecie";
import { defaultSpecie, Specie } from "@/features/specie/domain/Specie";
import FrontendRoutes, { FrontendSpecieParams } from "@/routing/FrontendRoutes";
import { useSearchParams, useParams } from "react-router-dom";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ITaxon } from "@/features/specie/domain/Taxon";
import SearchInput from "@/components/ui/SearchInput";
import useTextFilter from "@/hooks/useTextFilter";
import Highlight from "@/components/ui/Highlight";
import { ChevronLeft } from "lucide-react";
import SpecimenMetrics from "@/features/specimens/components/SpecimenMetrics";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import Taxonomy from "@/features/specie/components/Taxonomy";
interface ITaxonomyFilterProps {
  selected?: boolean;
  rankName?: string;
  onClick: () => void;
  taxonName: React.ReactNode | string;
}
const TaxonomyFilter = ({
  selected,
  rankName,
  taxonName,

  onClick,
}: ITaxonomyFilterProps) => {
  let style =
    "flex h-fit p-4 align-items-center w-full click rounded-sm transition-colors duration-100 flex-row gap-4 hover:bg-gray-200 active:bg-gray-300 cursor-pointer";

  return (
    <div className={style} onClick={onClick}>
      <div className="flex flex-row gap-4 w-full align-items-center opacity-75 justify-center">
        <span className="text-black opacity-50">{rankName}</span>
        <span className="w-full h-100 text-md">{taxonName}</span>
      </div>
    </div>
  );
};

interface ISpeciesFilterProps {
  taxonName?: string;
  rankName?: FrontendSpecieParams;
}

export default function TaxonomyBuilder({
  taxonName,
  rankName,
}: ISpeciesFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<ITaxon[]>([]);
  const [remainingFilters, setRemainingFilters] = useState<ITaxon[]>([]);
  const [currentTaxonName, setCurrentTaxonName] = useState<string>("");
  const [species, setSpecies] = useState<Specie[]>([]);
  const [specie, setSpecie] = useState<Specie>();

  const { specieId } = useParams();
  const viewSingleSpecie = Boolean(specieId);

  const location = useLocation();
  const cachedSpecie = location.state as Specie;

  const { getSpeciesByTaxon, getTaxonByName, getSpecie } = useSpecie();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter<ITaxon>({
      items: remainingFilters,
    });

  useEffect(() => {
    if (!specieId) {
      return;
    }

    let specie: Specie;
    if (cachedSpecie) {
      specie = new Specie(cachedSpecie);
      setSpecie(specie);
      return;
    }

    getSpecie(Number(specieId)).then((specie) => {
      setSpecie(specie);
    });
  }, []);

  useEffect(() => {
    if (!specie) {
      return;
    }

    const selectedFilters: ITaxon[] = [];
    Object.entries(specie).map(([key, value]) => {
      if (Object.keys(FrontendSpecieParams).includes(key)) {
        const newTaxon: ITaxon = {
          rank_name: key as FrontendSpecieParams,
          taxon_name: value,
        };
        selectedFilters.push(newTaxon);
      }
    });

    setSelectedFilters(selectedFilters);
  }, [specie]);

  useEffect(() => {
    if (!taxonName) {
      return;
    }

    setCurrentTaxonName(taxonName);
    getTaxonByName(taxonName).then((data) => {
      if (!data.parent_ranks || !data.children_ranks) {
        return;
      }
      setSelectedFilters([...data.parent_ranks, data]);
      setRemainingFilters(data.children_ranks);
    });
    getSpeciesByTaxon({ taxon: rankName, query: taxonName }).then((species) => {
      setSpecies(species);
    });
  }, [searchParams]);

  const currentFilter = selectedFilters[selectedFilters.length - 1];

  const handleAddFilter = (newFilter: ITaxon) => {
    if (currentTaxonName === newFilter.taxon_name) {
      return;
    }
    navigate(
      `/${FrontendRoutes.SPECIES}?${
        FrontendSpecieParams[newFilter.rank_name]
      }=${newFilter.taxon_name}`
    );
  };

  const navigate = useNavigate();

  const TaxonSidebar = () => {
    return (
      <div>
        <div className="shadow-md p-4 h-fit sticky top-0 z-10 bg-gray-50 ">
          <div className="flex flex-row items-center justify-between">
            <Button variant={"ghost"} onClick={() => navigate("/species")}>
              <ChevronLeft></ChevronLeft>
            </Button>
            <p className="font-semibold">
              Rangos en {selectedFilters[0]?.taxon_name}
            </p>
            <div></div>
          </div>
          {selectedFilters.map((filter, index) => {
            if (!filter || !filter.taxon_name) {
              return;
            }
            return (
              <TaxonomyFilter
                selected
                rankName={filter.rank_name}
                taxonName={filter.taxon_name}
                key={index}
                onClick={() => handleAddFilter(filter)}
              />
            );
          })}
        </div>
        <div className="p-3">
          <div className="flex flex-col gap-3">
            <div>
              {filteredItems.map((filter, index) => {
                return (
                  <TaxonomyFilter
                    key={index}
                    rankName={filter.rank_name}
                    taxonName={
                      <Highlight
                        text={filter?.taxon_name || ""}
                        highlight={filterText}
                      ></Highlight>
                    }
                    onClick={() => handleAddFilter(filter)}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const speciesViewer = (
    <div className={`specie-view rounded-lg outline outline-black/8 bg-white`}>
      {" "}
      <Header padding={false} title={currentFilter?.taxon_name}>
        <div>{currentFilter?.rank_name}</div>
      </Header>
      <div className="p-5 h-100">
        <Tabs defaultValue="species" className="h-100">
          <TabsList>
            <TabsTrigger value="species">Especies</TabsTrigger>
            <TabsTrigger value="specimens">Especímenes</TabsTrigger>
          </TabsList>
          <TabsContent value="species">
            <div className="grid gap-5">
              {species?.map((specie, index) => (
                <CardSpecie
                  canNavigate
                  specie={new Specie(specie)}
                  key={index}
                />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="specimens" className="pb-5">
            <SpecimenMetrics taxonName={taxonName}></SpecimenMetrics>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  const specieViewer = (
    <div className={`specie-view rounded-lg outline outline-black/8 bg-white`}>
      <Header padding={false} title={<i>{specie?.epithet}</i>}>
        <div>{currentFilter?.rank_name}</div>
        <Taxonomy specie={specie} center={false}></Taxonomy>
      </Header>
      <div className="p-5 h-100">
        <SpecimenMetrics taxonName={specie?.epithet}></SpecimenMetrics>
      </div>
    </div>
  );

  return (
    <div className="flex flex-row w-full h-full">
      <ResizableDiv className="sticky! top-0 z-10 outline outline-black/8">
        <div className="flex flex-col w-full h-full">
          <TaxonSidebar />
        </div>
      </ResizableDiv>
      <>{viewSingleSpecie ? specieViewer : speciesViewer}</>
    </div>
  );
}
