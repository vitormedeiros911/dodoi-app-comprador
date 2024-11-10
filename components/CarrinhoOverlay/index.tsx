import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { styles } from "./styles";

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

  if (!isCarrinhoVisible) return null; // Se o carrinho não for visível, não renderiza nada

  // Função para renderizar cada item do carrinho
  const renderItem = ({ item }: { item: ItemCarrinhoDto }) => (
    <ThemedView style={styles.item}>
      <Image source={{ uri: item.urlImagem }} style={styles.itemImage} />
      <ThemedView style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.nomeProduto}</Text>
        <Text style={styles.itemPrice}>Preço: R$ {item.precoUnitario}</Text>
        <Text style={styles.itemQuantity}>Quantidade: {item.quantidade}</Text>
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
          <Ionicons
            name="trash-outline"
            size={24}
            color="red" // Ícone de lixeira vermelho
          />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );

  const calcularPrecoTotal = () => {
    return carrinho
      .reduce((total, item) => total + item.precoUnitario * item.quantidade, 0)
      .toFixed(2);
  };

  const precoTotal = calcularPrecoTotal();

  return (
    <View style={styles.backgroundOverlay}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isCarrinhoVisible}
        onRequestClose={toggleCarrinhoOverlay} // Fecha ao pressionar o botão de fechar
      >
        <ThemedView style={styles.wrap}>
          <ThemedView style={styles.carrinhoContainer}>
            <ThemedView style={styles.header}>
              <ThemedText style={styles.headerText}>
                Carrinho de Compras
              </ThemedText>
              <TouchableOpacity onPress={toggleCarrinhoOverlay}>
                <Ionicons name="close" size={30} color={Colors.mainColor} />
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

            <View style={styles.footer}>
              {/* Preço Total em uma linha separada */}
              <ThemedView style={styles.totalPriceRow}>
                <ThemedText style={styles.totalPrice}>
                  Preço Total: R$ {precoTotal}
                </ThemedText>
              </ThemedView>

              <View style={styles.actionsRow}>
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
              </View>
            </View>
          </ThemedView>
        </ThemedView>
      </Modal>
    </View>
  );
};

export default CarrinhoOverlay;
