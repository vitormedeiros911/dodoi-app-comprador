import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, useColorScheme, View } from "react-native";

import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import { ThemedText } from "../ThemedText";
import { Colors } from "@/constants/Colors";

type Props = {
  title: string;
  onClose: () => void;
};

export function Notification({ title, onClose }: Props) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  return (
    <ThemedView style={styles.container}>
      <View style={styles.row}>
        <Ionicons
          name="notifications-outline"
          size={20}
          color={Colors[colorScheme ?? "light"].tint}
          style={styles.icon}
        />

        <ThemedText style={styles.text}>{title}</ThemedText>

        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons
            name="close-outline"
            size={20}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
      </View>
    </ThemedView>
  );
}
