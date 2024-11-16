import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { formatBRL } from "../../utils/formatBRL";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import ItemCarrinho from "../ItemCarrinho";

const CarrinhoOverlay: React.FC = () => {
  const colorScheme = useColorScheme();
  const { carrinho, isCarrinhoVisible, limparCarrinho, toggleCarrinhoOverlay } =
    useCarrinho();

  if (!isCarrinhoVisible) return null;

  const styles = createStyles(colorScheme);

  const calcularPrecoTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0
    );
  };

  const handleCheckout = () => {
    router.push("/checkout");
    toggleCarrinhoOverlay();
  };

  const precoTotal = calcularPrecoTotal();

  return (
    <View style={styles.backgroundOverlay}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCarrinhoVisible}
        onRequestClose={toggleCarrinhoOverlay}
      >
        <ThemedView style={styles.wrap}>
          <ThemedView style={styles.carrinhoContainer}>
            <ThemedView style={styles.header}>
              <ThemedText style={styles.headerText}>
                Carrinho de Compras
              </ThemedText>
              <TouchableOpacity onPress={toggleCarrinhoOverlay}>
                <Ionicons
                  name="close"
                  size={30}
                  color={Colors[colorScheme ?? "light"].lightText}
                />
              </TouchableOpacity>
            </ThemedView>

            {carrinho.length > 0 ? (
              <FlatList
                data={carrinho}
                renderItem={({ item }) => <ItemCarrinho item={item} />}
                keyExtractor={(item) => item.idProduto}
                showsVerticalScrollIndicator={false}
              />
            ) : (
              <ThemedText style={styles.emptyText}>Carrinho vazio</ThemedText>
            )}

            <ThemedView style={styles.footer}>
              <ThemedView style={styles.totalPriceRow}>
                <ThemedText style={styles.totalPrice}>
                  Total: {formatBRL(precoTotal)}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.actionsRow}>
                <TouchableOpacity onPress={limparCarrinho}>
                  <ThemedText style={styles.clearText}>Limpar</ThemedText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.checkoutButton,
                    carrinho.length === 0 && styles.disabledButton,
                  ]}
                  onPress={handleCheckout}
                  disabled={carrinho.length === 0}
                >
                  <ThemedText style={styles.checkoutText}>Continuar</ThemedText>
                </TouchableOpacity>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>
      </Modal>
    </View>
  );
};

export default CarrinhoOverlay;
