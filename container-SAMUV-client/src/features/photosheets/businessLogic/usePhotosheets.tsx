import React, { useEffect, useState } from "react";
import PHOTOSHEETS_URL from "./photosheetsURL";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";
import useApi from "../../../dataAccess/useApi";

import { Button } from "@/components/ui/button";
import { IPhotosheet, Photosheet } from "../domain/Photosheet";
import TApiParams from "@/dataAccess/domain/TApiParams";
import { defaultCloseParams } from "@/components/contexts/IOnCloseProps";
import { Trash, ArrowLeft } from "lucide-react";
export default function usePhotosheets() {
  const [photosheets, setPhotosheets] = useState<Photosheet[]>([]);

  const { showSnackbar } = useSnackbar();
  const { apiWrapper } = useApi();
  const { showModal, closeModal } = useModal();

  useEffect(() => {
    getPhotosheets().then((response) => {
      const fetchedPhotosheets = response.apiResponse?.data || [];
      console.error(fetchedPhotosheets);
      const newPhotosheets = fetchedPhotosheets.map(
        (photosheet) => new Photosheet(photosheet)
      );
      newPhotosheets.sort(orderByIdDescending);
      setPhotosheets(newPhotosheets);
    });
  }, []);

  const orderByIdDescending = (objectA: IPhotosheet, objectB: IPhotosheet) => {
    if (objectA.id < objectB.id) {
      return 1;
    } else if (objectA.id > objectB.id) {
      return -1;
    }
    return 0;
  };

  async function getPhotosheets() {
    const response = await apiWrapper.get<IPhotosheet[]>({
      url: PHOTOSHEETS_URL,
    });
    return response;
  }

  const addPhotosheet = async (photosheet: IPhotosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);
    formData.append("sheet", photosheet.sheet);

    const payload: TApiParams = {
      url: PHOTOSHEETS_URL,
      body: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };

    const response = await apiWrapper.post<Photosheet>(payload);

    if (response?.success && response.apiResponse) {
      const newPhotosheet = new Photosheet(response.apiResponse.data);
      setPhotosheets((previous) => [newPhotosheet, ...previous]);
    }
  };

  const updatePhotosheet = async (photosheet: IPhotosheet) => {
    let formData = new FormData();
    formData.append("description", photosheet.description);

    //When editing, the pre-edit photosheet is not a blob (binary file), but the image's URL sent by the backnd.
    //If the user updates only the description, then the sheet payload is a URL instead of a blob.
    //Backend rejects non-blob sheets. However, if the user switches the sheet for another, then the sheet
    //becomes a blob. Hence:
    if (photosheet.sheet instanceof Blob) {
      formData.append("sheet", photosheet.sheet);
    }

    const payload: TApiParams = {
      url: PHOTOSHEETS_URL.concat(`${photosheet.id}/`),
      body: formData,
      config: {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    };

    const response = await apiWrapper.put(payload);

    if (response.success) {
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

  const confirmDeletePhotosheet = async (photosheetId: number) => {
    showModal({
      title: "Eliminar ficha fotográfica",
      content: (
        <div className="flex flex-col w-100">
          ¿Está seguro de eliminar la ficha fotográfica?
          <div className="button-row">
            <Button variant={"outline"}>
              <ArrowLeft /> Cancelar
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => deletePhotosheet(photosheetId)}
            >
              <Trash></Trash> Eliminar ficha
            </Button>
          </div>
        </div>
      ),
    });
  };

  const deletePhotosheet = async (photosheetId: number = 0) => {
    closeModal(defaultCloseParams);
    const response = await apiWrapper.delete<IPhotosheet>({
      url: `${PHOTOSHEETS_URL}${photosheetId}/`,
    });
    if (response.success) {
      setPhotosheets((previous) =>
        previous.filter((photosheet) => photosheet.id !== photosheetId)
      );
    }
  };

  return {
    photosheets,
    addPhotosheet,
    updatePhotosheet,
    confirmDeletePhotosheet,
  };
}
