import ImageWithFallback from "@/components/ImageWithFallback";
import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { useCarrinho } from "@/hooks/useCarrinho";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { IProduto } from "@/interfaces/produto.interface";
import { api } from "@/services/api";
import { formatBRL } from "@/utils/formatBRL";
import { showToast } from "@/utils/showToast";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import { TouchableOpacity, useColorScheme } from "react-native";

import { createStyles } from "./styles";

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
    try {
      const response = await api.get(`/produto/${idProduto}`);
      setProduto(response.data);
      setIsFavorited(response.data.isFavorito);
    } catch (error: any) {
      router.back();
      showToast(error.response?.data?.message, "error");
    }
  };

  const handleAdicionarAoCarrinho = useCallback(() => {
    if (
      produto &&
      produto.quantidadeDisponivel > 0 &&
      quantidade <= produto.quantidadeDisponivel
    ) {
      const produtoParaCarrinho: ItemCarrinhoDto = {
        idProduto: produto.id,
        nomeProduto: produto.nome,
        precoUnitario: produto.precoUnitario,
        quantidade,
        urlImagem: produto.urlImagem,
        idFarmacia: produto.idFarmacia,
        quantidadeDisponivel: produto.quantidadeDisponivel,
      };

      adicionarAoCarrinho(produtoParaCarrinho);
      setQuantidade(1);
    } else {
      showToast("Quantidade não disponível em estoque.", "error");
    }
  }, [produto, quantidade, adicionarAoCarrinho]);

  const addFavorito = async () => {
    try {
      await api.post(`/produto/favorito`, { idProduto: produto?.id });
      setIsFavorited(true);
    } catch (error: any) {
      showToast(error.response?.data?.message, "error");
    }
  };

  const removeFavorito = async () => {
    try {
      await api.delete(`/produto/${idProduto}/favorito`);
      setIsFavorited(false);
    } catch (error: any) {
      showToast(error.response?.data?.message, "error");
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
    if (produto && quantidade < produto.quantidadeDisponivel)
      setQuantidade((prev) => prev + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) setQuantidade((prev) => prev - 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getProduto();
      stopLoading();
    };

    fetchData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  if (!produto)
    return (
      <ThemedView
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={{
          backgroundColor: Colors[colorScheme ?? "light"].background,
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
            <ThemedText style={styles.title} numberOfLines={3}>
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
            {formatBRL(produto.precoUnitario)}
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

          {produto.descricao?.length > 100 && (
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
            disabled={quantidade >= (produto?.quantidadeDisponivel ?? 0)}
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
          style={[
            styles.buyButton,
            { opacity: produto.quantidadeDisponivel <= 0 ? 0.5 : 1 },
          ]}
          disabled={produto.quantidadeDisponivel <= 0}
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
