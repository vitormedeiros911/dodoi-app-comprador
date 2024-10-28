import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, TextInput, useColorScheme } from "react-native";

import { styles } from "./styles";
import { Colors } from "@/constants/Colors";
import { ThemedView } from "../ThemedView";

export default function SearchInput() {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Remédio ou Farmácia"
        placeholderTextColor={Colors[colorScheme ?? "light"].lightText}
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
