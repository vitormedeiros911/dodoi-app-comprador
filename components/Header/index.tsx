import defaultUserImg from "@/assets/images/defaultUserImg.png";
import { Colors } from "@/constants/Colors";
import { UserDto } from "@/dto/UserDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import getFirstName from "@/utils/getFirstName";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { Animated, TouchableOpacity, useColorScheme } from "react-native";

import ImageWithFallback from "../ImageWithFallback";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type HeaderProps = {
  user: UserDto;
};

export default function Header({ user }: HeaderProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const { headerContent, backIndicator } = useHeader();
  const { carrinho, toggleCarrinhoOverlay } = useCarrinho();
  const router = useRouter();

  const scaleAnim = useRef(new Animated.Value(1)).current;

  const totalItensCarrinho = useMemo(() => {
    return carrinho.reduce((total, item) => total + item.quantidade, 0);
  }, [carrinho]);

  useEffect(() => {
    if (totalItensCarrinho > 0) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [totalItensCarrinho]);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.firstRow}>
        {backIndicator ? (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.mainColor} />
          </TouchableOpacity>
        ) : (
          <ThemedView style={styles.userInfoContainer}>
            <TouchableOpacity onPress={() => router.navigate("/perfil-menu")}>
              <ImageWithFallback
                source={{ uri: user.avatar }}
                fallbackSource={defaultUserImg}
                style={styles.userImg}
              />
            </TouchableOpacity>
            <ThemedText style={styles.userName}>
              Olá, {getFirstName(user.nome)}
            </ThemedText>
          </ThemedView>
        )}
        <ThemedView style={styles.menuItens}>
          <TouchableOpacity onPress={toggleCarrinhoOverlay}>
            <Ionicons
              name="cart-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
            {totalItensCarrinho > 0 && (
              <Animated.View
                style={[
                  styles.cartBadge,
                  { transform: [{ scale: scaleAnim }] },
                ]}
              >
                <ThemedText style={styles.cartBadgeText}>
                  {totalItensCarrinho}
                </ThemedText>
              </Animated.View>
            )}
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
