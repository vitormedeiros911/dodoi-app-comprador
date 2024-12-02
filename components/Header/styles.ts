import { Colors } from "@/constants/Colors";
import { ColorSchemeName, Platform, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "ios" ? 60 : 50,
      padding: 20,
      width: "100%",
      backgroundColor: Colors[colorScheme ?? "light"].background,
      borderBottomWidth: 1,
      borderBottomColor: Colors[colorScheme ?? "light"].border,
    },
    firstRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    userImg: {
      width: 50,
      height: 50,
      borderRadius: 50,
    },
    userName: {
      marginLeft: 10,
      fontSize: 12,
      fontWeight: "500",
    },
    menuItens: {
      flexDirection: "row",
      gap: 30,
      marginRight: 10,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    cartBadge: {
      position: "absolute",
      top: -8,
      right: -8,
      backgroundColor: "#f00",
      borderRadius: 12,
      width: 20,
      height: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    cartBadgeText: {
      fontSize: 12,
      fontWeight: "bold",
      color: "#fff",
    },
  });
};
