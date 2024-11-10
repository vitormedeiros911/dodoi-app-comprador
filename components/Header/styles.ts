import { ColorSchemeName, Platform, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      paddingTop: Platform.OS === "ios" ? 60 : 50,
      padding: 20,
      width: "100%",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    firstRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    userInfoContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
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
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
  });
};
