import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useAuth } from "@/hooks/useAuth";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { formatBRLFromCents } from "@/utils/formatBRL";
import { formatDateTime } from "@/utils/formatDate";
import { showToast } from "@/utils/showToast";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ColorSchemeName,
  FlatList,
  StyleSheet,
  useColorScheme,
} from "react-native";

interface IPedido {
  id: string;
  status: string;
  total: number;
  codigo: string;
  createdAt: Date;
}

const MemoizedListItem = React.memo(ListItem);

export default function Pedidos() {
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pedidos, setPedidos] = useState<IPedido[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme);
  const { startLoading, stopLoading } = useLoading();
  const { session } = useAuth();

  const getPedidos = async (page: number = 0, append: boolean = false) => {
    try {
      const response = await api.get("pedido", {
        params: {
          idComprador: session.user.id,
          limit,
          skip: page * limit,
          orderBy: "createdAt",
          order: "DESC",
        },
      });

      const { pedidos: newPedidos, total: totalRecords } = response.data;

      setTotal(totalRecords);
      setPedidos((prevPedidos) =>
        append ? [...prevPedidos, ...newPedidos] : newPedidos
      );
    } catch (error: any) {
      showToast(error.response?.data?.message, "error");
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPedidos(0);
    setPage(0);
    setRefreshing(false);
  };

  const loadMore = async () => {
    if (loadingMore || pedidos.length >= total) return;
    setLoadingMore(true);
    const nextPage = page + 1;
    await getPedidos(nextPage, true);
    setPage(nextPage);
    setLoadingMore(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getPedidos();
      stopLoading();
    };

    fetchData();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Meus pedidos</ThemedText>
      <FlatList
        data={pedidos}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: pedido }) => (
          <MemoizedListItem onPress={() => {}} style={styles.listItem}>
            <ThemedText style={styles.detailsTitle}>
              #{pedido.codigo} - {formatDateTime(pedido.createdAt, true)}
            </ThemedText>
            <ThemedText style={styles.detailsText}>
              Situação: {pedido.status}
            </ThemedText>
            <ThemedText style={styles.detailsText}>
              {formatBRLFromCents(pedido.total)}
            </ThemedText>
          </MemoizedListItem>
        )}
        ListEmptyComponent={<ThemedText>Nenhum pedido encontrado</ThemedText>}
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

    listItem: {
      marginBottom: 16,
    },

    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginVertical: 20,
      marginLeft: 20,
    },

    detailsTitle: {
      fontSize: 16,
      fontWeight: "bold",
    },

    detailsText: {
      fontSize: 14,
    },

    loadingIndicator: {
      marginVertical: 10,
    },
  });
