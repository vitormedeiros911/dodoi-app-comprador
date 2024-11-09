import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      width: 160,
      margin: 6,
      borderRadius: 16,
      shadowColor: colorScheme === "light" ? "#000" : "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      elevation: 2,
      overflow: "hidden",
    },
    imageContainer: {
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
      padding: 14,
    },
    image: {
      width: "100%",
      height: 120,
      borderRadius: 12,
    },
    textContainer: {
      paddingBottom: 10,
      paddingHorizontal: 10,
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },
    title: {
      fontSize: 14,
      fontWeight: "500",
      margin: 5,
      marginBottom: 4,
      color: Colors[colorScheme ?? "light"].text,
    },
    price: {
      fontSize: 12,
      color: Colors[colorScheme ?? "light"].text,
    },
  });
};
