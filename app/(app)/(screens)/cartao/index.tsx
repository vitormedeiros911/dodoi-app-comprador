import SwipeableListItem from "@/components/SwipeableListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Bandeiras } from "@/constants/Bandeiras";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { showToast } from "@/utils/showToast";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Image, useColorScheme, View } from "react-native";

import { createStyles } from "./styles";

const MemoizedListItem = React.memo(SwipeableListItem);

interface ICartao {
  id: string;
  last4: string;
  bandeira: string;
  validade: string;
}

export default function Cartao() {
  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);

  const [cartoes, setCartoes] = useState<ICartao[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const { startLoading, stopLoading } = useLoading();
  const { setBackIndicator } = useHeader();

  const getCartoes = async () => {
    try {
      const response = await api.get("/pagamento/cartao");
      setCartoes(response.data.cartoes);
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Erro ao buscar cartões",
        "error"
      );
    }
  };

  const deleteCartao = async (id: string) => {
    try {
      startLoading();
      await api.delete(`/pagamento/cartao/${id}`);
      showToast("Cartão excluído com sucesso!", "success");

      setCartoes((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error: any) {
      showToast(
        error.response?.data?.message || "Erro ao excluir cartão",
        "error"
      );
    } finally {
      stopLoading();
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert("Excluir", "Você tem certeza que deseja excluir este cartão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteCartao(id);
        },
      },
    ]);
  };

  useEffect(() => {
    const fetchCartoes = async () => {
      startLoading();
      await getCartoes();
      stopLoading();
    };

    fetchCartoes();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getCartoes();
    setRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  return (
    <ThemedView style={styles.container}>
      <ThemedText style={styles.title}>Meus cartões</ThemedText>

      <FlatList
        data={cartoes}
        keyExtractor={(item) => item.id}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item: cartao }) => (
          <MemoizedListItem
            style={styles.listItem}
            onDeletePress={() => handleDelete(cartao.id)}
          >
            <Image
              source={Bandeiras[cartao.bandeira] || Bandeiras.default}
              style={styles.bandeira}
            />
            <View style={styles.listItemDescription}>
              <ThemedText style={styles.detailsTitle}>
                * * * * {cartao.last4}
              </ThemedText>
              <ThemedText style={styles.detailsText}>
                Validade: {cartao.validade}
              </ThemedText>
            </View>
          </MemoizedListItem>
        )}
        ListEmptyComponent={<ThemedText>Nenhum cartão encontrado</ThemedText>}
      />
    </ThemedView>
  );
}
