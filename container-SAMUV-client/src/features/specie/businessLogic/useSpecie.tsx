import { useState, useCallback } from "react";
import useApi from "../../../dataAccess/useApi";
import {
  SPECIE_MIGRATE_URL,
  SPECIE_URL,
  TAXONOMY_RANKS_URL,
} from "./specieUrl";
import { ISpecie, Specie } from "../domain/Specie";
import { AxiosError } from "axios";
import useDownload from "../../../hooks/useDownload";
import { ITaxonomyRanks } from "../domain/ITaxonomyRanks";

export const useSpecie = () => {
  const [species, setSpecies] = useState<Specie[]>([]);
  const download = useDownload();

  const { apiWrapper } = useApi();

  const getSpecies = useCallback(async () => {
    apiWrapper.get<Specie[]>({ url: SPECIE_URL }).then((response) => {
      if (!response.success || !response.data) {
        setSpecies([]);
        return;
      }

      const species = response.data.map((specie) => new Specie(specie));
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
      //return response.error.response.data.errors;
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

  return {
    species,
    getSpecies,
    addSpecie,
    updateSpecie,
    selectedSpecieDefault,
    migrateColection,
    getTaxonomyRanks,
    downloadMigrationFormat,
  };
};
