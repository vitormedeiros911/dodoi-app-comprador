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
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";

import { CarrinhoProvider } from "../contexts/CarrinhoContext";
import { StripeProvider } from "@stripe/stripe-react-native";
import { api } from "@/services/api";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [publishableKey, setPublishableKey] = useState("");
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
  });

  async function fetchPublishableKey() {
    const response = await api.get("pagamento/stripe-key");

    setPublishableKey(response.data.key);
  }

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }

    fetchPublishableKey();
  }, [loaded]);

  if (!loaded) return <Loading />;

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LoadingProvider>
        <AuthContextProvider>
          <LoadingOverlay />
          <CarrinhoProvider>
            <StripeProvider publishableKey={publishableKey}>
              <Slot />
            </StripeProvider>
            <CarrinhoOverlay />
          </CarrinhoProvider>
        </AuthContextProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
}
