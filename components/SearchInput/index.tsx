import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, useColorScheme, View } from "react-native";

import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type SearchInputProps = {
  setBusca: (busca: string) => void;
};

export default function SearchInput({ setBusca }: SearchInputProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Remédio ou Farmácia"
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
        onChangeText={setBusca}
      />
      <View style={styles.separator} />
      <Ionicons
        name="search-outline"
        size={24}
        color={Colors.mainColor}
        style={styles.icon}
      />
    </ThemedView>
  );
}
