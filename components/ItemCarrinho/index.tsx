import ImageWithFallback from "@/components/ImageWithFallback";
import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { formatBRL } from "@/utils/formatBRL";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type ItemCarrinhoProps = {
  item: ItemCarrinhoDto;
};

export default function ItemCarrinho({ item }: ItemCarrinhoProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { incrementarQuantidade, decrementarQuantidade, removerDoCarrinho } =
    useCarrinho();

  return (
    <ThemedView style={styles.item}>
      <ImageWithFallback
        source={{ uri: item.urlImagem }}
        fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
        style={styles.itemImage}
      />
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
            size={18}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => decrementarQuantidade(item.idProduto)}>
          <Ionicons
            name="remove-circle-outline"
            size={18}
            color={Colors[colorScheme ?? "light"].tint}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removerDoCarrinho(item.idProduto)}>
          <Ionicons name="trash-outline" size={18} color="red" />
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
