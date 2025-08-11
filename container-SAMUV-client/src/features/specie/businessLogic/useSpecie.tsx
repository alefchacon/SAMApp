import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import {
  METRICS_URL,
  ORDENS_URL,
  SPECIE_BY_TAXON_URL,
  SPECIE_MIGRATE_URL,
  SPECIE_SEARCH_URL,
  SPECIE_URL,
  TAXON_URL,
  TAXONOMY_RANKS_URL,
} from "./specieUrl";
import { ISpecie, Specie } from "../domain/Specie";
import { AxiosError } from "axios";
import useDownload from "../../../hooks/useDownload";
import { ITaxonomyRanks } from "../domain/ITaxonomyRanks";
import { IMatch, IMatches, Matches } from "../domain/Match";
import { ITaxon } from "../domain/Taxon";
import { IMetrics } from "@/features/specimens/domain/model/Metrics";

export const useSpecie = () => {
  const [species, setSpecies] = useState<Specie[]>([]);
  const download = useDownload();

  const { apiWrapper } = useApi();

  const getSpecies = useCallback(async () => {
    apiWrapper.get<Specie[]>({ url: SPECIE_URL }).then((response) => {
      if (!response.success || !response.apiResponse?.data) {
        setSpecies([]);
        return;
      }

      const species = response.apiResponse.data.map(
        (specie) => new Specie(specie)
      );
      setSpecies(species);
    });
  }, []);

  const addSpecie = useCallback(async (newSpecie: Specie) => {
    const response = await apiWrapper.post<Specie>({
      url: `${SPECIE_URL}/`,
      body: new Specie(newSpecie),
    });

    if (!response.success) {
      return;
    }

    // DEV ONLY: change back so it returns full DTO instead of just id.
    //newSpecie.id = response.data!.specie_id;
    setSpecies((previousSpecies) => [newSpecie, ...previousSpecies]);
  }, []);

  const updateSpecie = useCallback(async (newSpecie: Specie) => {
    const response = await apiWrapper.put({
      url: `${SPECIE_URL}/${newSpecie.id}/`,
      body: newSpecie,
    });

    if (!response.success) {
      return;
    }

    const newSpecies = species.map((specie) =>
      specie.id === newSpecie.id ? newSpecie : specie
    );
    setSpecies(newSpecies);
  }, []);

  const migrateColection = useCallback(async (species: Specie[]) => {
    const config = {
      noSnackbar: true,
      /*
        configuring apiWrapper to return the error instead of 
        displaying it with Snackbar:
      */
      getError: true,
    };

    const response = await apiWrapper.post({
      url: `${SPECIE_MIGRATE_URL}`,
      body: species,
      config: config,
    });

    if (
      !response.success &&
      response.error &&
      response.error instanceof AxiosError
    ) {
      // DEV ONLY: figure out how to destructure errors here:
      return response.error.response.data.errors;
    }
  }, []);

  const getTaxonomyRanks = useCallback(async () => {
    return await apiWrapper.get<ITaxonomyRanks>({ url: TAXONOMY_RANKS_URL });
  }, []);

  const downloadMigrationFormat = useCallback(async () => {
    const response = await apiWrapper.get({ url: SPECIE_MIGRATE_URL });
    download({
      file: response.data as string, // DEV ONLY: check cast if this works
      type: "text/csv",
      filename: "SAM_MIGRACION.csv",
    });
  }, []);

  const selectedSpecieDefault = species ? species[0] : null;

  const searchSpecies = async (taxon: string): Promise<Matches> => {
    const result = await apiWrapper.get<Matches>({
      url: SPECIE_SEARCH_URL(taxon),
    });
    if (result.success && result.apiResponse?.data) {
      return new Matches(result.apiResponse.data);
    } else {
      throw new Error("DEV ONLY");
    }
  };

  const getSpeciesByTaxon = async ({
    taxon = "",
    query = "",
  }): Promise<Specie[]> => {
    const result = await apiWrapper.get<Specie[]>({
      url: SPECIE_BY_TAXON_URL({ taxon, query }),
    });
    console.error(result);
    if (result.success && result.apiResponse?.data) {
      return result.apiResponse.data;
    } else {
      throw new Error("DEV ONLY");
    }
  };

  const getTaxonByName = async (name: string): Promise<ITaxon> => {
    const result = await apiWrapper.get<ITaxon>({
      url: TAXON_URL(name),
    });
    if (result.success && result.apiResponse?.data) {
      return result.apiResponse.data;
    } else {
      throw new Error("DEV ONLY");
    }
  };

  const getMetricsByTaxonName = async (name: string): Promise<IMetrics> => {
    const result = await apiWrapper.get<IMetrics>({
      url: METRICS_URL(name),
    });
    if (result.success && result.apiResponse?.data) {
      return result.apiResponse.data;
    } else {
      throw new Error("DEV ONLY");
    }
  };

  const getOrdens = async (): Promise<ITaxon[]> => {
    const result = await apiWrapper.get<ITaxon[]>({
      url: ORDENS_URL,
    });
    if (result.success && result.apiResponse?.data) {
      return result.apiResponse.data;
    } else {
      throw new Error("DEV ONLY");
    }
  };

  const getSpecie = async (specieId: number): Promise<Specie> => {
    const result = await apiWrapper.get<ISpecie>({
      url: `${SPECIE_URL}/${specieId}`,
    });
    if (result.success && result.apiResponse?.data) {
      return new Specie(result.apiResponse.data);
    } else {
      throw new Error("DEV ONLY");
    }
  };

  return {
    species,
    getSpecies,
    addSpecie,
    updateSpecie,
    selectedSpecieDefault,
    migrateColection,
    getTaxonomyRanks,
    downloadMigrationFormat,
    searchSpecies,
    getSpeciesByTaxon,
    getTaxonByName,
    getMetricsByTaxonName,
    getOrdens,
    getSpecie,
  };
};
