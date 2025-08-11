import React, { useMemo, useCallback } from "react";
import { toast } from "sonner";
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  IShowSnackbarParams,
  useSnackbar,
} from "@/components/contexts/SnackbarContext";
import { useModal, IShowModalParams } from "@/components/contexts/ModalContext";
import { useStatus } from "@/components/contexts/StatusContext";
import RefreshForm from "../features/auth/components/RefreshForm";
import useSession from "@/features/auth/businessLogic/useSession";
import CredentialKeys from "../stores/CredentialsKeys";
import HttpStatus from "@/stores/EHttpStatus";
import flattenObject from "@/utils/flattenObject";
import { apiUrl } from "@/routing/BackendRoutes";
import TApiResult, { IApiResult } from "./domain/TApiResult";
import IRequestConfig from "./domain/IRequestConfig";
import TApiParams from "./domain/TApiParams";
import { CheckCircle } from "lucide-react";

export default function useApi() {
  const {
    deleteSession,
    deleteAccessToken,
    getRefreshToken,
    userIsLoggedIn,
    deleteSessionWithoutReload,
  } = useSession();
  const token = localStorage.getItem(CredentialKeys.TOKEN_ACCESS);

  const { showModal, closeModal } = useModal();
  const { showSnackbar } = useSnackbar();
  const { setLoading } = useStatus();

  const api = useMemo(() => {
    return axios.create({
      baseURL: apiUrl,
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });
  }, [token]); // recreate api if token refreshes

  const apiWrapper = useMemo(
    () => ({
      async get<T>(params: TApiParams): Promise<IApiResult<T>> {
        setLoading(true);
        try {
          const response = await api.get(params.url, params.config);
          const apiResult: IApiResult<T> = {
            success: true,
            apiResponse: response.data,
          };
          if (apiResult.apiResponse?.message) {
            toast.success(apiResult.apiResponse?.message);
          }
          return apiResult;
        } catch (error) {
          const axiosError = error as AxiosError;
          handleError(axiosError, params.config);
          const apiResult: TApiResult<T> = {
            success: false,
            error: error as AxiosError,
          };
          return apiResult;
        } finally {
          setLoading(false);
        }
      },

      /**
       *
       * @param T Parameter type
       * @param E Return type
       * @param data
       * @param config
       * @returns
       */
      async post<T>(params: TApiParams): Promise<IApiResult<T>> {
        setLoading(true);
        try {
          const response = await api.post(
            params.url,
            params.body,
            params.config
          );
          const apiResult: IApiResult<T> = {
            success: true,
            apiResponse: response.data,
          };
          if (apiResult.apiResponse?.message) {
            toast.success(apiResult.apiResponse?.message);
          }
          return apiResult;
        } catch (error) {
          handleError(error as AxiosError, params.config);
          const apiResult: IApiResult<T> = {
            success: false,
            error: error as AxiosError,
          };
          return apiResult;
        } finally {
          setLoading(false);
        }
      },

      async put<T>(params: TApiParams): Promise<IApiResult<T>> {
        setLoading(true);
        try {
          const response = await api.put(
            params.url,
            params.body,
            params.config
          );
          const apiResult: IApiResult<T> = {
            success: true,
            apiResponse: response.data,
          };
          if (apiResult.apiResponse?.message) {
            toast.success(apiResult.apiResponse?.message);
          }
          return apiResult;
        } catch (error) {
          const axiosError = error as AxiosError;
          handleError(axiosError, params.config);
          const apiResult: IApiResult<T> = {
            success: true,
            error: axiosError,
          };
          return apiResult;
        } finally {
          setLoading(false);
        }
      },

      async delete<T>(params: TApiParams): Promise<IApiResult<T>> {
        setLoading(true);
        try {
          const response = await api.delete(params.url);
          const apiResult: IApiResult<T> = {
            success: true,
            apiResponse: {
              data: response.data,
              message: response.data.message,
            },
          };
          toast(response.data.message);
          return apiResult;
        } catch (error) {
          handleError(error as AxiosError, params.config);
          const axiosError = error as AxiosError;
          const apiResult: IApiResult<T> = {
            success: true,
            error: axiosError,
          };
          return apiResult;
        } finally {
          setLoading(false);
        }
      },
    }),
    [api, handleError, setLoading, showSnackbar]
  );

  /*
  Error messages are centralized here. Layers above dataAccess do not receive errors
  unless they specify it in the apiWrapper config. 
  */
  function handleError(error: AxiosError, config?: IRequestConfig) {
    handleBackendMessage(error, config);

    if (
      error.code === "ERR_NETWORK" ||
      error?.response?.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      deleteSessionWithoutReload();
      return;
    }

    const status = error.response?.status;
    if (status === HttpStatus.UNAUTHORIZED) {
      handleUnauthorized();
    }
  }

  function handleBackendMessage(error: AxiosError, config?: IRequestConfig) {
    /*
    Upper layers can configure a request in case feedback for a specific
    use case needs special treatment, though so far this is rarely the case.
    Check useSpecie.migrateColection for an example. 
    */
    if (config?.noSnackbar) {
      return;
    }

    const snackbarParams: IShowSnackbarParams = {};
    snackbarParams.isError = true;
    if (
      error.code === "ERR_NETWORK" ||
      error.response?.status === HttpStatus.INTERNAL_SERVER_ERROR
    ) {
      toast("No hay conexión", {
        position: "top-center",
      });

      return;
    }

    toast(getMessage(error), {
      position: "top-center",
    });
  }

  function getMessage(error: AxiosError): string {
    // DEV ONLY
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
    if (!userIsLoggedIn) {
      return;
    }

    const userCanRefresh = Boolean(getRefreshToken());

    if (userCanRefresh) {
      deleteAccessToken();

      const showModalParams: IShowModalParams = {
        title: "La sesión ha expirado",
        content: <RefreshForm />,
        dismissable: false,
      };

      showModal(showModalParams);
    } else {
      deleteSession();
    }
  }

  return { apiWrapper };
}
