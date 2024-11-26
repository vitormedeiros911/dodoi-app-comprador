import { SessionStorageDto } from "@/dto/SessionStorageDto";
import { useLoading } from "@/hooks/useLoading";
import { configureAuthInterceptor } from "@/interceptors/authInterceptor";
import { api } from "@/services/api";
import { USER_STORAGE } from "@/storage/storageConfig";
import { storageUserGet, storageUserSave } from "@/storage/storageUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export type AuthContextDataProps = {
  session: SessionStorageDto;
  signIn: () => Promise<{
    primeiroAcesso: boolean;
  }>;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<SessionStorageDto>({
    user: {},
    token: "",
  } as SessionStorageDto);

  const { startLoading, stopLoading } = useLoading();

  const updateSession = async (newSession: SessionStorageDto) => {
    setSession(newSession);
    await storageUserSave(newSession.user, newSession.token);
  };

  async function signIn() {
    try {
      const googleResponse = await GoogleSignin.signIn();

      if (!googleResponse?.data?.idToken)
        throw new Error("Erro ao recuperar o token do Google.");

      const idToken = googleResponse.data.idToken;
      const response = await api.post("/auth/login", { idToken });

      const user = {
        id: response.data.usuario.id,
        nome: response.data.usuario.nome,
        email: response.data.usuario.email,
        avatar: response.data.usuario.urlImagem,
      };

      await updateSession({
        user,
        token: response.data.access_token,
      });

      return { primeiroAcesso: response.data.primeiroAcesso };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Não foi possível realizar o login.";
        Alert.alert(errorMessage);
      } else Alert.alert("Erro inesperado. Tente novamente.");
    }

    return { primeiroAcesso: false };
  }

  async function signOut() {
    try {
      startLoading();
      setSession({} as SessionStorageDto);
      delete api.defaults.headers.token;
      await AsyncStorage.removeItem(USER_STORAGE);
    } finally {
      stopLoading();
      router.replace("/login");
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged?.token && userLogged?.user?.id) setSession(userLogged);
    else {
      setSession({} as SessionStorageDto);
      await AsyncStorage.removeItem(USER_STORAGE);
    }
  }

  useEffect(() => {
    loadUserData();
    configureAuthInterceptor(signOut);
  }, []);

  return (
    <AuthContext.Provider value={{ session, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
