import axios from "axios";
import config from "../Config"
import {getKeyClockToken_Data} from "./storage";

const fetchClient = () => {
  const defaultOptions = {
    baseURL: `${config.apiUrl}`,
  };
  const instance = axios.create(defaultOptions);

  if(instance && instance.interceptors) {
    instance.interceptors.request.use(
      (config) => {
        const token = getKeyClockToken_Data();
        config.headers.Authorization = token ? `Bearer ${token}` : "";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

 return instance;
};

export default fetchClient();























