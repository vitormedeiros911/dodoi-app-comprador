import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      marginHorizontal: 10,
      borderRadius: 6,
      overflow: "hidden",
      width: 120,
      height: 200,
    },

    image: {
      width: 120,
      height: 120,
      borderRadius: 10,
    },

    title: {
      fontSize: 12,
      lineHeight: 16,
    },

    price: {
      marginTop: 8,
      fontSize: 12,
      fontWeight: "bold",
    },
  });
};
