import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      width: "100%",
      padding: 16,
      paddingTop: 46,
      backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
      position: "absolute",
      top: 0,
      zIndex: 1,
      borderBottomWidth: 2,
      borderBottomColor: Colors.mainColor,
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    icon: {
      marginRight: 8,
    },
    title: {
      flex: 1,
      fontSize: 16,
    },
    text: {
      flex: 1,
      fontSize: 14,
      color: Colors[colorScheme ?? "light"].lightText,
    },
    closeButton: {
      padding: 4,
    },
  });
