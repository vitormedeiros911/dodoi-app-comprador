import CarrinhoOverlay from "@/components/CarrinhoOverlay";
import Loading from "@/components/Loading";
import LoadingOverlay from "@/components/LoadingOverlay";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { CarrinhoProvider } from "@/contexts/CarrinhoContext";
import { LoadingProvider } from "@/contexts/LoadingContext";
import { api } from "@/services/api";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { StripeProvider } from "@stripe/stripe-react-native";
import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RootSiblingParent } from "react-native-root-siblings";

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
    <GestureHandlerRootView>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <RootSiblingParent>
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
        </RootSiblingParent>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
