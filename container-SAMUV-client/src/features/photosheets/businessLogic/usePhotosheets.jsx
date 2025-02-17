import { useEffect, useState } from "react";
import PHOTOSHEETS_URL from "./photosheetsURL";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";
import useApi from "../../../dataAccess/useApi";

import Button from "../../../components/ui/Button";
import HttpStatus from "../../../stores/httpStatus";
import Photosheet from "../domain/photosheet";

export default function usePhotosheets() {
  const [photosheets, setPhotosheets] = useState([]);

  const { showSnackbar } = useSnackbar();
  const { apiWrapper } = useApi();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getPhotosheets().then((response) => {
      const newPhotosheets = response.data.map((photosheet) => new Photosheet(photosheet));
      newPhotosheets.sort(orderByIdDescending);
      setPhotosheets(newPhotosheets);
    });
  }, []);

  const orderByIdDescending = (objectA, objectB) => {
    if (objectA.id < objectB.id) {
      return 1;
    } else if (objectA.id > objectB.id) {
      return -1;
    }
    return 0;
  };

  async function getPhotosheets() {
    const response = await apiWrapper.get(PHOTOSHEETS_URL);
    return response;
  }

  const addPhotosheet = async (photosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);
    formData.append("sheet", photosheet.sheet);

    const response = await apiWrapper.post(PHOTOSHEETS_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (response?.request?.status === HttpStatus.CREATED) {
      const newPhotosheet = new Photosheet(response?.data.data);
      setPhotosheets((previous) => [newPhotosheet, ...previous]);
    }
  };

  const updatePhotosheet = async (photosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);

    //When editing, the pre-edit photosheet is not a blob (binary file), but the image's URL sent by the backnd.
    //If the user updates only the description, then the sheet payload is a URL instead of a blob.
    //Backend rejects non-blob sheets. However, if the user switches the sheet for another, then the sheet
    //becomes a blob. Hence:
    if (photosheet.sheet instanceof Blob) {
      formData.append("sheet", photosheet.sheet);
    }

    const response = await apiWrapper.put(
      PHOTOSHEETS_URL.concat(`${photosheet.id}/`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.request.status === HttpStatus.OK) {
      const updatedPhotosheet = new Photosheet(photosheet);
      setPhotosheets((previous) =>
        previous.map((photosheet) =>
          photosheet.id === updatedPhotosheet.id
            ? updatedPhotosheet
            : photosheet
        )
      );
    }
  };

  const confirmDeletePhotosheet = async (photosheetId = 0) => {
    showModal(
      "Eliminar ficha fotográfica",
      <div className="flex-col w-100">
        ¿Está seguro de eliminar la ficha fotográfica?
        <div className="button-row">
          <Button
            iconType="delete"
            className="danger"
            value={photosheetId}
            onClick={deletePhotosheet}
          >
            Sí, elimínala
          </Button>
        </div>
      </div>
    );
  };

  const deletePhotosheet = async (photosheetId = 0) => {
    closeModal();
    const response = await apiWrapper.delete(
      `${PHOTOSHEETS_URL}${photosheetId}/`
    );
    if (response.request.status === HttpStatus.NO_CONTENT) {
      setPhotosheets((previous) =>
        previous.filter((photosheet) => photosheet.id !== photosheetId)
      );
      showSnackbar("La ficha fotográfica se ha eliminado", false, "check");
    }
  };

  return [
    photosheets,
    addPhotosheet,
    updatePhotosheet,
    confirmDeletePhotosheet,
  ];
}
