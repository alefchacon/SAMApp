import React, { useState, useEffect } from "react";
import { useSpecie } from "@/features/specie/businessLogic/useSpecie";

import Header from "@/components/ui/Header";
import { useParams } from "react-router-dom";
import { IMatch, IMatches } from "@/features/specie/domain/Match";
import CardSpecie from "@/features/specie/components/CardSpecie";
import SearchInput from "@/components/ui/SearchInput";
import { rankDisplayNames } from "@/features/specie/util/rankDisplayNames";
import useSearch from "@/features/specie/businessLogic/useSearch";
import CardBase from "@/components/ui/CardBase";
import { useNavigate } from "react-router-dom";
import { FrontendSpecieParams } from "@/routing/FrontendRoutes";
interface ISearchProps {
  query: string;
}
export default function Search({ query }: ISearchProps) {
  const { searchSpecies: getSpeciesByTaxon } = useSpecie();
  const { search } = useSearch();
  const { specieId } = useParams();
  const [matches, setMatches] = useState<IMatches>();
  const navigate = useNavigate();

  useEffect(() => {
    if (!query) {
      return;
    }
    getSpeciesByTaxon(query).then((results) => {
      setMatches(results);
    });
  }, [query]);

  return (
    <>
      <div
        className={`specie-view rounded-lg outline outline-black/8 bg-white`}
      >
        <Header sticky padding={false}>
          <div className="page-padding">
            <SearchInput onSubmit={search}></SearchInput>
          </div>
        </Header>
        <div className="page-padding">
          <div className="flex flex-col gap-5 p-5">
            <h2>Especies</h2>
            <div className="grid gap-5">
              {matches?.species.map((match, index) => (
                <CardSpecie
                  canNavigate
                  key={index}
                  specie={match}
                  filterText={query}
                ></CardSpecie>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5 p-5">
            <h2>Rangos taxonómicos</h2>
            <div className="flex flex-col gap-5">
              {matches?.taxa.map((match, index) => (
                <div className="flex flex-col gap-5" key={index}>
                  <div>{rankDisplayNames[match.rank_name]}</div>
                  <div className="grid gap-5">
                    {match.taxa_names.map((taxon) => (
                      <CardBase
                        title={taxon}
                        clickable
                        onClick={() =>
                          navigate(
                            `?${FrontendSpecieParams[match.rank_name]}=${taxon}`
                          )
                        }
                      ></CardBase>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
