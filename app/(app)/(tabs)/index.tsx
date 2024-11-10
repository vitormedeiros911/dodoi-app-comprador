import Card from "@/components/Card";
import HorizontalList from "@/components/HorizontalList";
import ListItem from "@/components/ListItem";
import ScrollView from "@/components/ScrollView";
import SearchInput from "@/components/SearchInput";
import { useHeader } from "@/hooks/useHeader";
import { useLoading } from "@/hooks/useLoading";
import { api } from "@/services/api";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";

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

export default function HomeScreen() {
  const { setHeaderContent } = useHeader();
  const { isLoading, startLoading, stopLoading } = useLoading();
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [farmacias, setFarmacias] = useState<IFarmacia[]>([]);
  const [busca, setBusca] = useState("");
  const [totalProdutos, setTotalProdutos] = useState(0);
  const [totalFarmacias, setTotalFarmacias] = useState(0);
  const produtosPageRef = useRef(1);
  const farmaciasPageRef = useRef(1);
  const abortControllerRef = useRef<AbortController | null>(null);

  const getProdutos = async (search?: string, page: number = 1) => {
    const params: { limit: number; skip: number; nome?: string } = {
      limit: 10,
      skip: (page - 1) * 10,
    };

    if (search) {
      params.nome = search;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      startLoading();
      const response = await api.get<{ produtos: IProduto[]; total: number }>(
        "/produto",
        {
          params,
          signal: controller.signal,
        }
      );
      setTotalProdutos(response.data.total);

      if (page === 1) {
        setProdutos(response.data.produtos);
      } else {
        setProdutos((prev) => [...prev, ...response.data.produtos]);
      }

      stopLoading();
    } catch (error) {
      if (error !== "AbortError") {
        console.log(error);
      }
      stopLoading();
    }
  };

  const getFarmacias = async (search?: string, page: number = 1) => {
    const params: { limit: number; skip: number; nome?: string } = {
      limit: 10,
      skip: (page - 1) * 10,
    };

    if (search) {
      params.nome = search;
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      startLoading();
      const response = await api.get<{ farmacias: IFarmacia[]; total: number }>(
        "/farmacia",
        {
          params,
          signal: controller.signal,
        }
      );
      setTotalFarmacias(response.data.total);

      if (page === 1) {
        setFarmacias(response.data.farmacias);
      } else {
        setFarmacias((prev) => [...prev, ...response.data.farmacias]);
      }

      stopLoading();
    } catch (error) {
      if (error !== "AbortError") {
        console.log(error);
      }
      stopLoading();
    }
  };

  useEffect(() => {
    if (abortControllerRef.current) abortControllerRef.current.abort();

    produtosPageRef.current = 1;
    farmaciasPageRef.current = 1;
    getProdutos(busca, 1);
    getFarmacias(busca, 1);

    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [busca]);

  useFocusEffect(
    useCallback(() => {
      setHeaderContent(<SearchInput setBusca={setBusca} />);
      return () => {
        setHeaderContent(null);
      };
    }, [setHeaderContent])
  );

  const handleProdutosEndReached = () => {
    if (!isLoading && produtos.length < totalProdutos) {
      const nextPage = produtosPageRef.current + 1;
      produtosPageRef.current = nextPage;
      getProdutos(busca, nextPage);
    }
  };

  const handleFarmaciasEndReached = () => {
    if (!isLoading && farmacias.length < totalFarmacias) {
      const nextPage = farmaciasPageRef.current + 1;
      farmaciasPageRef.current = nextPage;
      getFarmacias(busca, nextPage);
    }
  };

  return (
    <ScrollView>
      <HorizontalList
        data={farmacias}
        title="Farmácias"
        renderItem={({ item }) => (
          <ListItem image={item.urlImagem} title={item.nome} />
        )}
        onEndReached={handleFarmaciasEndReached}
        onEndReachedThreshold={0.5}
      />

      <HorizontalList
        data={produtos}
        title="Produtos"
        renderItem={({ item }) => (
          <Card
            image={item.urlImagem}
            defaultSource={require("@/assets/images/remedioGenericoImg.jpg")}
            title={item.nome}
            price={item.precoUnitario}
            onPress={() => {
              router.push(`/produto/${item.id}`);
            }}
          />
        )}
        onEndReached={handleProdutosEndReached}
        onEndReachedThreshold={0.5}
      />
    </ScrollView>
  );
}
