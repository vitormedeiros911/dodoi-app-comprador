import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    backgroundOverlay: {
      flex: 1,
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      justifyContent: "flex-end",
      alignItems: "center",
    },
    wrap: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0)",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 14,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    carrinhoContainer: {
      width: "100%",
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      maxHeight: "80%",
      borderBottomWidth: 1,
      borderBottomColor: "#ccc",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    headerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
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
      fontSize: 18,
      fontWeight: "bold",
    },
    itemPrice: {
      fontSize: 16,
      color: "gray",
    },
    itemQuantity: {
      fontSize: 14,
      color: "gray",
    },
    itemActions: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: 100,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    emptyText: {
      textAlign: "center",
      marginTop: 20,
      fontSize: 18,
    },
    footer: {
      marginTop: 20,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    totalPriceRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    totalPrice: {
      fontSize: 16,
      fontWeight: "500",
    },
    actionsRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
    },
    clearText: {
      fontSize: 16,
      color: "red",
    },
    checkoutButton: {
      backgroundColor: Colors.mainColor,
      padding: 10,
      borderRadius: 5,
    },
    checkoutText: {
      fontSize: 16,
      color: "white",
    },
    disabledButton: {
      opacity: 0.5,
    },
  });
};
