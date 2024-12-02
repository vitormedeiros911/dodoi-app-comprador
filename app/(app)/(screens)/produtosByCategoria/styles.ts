import { Colors } from "@/constants/Colors";
import { StyleSheet, ColorSchemeName } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
      flex: 1,
      padding: 20,
    },

    subTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },

    lightText: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].lightText,
      lineHeight: 18,
    },

    columnWrapper: {
      gap: 10,
    },

    listItem: {
      backgroundColor: "",
      padding: 10,
      borderRadius: 10,
      alignSelf: "flex-start",
      marginBottom: 10,
    },

    listItemImage: {
      width: 100,
      height: 100,
      borderRadius: 10,
    },

    infoProduto: {
      marginTop: 10,
    },

    productName: {
      fontSize: 14,
      fontWeight: "bold",
      color: Colors[colorScheme ?? "light"].text,
      maxWidth: 80,
      lineHeight: 18,
    },

    loadingIndicator: {
      marginVertical: 10,
    },
  });
};