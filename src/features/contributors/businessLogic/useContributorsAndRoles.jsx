import { useEffect, useState } from "react";
import { api } from "../../../dataAccess/apiClient";
import { useSnackbar } from "../../../components/contexts/SnackbarContext";
import { useModal } from "../../../components/contexts/ModalContext";

import Button from "../../../components/ui/Button";
import { SERVER_URL } from "../../../config/env";
import CONTRIBUTORS_URL from "./contributorsURL";

export default function useContributorsAndRoles() {
  const [contributors, setContributors] = useState([]);
  const [contributorRoles, setContributorRoles] = useState([]);

  async function getContributors() {
    const response = await api.get(CONTRIBUTORS_URL);
    setContributors(response.data);
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
      setContributors((prev) => [newPhotosheet, ...prev]);
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
      setContributors((prev) =>
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
      setContributors((prev) =>
        prev.filter((photosheet) => photosheet.id !== photosheetId)
      );
      showSnackbar("La ficha fotográfica se ha eliminado", false, "check");
    }
  };

  const addContributor = async (newContributor = { name: "", code: "" }) => {
    const body = {
      name: newContributor.name,
      code: newContributor.code,
    };
    const response = await api.post(CONTRIBUTORS_URL.concat("/"), body);

    if (response.status === 201) {
      console.log(response.data.instance);
      setContributors((prevSpecies) => [
        response.data.instance,
        ...prevSpecies,
      ]);
    }

    return response;
  };

  return [
    contributors,
    getContributors,
    addContributor,
    /*
    updateContributor,
    roles,
    getRoles,
    addRoles,
    updateRoles,
    */
  ];
}
