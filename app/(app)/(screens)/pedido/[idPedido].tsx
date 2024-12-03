import ImageWithFallback from "@/components/ImageWithFallback";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { formatBRL, formatBRLWithCents } from "@/utils/formatBRL";
import { showToast } from "@/utils/showToast";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, TouchableOpacity, useColorScheme, View } from "react-native";

import { createColorScheme } from "./styles";

interface IPedido {
  id: string;
  total: number;
  codigo: string;
  createdAt: Date;
  cliente: {
    nome: string;
    endereco: string;
    telefone: string;
  };
  farmacia: {
    id: string;
    nome: string;
    urlImagem: string;
  };
  itens: {
    idProduto: string;
    nomeProduto: string;
    precoUnitario: number;
    quantidade: number;
    urlImagem: string;
  }[];
  historicoStatus: {
    status: string;
    data: Date;
  }[];
}

const MemoizedListItem = React.memo(ListItem);
const MemoizedImageWithFallback = React.memo(ImageWithFallback);

export default function Pedido() {
  const [refreshing, setRefreshing] = useState(false);
  const [pedido, setPedido] = useState<IPedido>({
    codigo: "0000000000",
    total: 0,
  } as IPedido);
  const [statusPedido, setStatusPedido] = useState("");

  const colorScheme = useColorScheme();
  const styles = createColorScheme(colorScheme, statusPedido);
  const { startLoading, stopLoading } = useLoading();
  const { setBackIndicator } = useHeader();

  const { idPedido } = useLocalSearchParams();

  const getPedido = async () => {
    try {
      const response = await api.get(`pedido/${idPedido}`);

      setPedido(response.data);
    } catch (error: any) {
      showToast(error.response?.data?.message, "error");
    }
  };

  const handleCancelarPedido = async () => {
    try {
      startLoading();
      await api.patch(`pedido/${idPedido}/cancelar`);
      router.navigate("pedidos");
      showToast("Pedido cancelado com sucesso!", "success");
    } catch (error: any) {
      showToast(error.response?.data.message, "error");
    } finally {
      stopLoading();
    }
  };

  const handleConfirmarEntrega = async () => {
    try {
      startLoading();
      await api.patch(`pedido/${idPedido}/finalizar-entrega`);
      router.navigate("pedidos");
    } catch (error: any) {
      showToast(error.response?.data.message, "error");
    } finally {
      stopLoading();
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await getPedido();
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getPedido();
      stopLoading();
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (pedido.historicoStatus) {
      const status =
        pedido.historicoStatus[pedido.historicoStatus.length - 1].status;
      setStatusPedido(status);
    }
  }, [pedido]);

  useFocusEffect(
    useCallback(() => {
      setBackIndicator(true);

      return () => {
        setBackIndicator(false);
      };
    }, [setBackIndicator])
  );

  return (
    <>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.title}>Pedido #{pedido.codigo}</ThemedText>

        <ThemedText style={styles.subTitle}>
          Total: {formatBRLWithCents(pedido.total)}
        </ThemedText>

        <ThemedText style={styles.subTitle}>Farmácia</ThemedText>
        <TouchableOpacity
          style={styles.farmaciaContainer}
          onPress={() => router.push(`/farmacia/${pedido.farmacia?.id}`)}
        >
          <ImageWithFallback
            source={{ uri: pedido.farmacia?.urlImagem }}
            fallbackSource={require("@/assets/images/defaultFarmaciaImg.jpg")}
            style={styles.farmaciaImage}
          />
          <ThemedText style={styles.farmaciaName}>
            {pedido.farmacia?.nome}
          </ThemedText>
        </TouchableOpacity>

        <ThemedText style={styles.subTitle}>Produtos</ThemedText>
        <FlatList
          data={pedido.itens}
          keyExtractor={(item) => item.idProduto}
          onRefresh={handleRefresh}
          refreshing={refreshing}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item: produto }) => (
            <MemoizedListItem
              style={styles.listItem}
              onPress={() => router.push(`/produto/${produto.idProduto}`)}
            >
              <MemoizedImageWithFallback
                source={{ uri: produto.urlImagem }}
                fallbackSource={require("@/assets/images/remedioGenericoImg.jpg")}
                style={styles.listItemImage}
              />
              <View style={styles.listItemDescription}>
                <ThemedText
                  style={styles.detailsTitle}
                  numberOfLines={2}
                  adjustsFontSizeToFit
                  minimumFontScale={0.8}
                >
                  {produto.nomeProduto}
                </ThemedText>

                <ThemedText style={styles.detailsText}>
                  Quantidade: {produto.quantidade}
                </ThemedText>
                <ThemedText style={styles.detailsText}>
                  {formatBRL(produto.precoUnitario)}
                </ThemedText>
              </View>
            </MemoizedListItem>
          )}
        />
      </ThemedView>
      <ThemedView style={styles.footer}>
        {statusPedido === "ENVIADO" ? (
          <TouchableOpacity
            onPress={handleConfirmarEntrega}
            style={[styles.acceptButton]}
          >
            <ThemedText style={styles.buttonText}>Confirmar entrega</ThemedText>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleCancelarPedido}
            style={styles.cancelButton}
          >
            <ThemedText style={styles.buttonText}>Cancelar pedido</ThemedText>
          </TouchableOpacity>
        )}
      </ThemedView>
    </>
  );
}
