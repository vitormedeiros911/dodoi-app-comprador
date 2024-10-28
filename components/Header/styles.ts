import { Platform, StyleSheet, useColorScheme } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? 40 : 20,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImg: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  userName: {
    marginLeft: 10,
    fontSize: 12,
    fontWeight: "bold",
  },
  menuItens: {
    flexDirection: "row",
    gap: 30,
  },
});
