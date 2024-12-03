import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createColorScheme = (
  colorScheme: ColorSchemeName,
  statusPedido: string
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
    },

    subTitle: {
      fontSize: 16,
      marginTop: 10,
      fontWeight: "bold",
    },

    farmaciaContainer: {
      flexDirection: "row",
      marginTop: 10,
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

    list: {
      flex: 1,
      marginTop: 10,
    },

    listItem: {
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    listItemImage: {
      width: 90,
      height: 90,
      borderRadius: 10,
    },

    listItemDescription: {
      flex: 1,
      marginLeft: 16,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
    },

    detailsTitle: {
      fontSize: 16,
      fontWeight: "bold",
      lineHeight: 20,
    },

    detailsText: {
      fontSize: 14,
      lineHeight: 20,
    },

    footer: {
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: Colors[colorScheme ?? "light"].border,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      position: "relative",
      bottom: 0,
      width: "100%",
    },

    footerText: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].lightText,
    },

    cancelButton: {
      backgroundColor: Colors.error,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },

    acceptButton: {
      backgroundColor: Colors.mainColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },

    buttonText: {
      textAlign: "center",
      fontSize: 14,
      color: "white",
    },
  });
