import React, { useState, useEffect } from "react";
import ResizableDiv from "@/components/ui/ResizableDiv";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Header from "@/components/ui/Header";
import Tabs from "@/components/ui/TabsCustom";
import Tab from "@/components/ui/Tab";
import CardSpecie from "@/features/specie/components/CardSpecie";
import { defaultSpecie } from "@/features/specie/domain/Specie";
import { IRank } from "@/features/specie/domain/Rank";
import { useTaxonomy } from "@/features/specie/businessLogic/useTaxonomy";
import { Badge } from "@/components/ui/Badge";
import CardBase from "@/components/ui/CardBase";
import { ChevronRight } from "lucide-react";
interface ITaxonomyFilterProps {
  selected?: boolean;
  filter?: IRank;
  onClick: () => void;
}
const TaxonomyFilter = ({
  selected,
  filter,
  onClick,
}: ITaxonomyFilterProps) => {
  let style =
    "flex h-fit p-4 align-items-center w-full click rounded-sm ransition-colors duration-100";

  if (selected) {
    style = style.concat(" flex-row");
  } else {
    style = style.concat(
      " flex-row gap-4 hover:bg-gray-200 active:bg-gray-300 cursor-pointer "
    );
  }

  const filterNameElement = (
    <span className="w-full h-100 text-md">{filter?.taxon}</span>
  );

  let content;
  if (selected) {
    content = (
      <div className="flex flex-row gap-2 w-full align-items-center opacity-75 justify-center">
        <span className="text-black opacity-50">{filter?.rank}</span>
        <span className="w-full h-100 text-md">{filter?.taxon}</span>
        <Button variant={"destructive"}>
          <Trash></Trash>
        </Button>
      </div>
    );
  } else {
    content = (
      <div className="flex flex-col">
        {filterNameElement}
        <div className="flex flex-row gap-2 opacity-75">
          <span className="h-100 text-md text-sm">
            {filter?.species_count} especies
          </span>
          •
          <span className="h-100 text-md text-sm">
            {filter?.specimen_count} especímenes
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={style} onClick={onClick}>
      {content}
    </div>
  );
};

interface ISearchInputProps {
  placeholder: string;
}
function SearchInput({ placeholder }: ISearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-600" />
      <Input
        type="text"
        placeholder={placeholder}
        className="pl-10" // Adjust padding to make space for the icon
      />
    </div>
  );
}

export default function SpeciesDiscover() {
  const [selectedFilters, setSelectedFilters] = useState<IRank[]>([]);
  const [ranks, setRanks] = useState<{ [key: string]: IRank[] }>();
  const { getRanksPreview } = useTaxonomy();
  useEffect(() => {
    getRanksPreview().then((ranks) => {
      console.error(ranks);
      setRanks(ranks);
    });
  }, []);

  const handleAddFilter = (newFilter: IRank) => {
    newFilter.indexInSelection = selectedFilters.length;
    console.error("newFilter:", newFilter);
    setSelectedFilters((prevFilters) => [...prevFilters, newFilter]);
  };

  const handleRemoveFilters = (filterToRemove: IRank) => {
    if (filterToRemove.indexInSelection === undefined) {
      return;
    }
    setSelectedFilters((prevFilters) => {
      const newFilters = [...prevFilters];
      newFilters.splice(filterToRemove.indexInSelection!, prevFilters.length);
      console.error(newFilters);
      return newFilters;
    });
  };

  if (!ranks) {
    return <>asdf</>;
  }

  return (
    <div className="flex flex-row w-full h-full">
      <ResizableDiv className="sticky! top-0 z-10">
        <div className="flex flex-col w-full h-full">
          <div className="shadow-md p-4 h-fit">
            {selectedFilters.map((filter, index) => {
              if (!filter) {
                return;
              }
              return (
                <TaxonomyFilter
                  selected
                  filter={filter}
                  key={index}
                  onClick={() => handleRemoveFilters(filter)}
                />
              );
            })}
          </div>
        </div>
      </ResizableDiv>
      <div className="bg-white w-full outline outline-black/8 rounded-lg h-fit">
        <Header padding={false} title={"something"}></Header>
        {Object.entries(ranks)?.map(([rank, taxa], index) => (
          <div className="flex flex-col p-4 gap-8" key={index}>
            <h2>{rank}</h2>
            <div className="grid gap-8">
              {taxa.map((taxon, index) => (
                <CardRank rank={taxon} key={index}></CardRank>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface ICardRankProps {
  rank: IRank;
}

function CardRank({ rank }: ICardRankProps) {
  return (
    <CardBase
      title={rank.taxon}
      clickable
      action={<ChevronRight />}
      content={
        <div className="flex flex-row gap-2">
          <Badge variant={"secondary"}>{rank.rank}</Badge>
          <Badge variant={"outline"}>{rank.specimen_count} especímenes</Badge>
        </div>
      }
    ></CardBase>
  );
}
