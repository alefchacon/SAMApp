import { useState, useEffect, useCallback } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import useApi from "../../../dataAccess/useApi";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import {
  SPECIE_MIGRATE_URL,
  SPECIE_URL,
  TAXONOMY_RANKS_URL,
} from "./specieURL";
import SpecieSerializer from "../domain/specieSerializer";
import { AxiosError } from "axios";
import useDownload from "../../../hooks/useDownload";

export const useSpecie = (specieId = 0) => {
  const [species, setSpecies] = useState([]);
  const { profile } = useStatus();
  const download = useDownload();

  const { apiWrapper } = useApi();

  const getSpecies = useCallback(async () => {
    apiWrapper
      .get(SPECIE_URL, {
        requestName: "getSpecie",
        cancelable: false,
      })
      .then((response) => {
        // build epithet:
        const species = response.data.map(
          (specie) => new SpecieSerializer(specie)
        );
        console.log(species);
        setSpecies(species);
      });
  });

  const postSpecie = useCallback(async (newSpecie) => {
    const response = await apiWrapper.post(
      `${SPECIE_URL}/`,
      new SpecieSerializer(newSpecie)
    );
    newSpecie.id = response.data.specie_id;
    if (response.status === 201) {
      addSpecieLocal(newSpecie);
    }
  });
  const addSpecieLocal = async (newSpecie) => {
    assignEpithet(newSpecie);
    setSpecies((prevSpecies) => [newSpecie, ...prevSpecies]);
  };
  const assignEpithet = (specie) => {
    specie.epithet = `${specie.gender} ${specie.specie_specie} ${specie.subspecie}`;
  };
  const updateSpecie = useCallback(async (newSpecie) => {
    const response = await apiWrapper.put(
      `${SPECIE_URL}/${newSpecie.id}/`,
      newSpecie
    );
    if (response.status === 200) {
      const newSpecies = species.map((specie) =>
        specie.id === newSpecie.id ? newSpecie : specie
      );
      setSpecies(newSpecies);
    }
  });

  const migrateColection = useCallback(async (species) => {
    const response = await apiWrapper.post(`${SPECIE_MIGRATE_URL}`, species, {
      noSnackbar: true,
      getError: true,
    });

    if (response instanceof AxiosError) {
      return response.response.data.errors;
    }
  });

  const getTaxonomyRanks = useCallback(async () => {
    return await apiWrapper.get(TAXONOMY_RANKS_URL);
  });

  const downloadMigrationFormat = useCallback(async () => {
    const response = await apiWrapper.get(SPECIE_MIGRATE_URL);
    download(response.data, "text/csv", "SAM_MIGRACION.csv");
  });

  const selectedSpecieDefault = species[0];

  return {
    species,
    getSpecies,
    postSpecie,
    updateSpecie,
    selectedSpecieDefault,
    migrateColection,
    getTaxonomyRanks,
    downloadMigrationFormat,
  };
};
