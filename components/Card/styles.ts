import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      width: 140,
      marginHorizontal: 6,
      height: 190,
      borderRadius: 6,
      shadowColor: colorScheme === "light" ? "#000" : "#fff",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 5,
      overflow: "hidden",
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },
    imageContainer: {
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
      padding: 10,
    },
    image: {
      width: "100%",
      height: 110,
      borderRadius: 4,
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
      color: Colors[colorScheme ?? "light"].lightText,
    },
  });
};
