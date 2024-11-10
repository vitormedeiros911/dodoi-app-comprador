import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 6,
      padding: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: colorScheme === "light" ? "#f2f2f2" : "#282828",
    },
    input: {
      flex: 1,
      color: colorScheme === "light" ? "#000" : "#fff",
      fontSize: 14,
    },
    separator: {
      height: "100%",
      width: 1,
      backgroundColor: colorScheme === "light" ? "#D3D3D3" : "#3f3f3f",
      marginHorizontal: 10,
    },
    icon: {
      marginRight: 10,
    },
  });
};
