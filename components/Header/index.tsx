import defaultUserImg from "@/assets/images/defaultUserImg.png";
import { Colors } from "@/constants/Colors";
import { UserDto } from "@/dto/UserDto";
import getFirstName from "@/utils/getFirstName";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import Line from "../Line";

type HeaderProps = {
  children?: React.ReactNode;
  user: UserDto;
};

export default function Header({ children, user }: HeaderProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

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
      {children}
      <Line />
    </ThemedView>
  );
}
