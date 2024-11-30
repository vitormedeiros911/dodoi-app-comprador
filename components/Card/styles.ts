import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      marginHorizontal: 10,
      borderRadius: 6,
      overflow: "hidden",
    },

    image: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },

    title: {
      fontSize: 14,
      fontWeight: "bold",
    },

    price: {
      fontSize: 12,
    },
  });
};
