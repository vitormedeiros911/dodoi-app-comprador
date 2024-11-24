import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
      backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
      borderRadius: 10,
    },
  });
