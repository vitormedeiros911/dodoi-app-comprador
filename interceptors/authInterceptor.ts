import { api } from "@/services/api";

export const configureAuthInterceptor = (signOut: () => void) => {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) signOut();

      return Promise.reject(error);
    }
  );
};
