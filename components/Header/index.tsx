import defaultUserImg from "@/assets/images/defaultUserImg.png";
import { Colors } from "@/constants/Colors";
import { UserDto } from "@/dto/UserDto";
import { useHeader } from "@/hooks/useHeader";
import getFirstName from "@/utils/getFirstName";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type HeaderProps = {
  user: UserDto;
};

export default function Header({ user }: HeaderProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const { headerContent } = useHeader();

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.firstRow}>
        <ThemedView style={styles.userInfoContainer}>
          <Image
            source={user.avatar ? { uri: user.avatar } : defaultUserImg}
            style={styles.userImg}
          />
          <ThemedText style={styles.userName}>
            Olá, {getFirstName(user.nome)}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.menuItens}>
          <TouchableOpacity>
            <Ionicons
              name="cart-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons
              name="notifications-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
          </TouchableOpacity>
        </ThemedView>
      </ThemedView>
      {headerContent}
    </ThemedView>
  );
}
