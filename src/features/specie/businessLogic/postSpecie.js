import { SPECIE_URL } from "./specieURL";
import { api } from "../../../dataAccess/apiClient";

const PREREQUEST_MESSAGE = "Agregando especie..." 

const postSpecie = async (specie) => {
  const data = {
    specie_specie: specie.specie_specie,
    class_specie: "Mammalia",
    orden: specie.orden,
    family: specie.family,
    gender: specie.gender,
    epithet: specie.epithet,
    subspecie: specie.subspecie,
  }

  const response = await api.post(SPECIE_URL, data, {cancelable: true, message: PREREQUEST_MESSAGE});

  return response;
} 

export default postSpecie;