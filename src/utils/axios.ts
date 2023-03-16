import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 30000,
});

type UpdateAxiosConfig = {
  token: string;
};

export const axiosAddAuthToConfig = ({
  token,
}: UpdateAxiosConfig): Promise<void> => {
  return new Promise((res) => {
    API.interceptors.request.use((config) => {
      config.headers.Authorization = token ? `Bearer ${token}` : null;
      return config;
    });

    res();
  });
};

export default API;
