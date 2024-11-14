import CarrinhoOverlay from "@/components/CarrinhoOverlay";
import Loading from "@/components/Loading";
import LoadingOverlay from "@/components/LoadingOverlay";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { useColorScheme } from "react-native";

import { CarrinhoProvider } from "../contexts/CarrinhoContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return <Loading />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LoadingProvider>
        <AuthContextProvider>
          <LoadingOverlay />
          <CarrinhoProvider>
            <Slot />
            <CarrinhoOverlay />
          </CarrinhoProvider>
        </AuthContextProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
