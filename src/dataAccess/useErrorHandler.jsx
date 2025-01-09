
import flattenObject from "../utils/flattenObject";
import RefreshForm from "../features/auth/components/RefreshForm";
import { useModal } from "../components/contexts/ModalContext";
import HttpStatus from "../stores/httpStatus";
import useSession from "../features/auth/businessLogic/useSession";
export default function useError () {
const {
    showModal,
    closeModal,
} = useModal();
const {
    deleteSession,
    deleteAccessToken,
    getRefreshToken,
    userIsLoggedIn,
} = useSession();
function handleBackendMessage(error) {
    if (
        error.code === "ERR_NETWORK" ||
        error.response.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
        return "No hay conexión";
    }

    return getMessage(error);
}

function getMessage(error) {
    if (error.response?.data?.detail) {
        return error.response?.data?.detail;
    }
    if (error.response?.data?.error) {
        return error.response?.data?.error;
    }
    if (error.response?.data?.message) {
        return error.response?.data?.message;
    } else {
        return flattenObject(error.response.data);
    }
}

function handleUnauthorized() {
    if (!userIsLoggedIn){
        return;
    }

    const userCanRefresh = Boolean(getRefreshToken())

    if (userCanRefresh) {
        deleteAccessToken();
        showModal(
            "La sesión ha expirado",
            <RefreshForm onLogOut={closeModal} />,
            false
        );
    } else {
        deleteSession();
    }

}
return {getMessage, handleBackendMessage, handleUnauthorized}
}