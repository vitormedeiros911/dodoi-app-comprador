import { Appearance, Platform, StyleSheet } from "react-native";

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === "ios" ? 60 : 40,
    padding: 30,
    width: "100%",
    backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
  },
  firstRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
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
    fontWeight: "medium",
  },
  menuItens: {
    flexDirection: "row",
    gap: 30,
    backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
  },
});
