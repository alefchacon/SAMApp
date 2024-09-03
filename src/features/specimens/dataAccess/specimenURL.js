import { SPECIE_URL } from "../../specie/dataAccess/specieURL";

export const SPECIMEN_LIST_VISITOR_URL = (specieId) => SPECIE_URL.concat(`${specieId}/specimen-list-visitor/`);
export const SPECIMEN_LIST_ACADEMIC_URL = (specieId) => SPECIE_URL.concat(`${specieId}/specimen-list-academic/`);
export const SPECIMEN_LIST_URL = (specieId) => SPECIE_URL.concat(`${specieId}/specimens/`);