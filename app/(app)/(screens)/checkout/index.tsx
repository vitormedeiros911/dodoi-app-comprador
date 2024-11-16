import ItemCarrinho from "@/components/ItemCarrinho";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import { formatBRL } from "@/utils/formatBRL";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";

export default function checkout() {
  const { setBackIndicator } = useHeader();
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { carrinho } = useCarrinho();

  const calcularPrecoTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0
    );
  };

  const precoTotal = calcularPrecoTotal();

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText>Checkout</ThemedText>
    </ThemedView>
  );
}
