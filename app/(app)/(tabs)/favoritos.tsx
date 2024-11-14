import ItemProduto from "@/components/ItemProduto";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import React, { useEffect, useState } from "react";
import {
  ColorSchemeName,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";

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

export default function favoritos() {
  const [favoritos, setFavoritos] = useState<IFavorito[]>([] as IFavorito[]);
  const [refreshing, setRefreshing] = useState(false);
  const { startLoading, stopLoading } = useLoading();
  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);

  const getFavoritos = async () => {
    try {
      const response = await api.get("produto/favoritos", {
        params: {
          limit: 10,
        },
      });
      setFavoritos(response.data.favoritos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getFavoritos();
    setRefreshing(false);
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
        renderItem={({ item }) => <MemoizedItemProduto item={item.produto} />}
      />
    </ThemedView>
  );
}

const createColorScheme = (colorScheme: ColorSchemeName) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors[colorScheme ?? "light"].background,
      padding: 20,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 16,
    },
  });
