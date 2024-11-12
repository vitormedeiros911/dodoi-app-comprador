import { formatBRL } from "@/utils/formatBRL";
import { router } from "expo-router";
import { Image, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { createStyles } from "./styles";
import ImageWithFallback from "../ImageWithFallback";

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
      <ImageWithFallback
        source={{ uri: item.urlImagem }}
        fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
        style={styles.itemImage}
      />
      <ThemedView style={styles.itemDetails}>
        <ThemedText style={styles.itemName}>{item.nome}</ThemedText>
        <ThemedText style={styles.itemPrice}>
          {formatBRL(item.precoUnitario)}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
