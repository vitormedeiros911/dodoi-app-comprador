import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

type Props = {
  children: React.ReactNode;
};

export default function Header({ children }: Props) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.firstRow}>
        <ThemedView style={styles.userInfoContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            }}
            style={styles.userImg}
          />
          <ThemedText style={styles.userName}>Olá, João</ThemedText>
        </ThemedView>
        <ThemedView style={styles.menuItens}>
          <Ionicons
            name="cart-outline"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
          <Ionicons
            name="ellipsis-horizontal"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </ThemedView>
      </ThemedView>
      {children}
    </ThemedView>
  );
}
