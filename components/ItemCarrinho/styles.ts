import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    item: {
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
      fontSize: 14,
      fontWeight: "bold",
    },
    itemPrice: {
      fontSize: 12,
      color: "gray",
    },
    itemQuantity: {
      fontSize: 12,
      color: "gray",
    },
    itemActions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 100,
      padding: 10,
      borderRadius: 5,
      backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
    },
  });
};
