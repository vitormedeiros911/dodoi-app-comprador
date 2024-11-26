import { ComponentProps } from "react";
import { TextInput, useColorScheme } from "react-native";

import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import { Colors } from "@/constants/Colors";

type ThemedInputProps = {
  style?: any;
} & ComponentProps<typeof TextInput>;

export default function ThemedInput({ style, ...rest }: ThemedInputProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={[styles.container, style]}>
      <TextInput
        style={styles.input}
        {...rest}
        multiline={false}
        numberOfLines={1}
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
      />
    </ThemedView>
  );
}
