import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 10,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },

    title: {
      fontSize: 18,
      fontWeight: "500",
      color: colorScheme === "light" ? "#000" : "#fff",
      padding: 8,
      marginBottom: 8,
    },
  });
};
