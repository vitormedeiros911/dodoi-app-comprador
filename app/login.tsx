import googleIcon from "@/assets/images/google-icon.png";
import handsImgBg from "@/assets/images/handsImgBg.jpg";
import logo from "@/assets/images/logo.png";
import Button from "@/components/Button";
import { useAuth } from "@/hooks/useAuth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useState } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";

GoogleSignin.configure({
  scopes: ["email", "profile"],
  webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID,
  iosClientId: process.env.EXPO_PUBLIC_IOS_CLIENT_ID,
});

export default function Login() {
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const { signIn } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsAuthenticating(true);

    signIn();

    setIsAuthenticating(false);
  };

  return (
    <ImageBackground source={handsImgBg} style={styles.imgBg}>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Image source={logo} style={styles.logo} />

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

export const styles = StyleSheet.create({
  imgBg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(16, 191, 16, 0.68)",
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },

  button: {
    backgroundColor: "#16B2F4",
    height: 60,
    width: 300,
    flexDirection: "row",
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
    bottom: 0,
  },

  iconContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 5,
  },

  googleIcon: {
    width: 38,
    height: 38,
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
