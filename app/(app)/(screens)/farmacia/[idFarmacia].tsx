import ImageWithFallback from "@/components/ImageWithFallback";
import ListItem from "@/components/ListItem";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Colors } from "@/constants/Colors";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { IProduto } from "@/interfaces/produto.interface";
import { api } from "@/services/api";
import formatCNPJ from "@/utils/formatCPNJ";
import { showToast } from "@/utils/showToast";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  useColorScheme,
  View,
} from "react-native";

import { createStyles } from "./styles";

interface IFarmacia {
  id: string;
  nome: string;
  urlImagem: string;
  razaoSocial: string;
  cnpj: string;
  endereco: {
    bairro: string;
    cep: string;
    cidade: string;
    complemento: string;
    logradouro: string;
    numero: string;
    uf: string;
  };
}
const MemoizedListItem = React.memo(ListItem);
const MemoizedImageWithFallback = React.memo(ImageWithFallback);

export default function Farmacia() {
  const [farmacia, setFarmacia] = useState<IFarmacia | null>(null);
  const [produtos, setProdutos] = useState<IProduto[]>([]);

  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);

  const colorScheme = useColorScheme();
  const styles = createStyles(colorScheme);
  const { idFarmacia } = useLocalSearchParams();
  const { startLoading, stopLoading } = useLoading();
  const { setBackIndicator } = useHeader();

  const getFarmacia = async () => {
    try {
      const response = await api.get(`/farmacia/${idFarmacia}`);
      setFarmacia(response.data);
    } catch (error: any) {
      router.back();
      showToast(error.response.data.message, "error");
    }
  };

  const getProdutos = async (page: number = 0, append: boolean = false) => {
    try {
      const skip = page * 10;
      const response = await api.get("/produto/", {
        params: {
          idFarmacia,
          skip,
          limit: 10,
        },
      });

      const { produtos: newProdutos, total: totalRecords } = response.data;

      setTotal(totalRecords);
      setProdutos((prevProdutos) =>
        append ? [...prevProdutos, ...newProdutos] : newProdutos
      );
    } catch (error: any) {
      router.back();
      showToast(error.response?.data?.message || "Erro desconhecido", "error");
    }
  };

  const loadMore = async () => {
    if (loadingMore || produtos.length >= total) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      await getProdutos(nextPage, true);
      setPage(nextPage);
    } catch (error) {
      showToast("Erro ao carregar mais itens", "error");
    } finally {
      setLoadingMore(false);
    }
  };

  const formatarEndereco = (endereco: any) => {
    if (!endereco) return "";
    const { logradouro, numero, bairro } = endereco;

    return `${logradouro || ""}, ${numero || ""} - ${bairro || ""}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      await getFarmacia();
      await getProdutos();
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

  if (!farmacia)
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
      <ThemedView style={styles.farmaciaContainer}>
        <MemoizedImageWithFallback
          source={{ uri: farmacia.urlImagem }}
          fallbackSource={require("@/assets/images/defaultFarmaciaImg.png")}
          style={styles.image}
        />
        <ThemedView style={styles.infoFarmacia}>
          <ThemedText style={styles.name} numberOfLines={2}>
            {farmacia?.nome}
          </ThemedText>
          <ThemedText style={styles.lightText}>
            CNPJ: {formatCNPJ(farmacia.cnpj)}
          </ThemedText>
        </ThemedView>
      </ThemedView>

      <ThemedView
        style={[
          styles.infoContainer,
          {
            marginBottom: 20,
          },
        ]}
      >
        <ThemedText style={styles.subTitle}>Endereço</ThemedText>
        <ThemedText style={styles.lightText}>
          {formatarEndereco(farmacia.endereco)}
        </ThemedText>
        <ThemedText style={styles.lightText}>
          {farmacia.endereco.cidade} - {farmacia.endereco.uf}
        </ThemedText>
        <ThemedText style={styles.lightText}>
          CEP: {farmacia.endereco.cep}
        </ThemedText>
      </ThemedView>

      <ThemedText style={styles.subTitle}>Produtos</ThemedText>
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1}
        numColumns={3}
        ListEmptyComponent={<Text>Nenhum produto encontrado.</Text>}
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
            onPress={() => router.navigate(`/produto/${produto.id}`)}
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
                R$ {produto.precoUnitario}
              </ThemedText>
            </View>
          </MemoizedListItem>
        )}
      />
    </ThemedView>
  );
}
