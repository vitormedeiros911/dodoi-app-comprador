import { ColorSchemeName, StyleSheet, useColorScheme } from "react-native";
import { ThemedView } from "./ThemedView";

type LineProps = {
  style?: any;
};

export default function Line({ style }: LineProps) {
  const colorScheme = useColorScheme();
  const styles = createStyle(colorScheme);

  return <ThemedView style={[styles.line, style]} />;
}

const createStyle = (colorScheme: ColorSchemeName) => {
  return StyleSheet.create({
    line: {
      width: "100%",
      opacity: 0.3,
      borderBottomColor: colorScheme === "light" ? "#000" : "#fff",
      borderBottomWidth: 1,
      marginTop: 20,
    },
  });
};
