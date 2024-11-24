import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ColorSchemeName,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";
import ItemProduto from "@/components/ItemProduto";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";

interface IFavorito {
  id: string;
  produto: {
    id: string;
    nome: string;
    precoUnitario: number;
    urlImagem: string;
  };
}

const MemoizedItemProduto = React.memo(ItemProduto);

export default function Favoritos() {
  const [favoritos, setFavoritos] = useState<IFavorito[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;
  const { startLoading, stopLoading } = useLoading();
  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);

  const getFavoritos = async (page: number = 0, append: boolean = false) => {
    try {
      const response = await api.get("produto/favoritos", {
        params: {
          limit,
          skip: page * limit,
        },
      });

      const { favoritos: newFavoritos, total: totalRecords } = response.data;

      setTotal(totalRecords);
      setFavoritos((prevFavoritos) =>
        append ? [...prevFavoritos, ...newFavoritos] : newFavoritos
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getFavoritos(0);
    setPage(0);
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (loadingMore || favoritos.length >= total) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    await getFavoritos(nextPage, true);
    setPage(nextPage);
    setLoadingMore(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getFavoritos();
      stopLoading();
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Favoritos</ThemedText>
      <FlatList
        data={favoritos}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <MemoizedItemProduto item={item.produto} />}
        ListFooterComponent={
          loadingMore ? (
            <ActivityIndicator
              size="small"
              color={Colors[colorScheme ?? "light"].text}
              style={styles.loadingIndicator}
            />
          ) : null
        }
      />
    </ThemedView>
  );
}

const createColorScheme = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
    },

    list: {
      flex: 1,
      paddingHorizontal: 20,
      paddingBottom: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
      marginLeft: 20,
    },

    loadingIndicator: {
      marginVertical: 10,
    },
  });
