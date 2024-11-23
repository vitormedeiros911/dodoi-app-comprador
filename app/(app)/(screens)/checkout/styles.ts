import { Colors } from "@/constants/Colors";
import { ColorSchemeName, StyleSheet } from "react-native";

export const createStyles = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
    },

    label: {
      fontSize: 16,
      fontWeight: "500",

      marginBottom: 10,
    },

    address: {
      fontSize: 16,
      marginBottom: 20,
      color: Colors[colorScheme ?? "light"].lightText,
    },

    voucherInput: {
      marginVertical: 10,
      borderRadius: 6,
      padding: 12,
      shadowColor: "#000",
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 4,
      elevation: 2,
      backgroundColor: Colors[colorScheme ?? "light"].backgroundSecondary,
    },

    footer: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      width: "100%",
    },

    amount: {
      fontSize: 16,
      fontWeight: "500",
      marginBottom: 10,
    },

    checkoutButton: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.mainColor,
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
  });
};
