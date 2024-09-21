import { useState, useEffect } from "react";
import { useStatus } from "../../../components/contexts/StatusContext";
import { api, apiWrapper } from "../../../dataAccess/apiClient";
import { ROLE_TYPES } from "../../../stores/roleTypes";
import { SPECIE_URL } from "./specieURL";
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
        for (let i = 0; i < response.data.length; i++) {
          assignEpithet(response.data[i]);
        }
        setSpecies(response.data);
      });
  };

  const addSpecie = async (newSpecie) => {
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
  const updateSpecie = async (newSpecie) => {};

  return [species, getSpecies, addSpecie, updateSpecie];
};
