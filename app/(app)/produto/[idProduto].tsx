import ImageWithFallback from "@/components/ImageWithFallback";
import Line from "@/components/Line";
import LoadingOverlay from "@/components/LoadingOverlay";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import React, { memo } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";
import { useCarrinho } from "@/hooks/useCarrinho"; // Importa o hook do carrinho
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";

type ProdutoProps = {
  favorited: boolean;
};

interface IProduto {
  id: string;
  nome: string;
  urlImagem: string;
  precoUnitario: number;
  descricao: string;
  farmacia: {
    id: string;
    nome: string;
    urlImagem: string;
  };
}

const MemoizedImage = memo(ImageWithFallback);

export default function Produto({ favorited }: ProdutoProps) {
  const [produto, setProduto] = useState<IProduto | null>(null);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { idProduto } = useLocalSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const { adicionarAoCarrinho } = useCarrinho(); // Usando o hook do carrinho

  const getProduto = async () => {
    startLoading();
    try {
      const response = await api.get(`/produto/${idProduto}`);
      setProduto(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  // Função para adicionar ao carrinho
  const handleAdicionarAoCarrinho = () => {
    if (produto) {
      const produtoParaCarrinho: ItemCarrinhoDto = {
        idProduto: produto.id,
        nomeProduto: produto.nome,
        precoUnitario: produto.precoUnitario,
        quantidade: 1,
        urlImagem: produto.urlImagem,
      };

      adicionarAoCarrinho(produtoParaCarrinho);
    }
  };

  useEffect(() => {
    getProduto();
  }, [idProduto]);

  if (!produto) return null;

  return (
    <ThemedView style={styles.container}>
      <LoadingOverlay />
      <ThemedView style={styles.card}>
        <MemoizedImage
          source={{ uri: produto.urlImagem }}
          fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
          style={styles.image}
        />
        <ThemedView style={styles.firstRow}>
          <ThemedText style={styles.title} numberOfLines={1}>
            {produto.nome}
          </ThemedText>
          <TouchableOpacity onPress={() => setIsFavorited(!isFavorited)}>
            {isFavorited ? (
              <Ionicons name="heart" size={36} color="red" />
            ) : (
              <Ionicons
                name="heart-outline"
                size={36}
                color={Colors[colorScheme ?? "light"].tabIconDefault}
              />
            )}
          </TouchableOpacity>
        </ThemedView>
        <ThemedView style={styles.farmaciaContainer}>
          <ImageWithFallback
            source={{ uri: produto.farmacia.urlImagem }}
            fallbackSource={require("@/assets/images/defaultFarmaciaImg.png")}
            style={styles.farmaciaImage}
          />
          <ThemedText style={styles.farmaciaName}>
            {produto.farmacia.nome}
          </ThemedText>
        </ThemedView>
        <Line style={{ marginBottom: 20 }} />
        <ThemedText style={styles.price}>R$ {produto.precoUnitario}</ThemedText>
        <ThemedText style={styles.description}>{produto.descricao}</ThemedText>
        <TouchableOpacity
          style={styles.buyContainer}
          onPress={handleAdicionarAoCarrinho} // Chama a função ao pressionar
        >
          <ThemedView style={styles.buyButton}>
            <ThemedText style={styles.buyText}>
              Adicionar ao carrinho
            </ThemedText>
            <Ionicons
              name="cart-outline"
              size={24}
              color={Colors[colorScheme ?? "light"].tint}
            />
          </ThemedView>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
