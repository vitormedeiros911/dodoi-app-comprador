import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import { formatBRL } from "../../utils/formatBRL";

const CarrinhoOverlay: React.FC = () => {
  const colorScheme = useColorScheme();
  const {
    carrinho,
    isCarrinhoVisible,
    removerDoCarrinho,
    incrementarQuantidade,
    decrementarQuantidade,
    limparCarrinho,
    toggleCarrinhoOverlay,
  } = useCarrinho();

  if (!isCarrinhoVisible) return null;

  const styles = createStyles(colorScheme);

  const renderItem = ({ item }: { item: ItemCarrinhoDto }) => (
    <ThemedView style={styles.item}>
      <Image source={{ uri: item.urlImagem }} style={styles.itemImage} />
      <ThemedView style={styles.itemDetails}>
        <ThemedText style={styles.itemName}>{item.nomeProduto}</ThemedText>
        <ThemedText style={styles.itemPrice}>
          Preço: {formatBRL(item.precoUnitario)}
        </ThemedText>
        <ThemedText style={styles.itemQuantity}>
          Quantidade: {item.quantidade}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.itemActions}>
        <TouchableOpacity onPress={() => incrementarQuantidade(item.idProduto)}>
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => decrementarQuantidade(item.idProduto)}>
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removerDoCarrinho(item.idProduto)}>
          <Ionicons name="trash-outline" size={24} color="red" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  const calcularPrecoTotal = () => {
    return carrinho.reduce(
      (total, item) => total + item.precoUnitario * item.quantidade,
      0
    );
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
                renderItem={renderItem}
                keyExtractor={(item) => item.idProduto}
              />
            ) : (
              <ThemedText style={styles.emptyText}>Carrinho vazio</ThemedText>
            )}

            <ThemedView style={styles.footer}>
              <ThemedView style={styles.totalPriceRow}>
                <ThemedText style={styles.totalPrice}>
                  Preço Total: {formatBRL(precoTotal)}
                </ThemedText>
              </ThemedView>

              <ThemedView style={styles.actionsRow}>
                <TouchableOpacity onPress={limparCarrinho}>
                  <ThemedText style={styles.clearText}>
                    Limpar Carrinho
                  </ThemedText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.checkoutButton}>
                  <ThemedText style={styles.checkoutText}>
                    Finalizar Compra
                  </ThemedText>
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
