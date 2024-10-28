import { Appearance, StyleSheet } from "react-native";

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
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
