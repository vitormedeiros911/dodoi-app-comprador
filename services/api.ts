import { useAuth } from "@/hooks/useAuth";
import { storageUserGet } from "@/storage/storageUser";
import { API_URL } from "@env";
import axios from "axios";

const api = axios.create({
  baseURL: API_URL,
});

(async () => {
  const session = await storageUserGet();
  if (session) api.defaults.headers.token = session.token;
})();

export { api };
