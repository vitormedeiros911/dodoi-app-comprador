import { useAuth } from "@/hooks/useAuth";
import { storageUserGet } from "@/storage/storageUser";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.defaults.timeout = 5000;

let tokenInMemory: string | null = null;

(async () => {
  const session = await storageUserGet();
  if (session) {
    tokenInMemory = session.token;
    api.defaults.headers.token = session.token;
  }
})();

api.interceptors.request.use(async (config) => {
  if (tokenInMemory) {
    config.headers.token = tokenInMemory;
  } else {
    const session = await storageUserGet();

    if (session) {
      tokenInMemory = session.token;
      config.headers.token = session.token;
    }
  }
  return config;
});

export { api };
