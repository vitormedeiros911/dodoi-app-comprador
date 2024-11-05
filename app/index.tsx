import googleIcon from "@/assets/images/google-icon.png";
import handsImgBg from "@/assets/images/handsImgBg.jpg";
import Button from "@/components/Button";
import { API_URL, IOS_CLIENT_ID, WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: WEB_CLIENT_ID,
  iosClientId: IOS_CLIENT_ID,
});

export default function index() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>();

  const handleGoogleSignIn = async () => {
    try {
      setIsAuthenticating(true);

      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (idToken) {
        const loginResponse = await fetch(`${API_URL}/auth/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (loginResponse.ok) {
          const { access_token } = await loginResponse.json();

          if (access_token) {
            Alert.alert("Entrar", "Login realizado com sucesso.");
          }
        }

        setIsAuthenticating(false);
      } else {
        setIsAuthenticating(false);
        Alert.alert("Entrar", "Não foi possível realizar o login.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Entrar", "Não foi possível realizar o login.");
      setIsAuthenticating(false);
    }
  };

  return (
    <ImageBackground source={handsImgBg} style={styles.imgBg}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Dodói</Text>
        <Text style={styles.subtitle}>Deixa que a gente cuida.</Text>

        <Button
          style={styles.button}
          isLoading={isAuthenticating}
          onPress={handleGoogleSignIn}
        >
          <View style={styles.iconContainer}>
            <Image source={googleIcon} style={styles.googleIcon} />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.buttonText}>Continuar com o Google</Text>
          </View>
        </Button>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16, 191, 16, 0.68)", // Cor verde com opacidade de 70%
  },

  content: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },

  title: {
    fontSize: 64,
    fontWeight: "bold",
    fontStyle: "italic",
  },

  subtitle: {
    fontSize: 18,
    fontWeight: "semibold",
    fontStyle: "italic",
  },

  button: {
    backgroundColor: "#16B2F4",
    height: 80,
    width: 340,
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    marginTop: 140,
  },

  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },

  googleIcon: {
    width: 42,
    height: 42,
  },

  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "semibold",
    fontSize: 16,
  },
});
