import { useEffect, useState } from "react";
import { api } from "../../../dataAccess/apiClient";
import PHOTOSHEETS_URL from "./photosheetsURL";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";

import Button from "../../../components/ui/Button";
import { SERVER_URL } from "../../../config/env";

export default function usePhotosheets() {
  const [photosheets, setPhotosheets] = useState([]);

  const { showSnackbar } = useSnackbar();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getPhotosheets().then((response) => {
      const newPhotosheets = response.data.map((photosheet) => {
        photosheet.sheet = SERVER_URL.concat(photosheet.sheet);
        return photosheet;
      });
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
    const response = await api.get(PHOTOSHEETS_URL);
    return response;
  }

  const addPhotosheet = async (photosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);
    formData.append("sheet", photosheet.sheet);

    const response = await api.post(PHOTOSHEETS_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.request.status === 201) {
      const newPhotosheet = {
        id: response.data.data.id,
        description: photosheet.description,
        sheet: URL.createObjectURL(photosheet.sheet),
      };
      setPhotosheets((prev) => [newPhotosheet, ...prev]);
    }
  };

  const updatePhotosheet = async (photosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);
    formData.append("sheet", photosheet.sheet);

    const response = await api.put(
      PHOTOSHEETS_URL.concat(`${photosheet.id}/`),
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.request.status === 200) {
      const updatedPhotosheet = {
        id: photosheet.id,
        description: photosheet.description,
        sheet: URL.createObjectURL(photosheet.sheet),
      };
      setPhotosheets((prev) =>
        prev.map((photosheet) =>
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
      <div>
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
    const response = await api.delete(PHOTOSHEETS_URL.concat(photosheetId));
    if (response.request.status === 204) {
      setPhotosheets((prev) =>
        prev.filter((photosheet) => photosheet.id !== photosheetId)
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
