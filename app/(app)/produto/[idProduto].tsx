import ImageWithFallback from "@/components/ImageWithFallback";
import Line from "@/components/Line";
import Loading from "@/components/Loading";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { api } from "@/services/api";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import React from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";

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

export default function Produto({ favorited }: ProdutoProps) {
  const [produto, setProduto] = useState<IProduto | null>(null);
  const [isFavorited, setIsFavorited] = useState(favorited);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { idProduto } = useLocalSearchParams();

  const getProduto = async () => {
    try {
      const response = await api.get(`/produto/${idProduto}`);
      setProduto(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProduto();
  }, [idProduto]);

  if (!produto) return <Loading />;

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ImageWithFallback
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
        <Line
          style={{
            marginBottom: 20,
          }}
        />
        <ThemedText style={styles.price}>R$ {produto.precoUnitario}</ThemedText>
        <ThemedText style={styles.description}>{produto.descricao}</ThemedText>
        <TouchableOpacity style={styles.buyContainer}>
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
