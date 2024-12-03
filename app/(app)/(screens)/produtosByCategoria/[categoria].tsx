import ImageWithFallback from "@/components/ImageWithFallback";
import ListItem from "@/components/ListItem";
import SearchInput from "@/components/SearchInput";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { IProduto } from "@/interfaces/produto.interface";
import { api } from "@/services/api";
import { showToast } from "@/utils/showToast";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { createStyles } from "./styles";
import { formatBRL } from "../../../../utils/formatBRL";

const MemoizedListItem = React.memo(ListItem);
const MemoizedImageWithFallback = React.memo(ImageWithFallback);

export default function produtosByCategoria() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [busca, setBusca] = useState("");
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);

  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { categoria } = useLocalSearchParams();
  const { startLoading, stopLoading, isLoading } = useLoading();
  const { setBackIndicator, setHeaderContent } = useHeader();

  const produtosPageRef = useRef(1);

  const getProdutos = async (search?: string, page: number = 1) => {
    const params: {
      limit: number;
      skip: number;
      nome?: string;
      categoria: string | string[];
    } = {
      limit: 10,
      skip: (page - 1) * 10,
      categoria,
    };

    if (search) params.nome = search;

    try {
      const response = await api.get<{ produtos: IProduto[]; total: number }>(
        "/produto",
        {
          params,
        }
      );
      setTotalProdutos(response.data.total);

      if (page === 1) setProdutos(response.data.produtos);
      else setProdutos((prev) => [...prev, ...response.data.produtos]);
    } catch (error: any) {
      showToast(error.response.data.message, "error");
    }
  };

  const debounceFetchData = debounce(async (search: string) => {
    produtosPageRef.current = 1;

    startLoading();
    try {
      if (search === "") await Promise.all([getProdutos()]);
      else await Promise.all([getProdutos(search, 1)]);
    } finally {
      stopLoading();
    }
  }, 500);

  useEffect(() => {
    debounceFetchData(busca);
    return debounceFetchData.cancel;
  }, [busca]);

  const handleProdutosEndReached = async () => {
    if (!isLoading && produtos.length < totalProdutos) {
      const nextPage = produtosPageRef.current + 1;
      produtosPageRef.current = nextPage;
      try {
        startLoading();
        await getProdutos(busca, nextPage);
      } finally {
        stopLoading();
      }
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    produtosPageRef.current = 1;
    await Promise.all([getProdutos(busca, 1)]);
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      setHeaderContent(
        <SearchInput setBusca={setBusca} placeholder={"Busque por produto"} />
      );

      return () => {
        setHeaderContent(null);
      };
    }, [setHeaderContent])
  );

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  if (!produtos)
    return (
      <ThemedView
        style={[
          styles.container,
          {
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <ThemedText>Carregando...</ThemedText>
      </ThemedView>
    );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.subTitle}>Produtos</ThemedText>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        onEndReached={handleProdutosEndReached}
        onEndReachedThreshold={0.1}
        numColumns={3}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        ListEmptyComponent={<ThemedText>Nenhum produto encontrado.</ThemedText>}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={Colors[colorScheme ?? "light"].text}
              style={styles.loadingIndicator}
            />
          ) : null
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.columnWrapper}
        renderItem={({ item: produto }) => (
          <MemoizedListItem
            style={styles.listItem}
            onPress={() => router.push(`/produto/${produto.id}`)}
          >
            <MemoizedImageWithFallback
              source={{ uri: produto.urlImagem }}
              fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
              style={styles.listItemImage}
            />
            <View style={styles.infoProduto}>
              <ThemedText style={styles.productName} numberOfLines={1}>
                {produto.nome}
              </ThemedText>
              <ThemedText
                style={{
                  fontSize: 14,
                }}
              >
                {formatBRL(produto.precoUnitario)}
              </ThemedText>
            </View>
          </MemoizedListItem>
        )}
      />
    </ThemedView>
  );
}
