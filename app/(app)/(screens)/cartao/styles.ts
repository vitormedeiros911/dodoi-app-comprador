import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
    },

    button: {
      height: 40,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-end",
      marginVertical: 20,
      backgroundColor: Colors.mainColor,
      paddingHorizontal: 12,
      borderRadius: 6,
    },

    list: {
      flex: 1,
      marginTop: 20,
    },

    listItem: {
      marginBottom: 16,
      flexDirection: "row",
      alignItems: "center",
    },

    bandeira: {
      width: 80,
      height: 80,
      resizeMode: "contain",
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
    },

    detailsText: {
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].lightText,
    },

    loadingIndicator: {
      marginVertical: 10,
    },
  });
