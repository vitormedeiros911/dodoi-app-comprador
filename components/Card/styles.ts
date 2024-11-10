import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      width: 140,
      marginHorizontal: 6,
      height: 220,
      borderRadius: 10,
      shadowColor: colorScheme === "light" ? "#000" : "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      overflow: "hidden",
    },
    imageContainer: {
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
      padding: 12,
    },
    image: {
      width: "100%",
      height: 120,
      borderRadius: 6,
    },
    textContainer: {
      paddingBottom: 10,
      paddingHorizontal: 10,
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },
    title: {
      fontSize: 14,
      fontWeight: "500",
      color: Colors[colorScheme ?? "light"].text,
    },
    price: {
      fontSize: 12,
      color: Colors[colorScheme ?? "light"].text,
    },
  });
};
