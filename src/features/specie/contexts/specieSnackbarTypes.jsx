// ICONS
import UndoIcon from "../../../components/icons/UndoIcon";
import RestartIcon from "../../../components/icons/RestartIcon";
// API CALLS
import { deleteSpecie } from "../api/deleteSpecie";

const modelName = "especie";

export const specieSnackbarTypes = {
  addSpecieSuccess: {
    message: "Especie agregada",
    labelAction: "Deshacer",
    action: deleteSpecie,
    icon: <UndoIcon />,
  },
  addSpecieError: {
    message: "No se pudo procesar su solicitud.",
    labelAction: "Reintentar",
    action: deleteSpecie,
    icon: <RestartIcon />,
  },
};
