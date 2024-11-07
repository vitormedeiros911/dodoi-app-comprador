import { api } from "@/services/api";
import { USER_STORAGE } from "@/storage/storageConfig";
import { storageUserGet, storageUserSave } from "@/storage/storageUser";
import { useStorageState } from "@/storage/useStorageState";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  session: string | null;
  signIn: () => void;
  signOut: () => void;
  isLoading: boolean;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
} as AuthContextDataProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  // const [user, setUser] = useState<UserDto>({} as UserDto);
  const [[isLoading, session], setSession] = useStorageState(USER_STORAGE);

  async function signIn() {
    try {
      const googleResponse = await GoogleSignin.signIn();

      const idToken = googleResponse.data?.idToken;

      if (idToken) {
        const response = await api.post("/auth/login", { idToken });

        if (response.data) {
          const user = {
            id: response.data.usuario.id,
            nome: response.data.usuario.nome,
            email: response.data.usuario.email,
            avatar: response.data.usuario.urlImagem,
          };

          setSession(JSON.stringify(user));
          storageUserSave(user);
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        if (error.response?.data?.message)
          Alert.alert(error.response.data.message);
        else Alert.alert("Não foi possível realizar o login.");
    }
  }

  async function signOut() {
    setSession(null);
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged) setSession(JSON.stringify(userLogged));
  }

  useEffect(() => {
    loadUserData();
  }, []);

  return (
    <AuthContext.Provider value={{ session, signIn, signOut, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
