import { SPECIE_URL } from "./specieURL";
import { api } from "../../../lib/apiClient";

const PREREQUEST_MESSAGE = "Agregando especie..." 

const addSpecie = async (specie) => {
  const data = {
    scientific_name: specie.scientific_name,
    class_specie: "Mammalia",
    orden: specie.orden,
    family: specie.family,
    gender: specie.gender,
    epithet: specie.epithet,
    subspecie: specie.subspecie,
  }

  const response = await api.post(SPECIE_URL, data, {cancelable: true, message: PREREQUEST_MESSAGE});
  console.log(response);
  return response;
} 

export default addSpecie;