import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    card: {
      flex: 1,
      width: 140,
      marginHorizontal: 6,
      height: 190,
      borderRadius: 6,
      overflow: "hidden",
    },
    imageContainer: {
      padding: 10,
    },
    image: {
      width: "100%",
      height: 120,
      borderRadius: 4,
    },
    textContainer: {
      paddingBottom: 10,
      paddingHorizontal: 10,
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
