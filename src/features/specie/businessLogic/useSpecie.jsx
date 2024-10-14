import { useState, useEffect, useCallback } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api, apiWrapper } from "../../../dataAccess/apiClient";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { SPECIE_IMPORT_URL, SPECIE_URL } from "./specieURL";
import SpecieSerializer from "../domain/specieSerializer";

export const useSpecie = (specieId = 0) => {
  const [species, setSpecies] = useState([]);
  const { profile } = useStatus();

  const getSpecies = async () => {
    api
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
  };

  const postSpecie = async (newSpecie) => {
    const body = {
      class_specie: "Mammalia",
      orden: newSpecie.orden,
      family: newSpecie.family,
      gender: newSpecie.gender,
      specie_specie: newSpecie.specie_specie,
      subspecie: newSpecie.subspecie,
    };
    const response = await apiWrapper.post(SPECIE_URL, body);
    newSpecie.id = response.data.specie_id;
    if (response.status === 201) {
      addSpecieLocal(newSpecie);
    }
  };
  const addSpecieLocal = async (newSpecie) => {
    assignEpithet(newSpecie);
    setSpecies((prevSpecies) => [newSpecie, ...prevSpecies]);
  };
  const assignEpithet = (specie) => {
    specie.epithet = `${specie.gender} ${specie.specie_specie} ${specie.subspecie}`;
  };
  const updateSpecie = useCallback(async (newSpecie) => {
    const response = await api.put(`${SPECIE_URL}/${newSpecie.id}/`, newSpecie);
    console.log(response.status);
    if (response.status === 200) {
      const newSpecies = species.map((specie) =>
        specie.id === newSpecie.id ? newSpecie : specie
      );
      setSpecies(newSpecies);
    }
  });

  const uploadColection = async (species) => {
    api.post(SPECIE_IMPORT_URL, species);
  };

  const selectedSpecieDefault = species[0];

  return {
    species,
    getSpecies,
    postSpecie,
    updateSpecie,
    selectedSpecieDefault,
    uploadColection,
  };
};
