import { ColorSchemeName, StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const createStyles = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      paddingVertical: 20,
      paddingHorizontal: 16,
      borderTopWidth: 1,
      borderTopColor: "#ccc",
      alignItems: "center",
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },
    itemImage: {
      width: 60,
      height: 60,
      marginRight: 16,
      borderRadius: 5,
    },
    itemDetails: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
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
