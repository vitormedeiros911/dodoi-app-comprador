import { Colors } from "@/constants/Colors";
import { StyleSheet, ColorSchemeName } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },

    card: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
      width: "100%",
      padding: 18,
      height: "100%",
    },

    firstRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      marginBottom: 10,
    },

    title: {
      width: "80%",
      fontSize: 18,
      fontWeight: "500",
    },

    image: {
      width: "100%",
      height: 250,
      resizeMode: "stretch",
    },

    price: {
      fontSize: 16,
      fontWeight: "500",
      color: Colors[colorScheme ?? "light"].lightText,
    },

    description: {
      marginTop: 20,
      textAlign: "justify",
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].lightText,
      lineHeight: 18,
    },

    farmaciaContainer: {
      flexDirection: "row",
      marginTop: 20,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      alignItems: "center",
    },

    farmaciaImage: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },

    farmaciaName: {
      fontSize: 14,
      marginLeft: 10,
      color: Colors[colorScheme ?? "light"].text,
    },

    descriptionLink: {
      color: Colors.mainColor,
      fontSize: 14,
      marginTop: 10,
      textDecorationLine: "underline",
      fontWeight: "bold",
    },

    quantityContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 15,
      backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
    },

    quantityButton: {
      padding: 12,
      opacity: 1,
    },

    quantityButtonDisabled: {
      padding: 12,
      opacity: 0.3,
    },

    quantityText: {
      fontSize: 16,
      marginHorizontal: 10,
      fontWeight: "500",
    },

    footer: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
      paddingHorizontal: 20,
      borderTopWidth: 1,
      borderTopColor: Colors[colorScheme ?? "light"].border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      position: "relative",
      bottom: 0,
      width: "100%",
    },

    buyButton: {
      backgroundColor: Colors.mainColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      flexDirection: "row",
      justifyContent: "space-between",
      width: 200,
    },

    buyText: {
      textAlign: "center",
      fontSize: 14,
      marginRight: 10,
      color: "white",
    },
  });
};
