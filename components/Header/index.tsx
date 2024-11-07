import { Colors } from "@/constants/Colors";
import { UserDto } from "@/dto/UserDto";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, useColorScheme } from "react-native";

import getFirstName from "../../utils/getFirstName";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

type HeaderProps = {
  children: React.ReactNode;
  user?: UserDto;
};

export default function Header({ children, user }: HeaderProps) {
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.firstRow}>
        <ThemedView style={styles.userInfoContainer}>
          <Image
            source={{
              uri: user?.avatar ? user.avatar : "https://i.pravatar.cc/300",
            }}
            style={styles.userImg}
          />
          <ThemedText style={styles.userName}>
            Olá, {getFirstName(user?.nome ? user.nome : "")}
          </ThemedText>
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
