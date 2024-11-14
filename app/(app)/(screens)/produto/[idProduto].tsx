import ImageWithFallback from "@/components/ImageWithFallback";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { formatBRL } from "@/utils/formatBRL";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";

interface IProduto {
  id: string;
  nome: string;
  urlImagem: string;
  precoUnitario: number;
  descricao: string;
  isFavorito: boolean;
  farmacia: {
    id: string;
    nome: string;
    urlImagem: string;
  };
}

const MemoizedImage = memo(ImageWithFallback);

export default function Produto() {
  const [produto, setProduto] = useState<IProduto | null>(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { idProduto } = useLocalSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const { adicionarAoCarrinho } = useCarrinho();
  const { setBackIndicator } = useHeader();

  const getProduto = async () => {
    startLoading();
    try {
      const response = await api.get(`/produto/${idProduto}`);
      setProduto(response.data);
      setIsFavorited(response.data.isFavorito);
    } catch (error) {
      console.log(error);
    } finally {
      stopLoading();
    }
  };

  const handleAdicionarAoCarrinho = useCallback(() => {
    if (produto) {
      const produtoParaCarrinho: ItemCarrinhoDto = {
        idProduto: produto.id,
        nomeProduto: produto.nome,
        precoUnitario: produto.precoUnitario,
        quantidade,
        urlImagem: produto.urlImagem,
      };

      adicionarAoCarrinho(produtoParaCarrinho);
      setQuantidade(1);
    }
  }, [produto, quantidade, adicionarAoCarrinho]);

  const addFavorito = async () => {
    try {
      await api.post(`/produto/favorito`, { idProduto: produto?.id });
      setIsFavorited(true);
    } catch (error) {
      console.log("Erro ao adicionar aos favoritos:", error);
    }
  };

  const removeFavorito = async () => {
    try {
      await api.delete(`/produto/${produto?.id}/favorito`);
      setIsFavorited(false);
    } catch (error) {
      console.log("Erro ao remover dos favoritos:", error);
    }
  };

  const toggleFavorited = useCallback(() => {
    if (isFavorited) removeFavorito();
    else addFavorito();
  }, [isFavorited, produto]);

  const toggleDescription = useCallback(() => {
    setIsDescriptionExpanded((prev) => !prev);
  }, []);

  const aumentarQuantidade = () => {
    setQuantidade((prev) => prev + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  useEffect(() => {
    getProduto();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  if (!produto) return null;

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{
          backgroundColor: colorScheme === "light" ? "#fff" : "#121212",
          paddingBottom: 80,
        }}
      >
        <MemoizedImage
          source={{ uri: produto.urlImagem }}
          fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
          style={styles.image}
        />

        <ThemedView style={styles.card}>
          <ThemedView style={styles.firstRow}>
            <ThemedText style={styles.title} numberOfLines={1}>
              {produto.nome}
            </ThemedText>
            <TouchableOpacity onPress={toggleFavorited}>
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
          <ThemedText style={styles.price}>
            R$ {produto.precoUnitario}
          </ThemedText>
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
          <ThemedText
            style={styles.description}
            numberOfLines={isDescriptionExpanded ? 0 : 3}
          >
            {produto.descricao}
          </ThemedText>

          {produto.descricao.length > 100 && (
            <TouchableOpacity onPress={toggleDescription}>
              <ThemedText style={styles.descriptionLink}>
                {isDescriptionExpanded ? "Ver menos" : "Ver mais"}
              </ThemedText>
            </TouchableOpacity>
          )}
        </ThemedView>
      </ScrollView>

      <ThemedView style={styles.footer}>
        <ThemedView style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={diminuirQuantidade}
            style={styles.quantityButton}
            disabled={quantidade === 1}
          >
            <Ionicons
              name="remove"
              size={20}
              color={
                quantidade === 1
                  ? "#B0B0B0"
                  : Colors[colorScheme ?? "light"].tabIconDefault
              }
            />
          </TouchableOpacity>
          <ThemedText style={styles.quantityText}>{quantidade}</ThemedText>
          <TouchableOpacity
            onPress={aumentarQuantidade}
            style={styles.quantityButton}
          >
            <Ionicons
              name="add"
              size={20}
              color={Colors[colorScheme ?? "light"].tabIconDefault}
            />
          </TouchableOpacity>
        </ThemedView>
        <TouchableOpacity
          onPress={handleAdicionarAoCarrinho}
          style={styles.buyButton}
        >
          <ThemedText style={styles.buyText}>Adicionar</ThemedText>
          <ThemedText style={styles.buyText}>
            {formatBRL(produto.precoUnitario * quantidade)}
          </ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ThemedView>
  );
}
