import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center",
      paddingBottom: 20,
    },

    card: {
      flex: 1,
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
      width: "100%",
      borderRadius: 10,
      padding: 18,
      justifyContent: "space-between",
    },

    firstRow: {
      marginTop: 20,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },

    title: {
      fontSize: 24,
      fontWeight: "500",
    },

    image: {
      width: "100%",
      height: 200,
      borderRadius: 10,
    },

    price: {
      fontSize: 18,
      fontWeight: "500",
    },

    description: {
      marginTop: 20,
      textAlign: "justify",
      fontSize: 14,
    },

    farmaciaContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: 20,
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },

    farmaciaImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    farmaciaName: {
      fontSize: 16,
      marginLeft: 10,
    },

    buyContainer: {
      width: "100%",
      marginTop: "auto",
    },

    buyButton: {
      backgroundColor: Colors.mainColor,
      padding: 10,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "center",
    },

    buyText: {
      textAlign: "center",
      fontSize: 16,
      marginRight: 10,
    },
  });
};
