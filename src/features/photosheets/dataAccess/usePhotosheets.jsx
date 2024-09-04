import { useEffect, useState } from "react";
import { api } from "../../../lib/apiClient";
import PHOTOSHEETS_URL from "./photosheetsURL";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";

import Button from "../../../components/ui/Button";

export default function usePhotosheets() {
  const [photosheets, setPhotosheets] = useState([]);

  const { showSnackbar } = useSnackbar();
  const { showModal } = useModal();

  useEffect(() => {
    getPhotosheets().then((response) => {
      const newPhotosheets = response.data;
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
    formData.append("sheet", photosheet.sheet[0]);

    const response = await api.post(PHOTOSHEETS_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (response.request.status === 201) {
      const newPhotosheet = {
        description: photosheet.description,
        sheet: URL.createObjectURL(photosheet.sheet[0]),
      };
      setPhotosheets((prev) => [newPhotosheet, ...prev]);
    }
  };

  const deletePhotosheets = async (photosheetId = 0) => {
    showModal(
      "Eliminar ficha fotográfica",
      <div>
        ¿Está seguro de eliminar la ficha fotográfica?
        <div className="button-row">
          <Button iconType="delete" className="danger">
            Sí, elimínala
          </Button>
        </div>
      </div>
    );
    /*
    const response = await api.delete(PHOTOSHEETS_URL.concat(photosheetId));
    if (response.request.status === 204) {
      setPhotosheets((prev) =>
        prev.filter((photosheet) => photosheet.id !== photosheetId)
      );
      showSnackbar("La ficha fotográfica se ha eliminado", false, "check");
    }
      */
  };

  return [photosheets, addPhotosheet, deletePhotosheets];
}
