import { SessionStorageDto } from "@/dto/SessionStorageDto";
import { useLoading } from "@/hooks/useLoading";
import { configureAuthInterceptor } from "@/interceptors/authInterceptor";
import { oneSignalRegisterUser } from "@/lib/oneSignalHelper";
import { api } from "@/services/api";
import { USER_STORAGE } from "@/storage/storageConfig";
import { storageUserGet, storageUserSave } from "@/storage/storageUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { OneSignal } from "react-native-onesignal";

export type AuthContextDataProps = {
  session: SessionStorageDto;
  signIn: () => void;
  signOut: () => void;
};

type AuthContextProviderProps = {
  children: React.ReactNode;
};

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<SessionStorageDto>(
    {} as SessionStorageDto
  );

  const { startLoading, stopLoading } = useLoading();

  const updateSession = async (newSession: SessionStorageDto) => {
    setSession(newSession);
    await storageUserSave(newSession.user, newSession.token);
  };

  async function signIn() {
    try {
      startLoading();

      const googleResponse = await GoogleSignin.signIn();

      if (!googleResponse?.data?.idToken)
        throw new Error("Erro ao recuperar o token do Google.");

      const idToken = googleResponse.data.idToken;
      const response = await api.post("/auth/login", { idToken });

      const { usuario, access_token, primeiroAcesso } = response.data;

      if (usuario.status === "INATIVO") {
        const reativarPerfil = async () => {
          await api.patch("/usuario/ativar", { idToken });

          await signIn();
        };

        Alert.alert(
          "Perfil inativo",
          "Seu perfil está inativo. Deseja reativá-lo?",
          [
            { text: "Cancelar", style: "cancel" },
            {
              text: "Reativar",
              onPress: async () => {
                await reativarPerfil();
              },
            },
          ]
        );

        stopLoading();
      }

      const user = {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        avatar: usuario.urlImagem,
      };

      await updateSession({
        user,
        token: access_token,
      });

      oneSignalRegisterUser(user.id);

      if (primeiroAcesso) {
        router.navigate("/meus-dados");
        Alert.alert(
          "Bem-vindo ao Dodoi!",
          "Como é a primeira vez conosco, precisamos que você complete seu cadastro antes de realizar qualquer pedido.",
          [
            {
              text: "OK",
              onPress: () => {},
            },
            {
              text: "Completar depois",
              onPress: () => router.replace("/(app)/(tabs)"),
            },
          ]
        );
      } else if (access_token) router.replace("/(app)/(tabs)");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Não foi possível realizar o login.";
        Alert.alert(errorMessage);
      } else Alert.alert("Erro inesperado. Tente novamente.");
    } finally {
      stopLoading();
    }
  }

  async function signOut() {
    try {
      startLoading();
      setSession({} as SessionStorageDto);
      delete api.defaults.headers.token;
      await AsyncStorage.removeItem(USER_STORAGE);
      OneSignal.logout();
    } finally {
      stopLoading();
      router.replace("/login");
    }
  }

  async function loadUserData() {
    const userLogged = await storageUserGet();

    if (userLogged?.token && userLogged?.user?.id) {
      setSession(userLogged);
      oneSignalRegisterUser(userLogged.user.id);
    } else {
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
