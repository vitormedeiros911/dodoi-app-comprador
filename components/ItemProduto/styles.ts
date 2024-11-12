import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    itemImage: {
      width: 60,
      height: 60,
      marginRight: 10,
      borderRadius: 5,
    },
    itemDetails: {
      flex: 1,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    itemName: {
      fontSize: 18,
      fontWeight: "bold",
    },
    itemPrice: {
      fontSize: 16,
      color: "gray",
    },
  });
