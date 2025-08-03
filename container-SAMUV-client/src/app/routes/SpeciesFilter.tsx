import React, { useState, useEffect } from "react";
import ResizableDiv from "@/components/ui/ResizableDiv";
import Header from "@/components/ui/Header";
import CardSpecie from "@/features/specie/components/CardSpecie";
import { defaultSpecie, Specie } from "@/features/specie/domain/Specie";
import { FrontendSpecieParams } from "@/routing/FrontendRoutes";
import { useSearchParams } from "react-router-dom";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { ITaxon } from "@/features/specie/domain/Taxon";
import SearchInput from "@/components/ui/SearchInput";
import useTextFilter from "@/hooks/useTextFilter";
import Highlight from "@/components/ui/Highlight";
import { ChevronLeft } from "lucide-react";
import SpecimenMetrics from "@/features/specimens/components/SpecimenMetrics";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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
  taxonName: string;
  rankName: FrontendSpecieParams;
}

export default function SpeciesFilter({
  taxonName,
  rankName,
}: ISpeciesFilterProps) {
  const [selectedFilters, setSelectedFilters] = useState<ITaxon[]>([]);
  const [remainingFilters, setRemainingFilters] = useState<ITaxon[]>([]);
  const [currentTaxonName, setCurrentTaxonName] = useState<string>("");
  const [species, setSpecies] = useState<Specie[]>([]);

  const { getSpeciesByTaxon, getTaxonByName, getOrdens } = useSpecie();
  const [searchParams, setSearchParams] = useSearchParams();

  const [filteredItems, handleFilterChange, filterText, clearFilter] =
    useTextFilter<ITaxon>({
      items: remainingFilters,
    });

  useEffect(() => {
    // getTaxonByName()
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
    const params = new URLSearchParams(searchParams.toString());
    params.delete(rankName);
    params.set(FrontendSpecieParams[newFilter.rank_name], newFilter.taxon_name);
    setSearchParams(params);

    setSelectedFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  const [ordens, setOrdens] = useState<ITaxon[]>();
  const [showTaxonSidebar, setShowTaxonSidebar] = useState<boolean>(true);
  const toggleShowTaxonSidebar = () => setShowTaxonSidebar(!showTaxonSidebar);
  useEffect(() => {
    if (showTaxonSidebar) {
      return;
    }
    setSelectedFilters([]);
    getOrdens().then((ordens) => {
      setOrdens(ordens);
    });
  }, [showTaxonSidebar]);
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
            if (!filter) {
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

  const OrdenSidebar = () => {
    return (
      <div className="p-4">
        {ordens?.map((orden, index) => (
          <TaxonomyFilter
            key={index}
            taxonName={orden.taxon_name}
            rankName={orden.rank_name}
            onClick={() => handleAddFilter(orden)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-row w-full h-full">
      <ResizableDiv className="sticky! top-0 z-10 outline outline-black/8">
        <div className="flex flex-col w-full h-full">
          {showTaxonSidebar ? <TaxonSidebar /> : <OrdenSidebar />}
        </div>
      </ResizableDiv>
      <div
        className={`specie-view rounded-lg outline outline-black/8 bg-white`}
      >
        {" "}
        <Header padding={false} title={currentFilter?.taxon_name}>
          <div>{currentFilter?.rank_name}</div>
        </Header>
        <div className="p-5">
          <Tabs defaultValue="account">
            <TabsList>
              <TabsTrigger value="account">Especies</TabsTrigger>
              <TabsTrigger value="password">Especímenes</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <div className="grid gap-5">
                {species?.map((specie) => (
                  <CardSpecie specie={new Specie(specie)} />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="password">
              <SpecimenMetrics taxonName={taxonName}></SpecimenMetrics>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
