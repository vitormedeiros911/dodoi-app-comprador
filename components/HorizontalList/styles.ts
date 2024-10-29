import { Colors } from "@/constants/Colors";
import { Appearance, StyleSheet } from "react-native";

const colorScheme = Appearance.getColorScheme();

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    padding: 8,
    backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
  },
});
