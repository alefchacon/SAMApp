import { SPECIMEN_URL } from "./urls/specimenURL";
import { apiWrapper } from "../../../dataAccess/apiClient";

const updateSpecimen = async (updatedSpecimen) => {
  const body = updatedSpecimen;
  const response = await apiWrapper.put(
    `${SPECIMEN_URL}/${updatedSpecimen.id}/`,
    body
  );
  return response;
};


export default updateSpecimen;