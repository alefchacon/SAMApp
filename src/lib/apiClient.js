import axios from "axios";
import { API_URL } from "../config/env";
import { useSnackbar, SnackbarContext } from "../components/contexts/SnackbarContext";
import { useContext } from "react";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

const useAxiosInterceptors = () => {

  
  const {showSnackbar} = useContext(SnackbarContext);
  
  api.interceptors.request.use(function (config) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    //setIsLoading(true);
    return config;
  }, function (error) {
    //setIsLoading(true);
    return Promise.reject(error);
  });

  api.interceptors.response.use(
    (response) => {
      //setIsLoading(false);
      return response;
    },
    (error) => {
      const status = error.response?.status;
      if (status === 401){
        //clearData();
      }
      showSnackbar(error.response.data.detail, true);
      //setIsLoading(false);
      
      return Promise.reject(error);
    }
  );

}

export {api, useAxiosInterceptors}


