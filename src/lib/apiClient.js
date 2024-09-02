import axios from "axios";
import { API_URL } from "../config/env";
import { useSnackbar, SnackbarContext } from "../components/contexts/SnackbarContext";
import { useModal, ModalContext } from "../components/contexts/ModalContext";
import { useStatus } from "../components/contexts/StatusContext";
import { useContext } from "react";
import CREDENTIALS_KEYS from "../stores/credentialsKeys";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});


export {api}


