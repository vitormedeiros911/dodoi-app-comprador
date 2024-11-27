import { USER_STORAGE } from "@/storage/storageConfig";
import { storageUserGet } from "@/storage/storageUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

api.defaults.timeout = 5000;

let tokenInMemory: string | null = null;

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token);
    const expirationTime = decoded?.exp * 1000;
    return Date.now() > expirationTime;
  } catch (error) {
    return true;
  }
};

const loadToken = async () => {
  const session = await storageUserGet();

  if (session && !isTokenExpired(session.token)) {
    tokenInMemory = session.token;
    api.defaults.headers.token = session.token;
  } else {
    await AsyncStorage.removeItem(USER_STORAGE);
    tokenInMemory = null;
  }
};

(async () => {
  await loadToken();
})();

api.interceptors.request.use(async (config) => {
  const session = await storageUserGet();

  if (session && !isTokenExpired(session.token)) {
    tokenInMemory = session.token;
    api.defaults.headers.token = session.token;
  } else {
    await AsyncStorage.removeItem(USER_STORAGE);
    tokenInMemory = null;
  }

  if (tokenInMemory) config.headers.token = tokenInMemory;

  return config;
});

export { api };
