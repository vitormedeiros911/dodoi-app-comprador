import Card from "@/components/Card";
import CardSecondary from "@/components/CardSecondary";
import HorizontalList from "@/components/HorizontalList";
import ScrollView from "@/components/ScrollView";
import SearchInput from "@/components/SearchInput";
import { Categorias } from "@/constants/Categorias";
import { Colors } from "@/constants/Colors";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { showToast } from "@/utils/showToast";
import { router, useFocusEffect } from "expo-router";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useColorScheme } from "react-native";

interface IProduto {
  id: string;
  nome: string;
  urlImagem: string;
  precoUnitario: number;
}

interface IFarmacia {
  id: string;
  nome: string;
  urlImagem: string;
}

const MemoizedCard = React.memo(Card);
const MemoizedCardSecondary = React.memo(CardSecondary);

export default function home() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [farmacias, setFarmacias] = useState<IFarmacia[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [busca, setBusca] = useState("");
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalFarmacias, setTotalFarmacias] = useState(0);

  const colorScheme = useColorScheme();
  const produtosPageRef = useRef(1);
  const farmaciasPageRef = useRef(1);
  const { setHeaderContent } = useHeader();
  const { isLoading, startLoading, stopLoading } = useLoading();

  const getProdutos = async (search?: string, page: number = 1) => {
    const params: {
      limit: number;
      skip: number;
      nome?: string;
      status?: string;
    } = {
      limit: 10,
      skip: (page - 1) * 10,
      status: "ATIVO",
    };

    if (search) params.nome = search;

    try {
      const response = await api.get<{ produtos: IProduto[]; total: number }>(
        "/produto",
        { params }
      );
      setTotalProdutos(response.data.total);

      if (page === 1) setProdutos(response.data.produtos);
      else setProdutos((prev) => [...prev, ...response.data.produtos]);
    } catch (error: any) {
      showToast(error.response?.data.message, "error");
    }
  };

  const getFarmacias = async (search?: string, page: number = 1) => {
    const params: { limit: number; skip: number; nome?: string } = {
      limit: 10,
      skip: (page - 1) * 10,
    };

    if (search) params.nome = search;

    try {
      const response = await api.get<{ farmacias: IFarmacia[]; total: number }>(
        "/farmacia",
        { params }
      );
      setTotalFarmacias(response.data.total);

      if (page === 1) setFarmacias(response.data.farmacias);
      else setFarmacias((prev) => [...prev, ...response.data.farmacias]);
    } catch (error: any) {
      showToast(error.response?.data.message, "error");
    }
  };

  const debounceFetchData = debounce(async (search: string) => {
    produtosPageRef.current = 1;
    farmaciasPageRef.current = 1;

    startLoading();
    try {
      if (search === "") await Promise.all([getProdutos(), getFarmacias()]);
      else await Promise.all([getProdutos(search, 1), getFarmacias(search, 1)]);
    } finally {
      stopLoading();
    }
  }, 500);

  useEffect(() => {
    debounceFetchData(busca);
    return debounceFetchData.cancel;
  }, [busca]);

  useFocusEffect(
    useCallback(() => {
      setHeaderContent(
        <SearchInput
          setBusca={setBusca}
          placeholder="Buscar produtos e farmácias"
        />
      );

      return () => {
        setHeaderContent(null);
      };
    }, [setHeaderContent])
  );

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

  const handleFarmaciasEndReached = async () => {
    if (!isLoading && farmacias.length < totalFarmacias) {
      const nextPage = farmaciasPageRef.current + 1;
      farmaciasPageRef.current = nextPage;
      try {
        startLoading();
        await getFarmacias(busca, nextPage);
      } finally {
        stopLoading();
      }
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    produtosPageRef.current = 1;
    farmaciasPageRef.current = 1;
    await Promise.all([getProdutos(busca, 1), getFarmacias(busca, 1)]);
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
        paddingVerical: 10,
      }}
      onRefresh={handleRefresh}
      refreshing={refreshing}
    >
      <HorizontalList
        data={Categorias}
        title="Categorias"
        renderItem={({ item }) => (
          <MemoizedCardSecondary
            imageSource={item.imagem}
            title={item.nome}
            onPress={() => router.push(`/produtosByCategoria/${item.alias}`)}
          />
        )}
      />
      <HorizontalList
        data={produtos}
        title="Produtos"
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: totalProdutos,
          offset: totalProdutos * index,
          index,
        })}
        renderItem={({ item: produto }) => (
          <MemoizedCard
            image={produto.urlImagem}
            defaultSource={require("@/assets/images/remedioGenericoImg.jpg")}
            title={produto.nome}
            price={produto.precoUnitario}
            onPress={() => router.push(`/produto/${produto.id}`)}
          />
        )}
        onEndReached={handleProdutosEndReached}
        onEndReachedThreshold={0.5}
      />
      <HorizontalList
        data={farmacias}
        title="Farmácias"
        keyExtractor={(item) => item.id}
        getItemLayout={(_, index) => ({
          length: totalFarmacias,
          offset: totalFarmacias * index,
          index,
        })}
        renderItem={({ item: farmacia }) => (
          <MemoizedCardSecondary
            imageUrl={farmacia.urlImagem}
            title={farmacia.nome}
            onPress={() => router.push(`/farmacia/${farmacia.id}`)}
          />
        )}
        onEndReached={handleFarmaciasEndReached}
        onEndReachedThreshold={0.5}
      />
    </ScrollView>
  );
}
