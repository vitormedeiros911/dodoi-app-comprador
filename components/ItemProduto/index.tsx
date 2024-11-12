import { formatBRL } from "@/utils/formatBRL";
import { router } from "expo-router";
import { Image, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";

type ItemProdutoProps = {
  item: {
    id: string;
    nome: string;
    precoUnitario: number;
    urlImagem: string;
  };
};

export default function ItemProduto({ item }: ItemProdutoProps) {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const handleVisualizarProduto = () => {
    router.push(`/produto/${item.id}`);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={handleVisualizarProduto}
    >
      <Image source={{ uri: item.urlImagem }} style={styles.itemImage} />
      <ThemedView style={styles.itemDetails}>
        <ThemedText style={styles.itemName}>{item.nome}</ThemedText>
        <ThemedText style={styles.itemPrice}>
          Preço unitário: {formatBRL(item.precoUnitario)}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
