import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      width: 140,
      marginHorizontal: 10,
      height: 190,
      borderRadius: 6,
      overflow: "hidden",
    },
    image: {
      width: 124,
      height: 124,
      borderRadius: 4,
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
