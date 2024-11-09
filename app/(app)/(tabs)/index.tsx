import Card from "@/components/Card";
import Header from "@/components/Header";
import HorizontalList from "@/components/HorizontalList";
import ScrollView from "@/components/ScrollView";
import SearchInput from "@/components/SearchInput";
import { useAuth } from "@/hooks/useAuth";
import { api } from "@/services/api";
import React, { useEffect, useState } from "react";

interface IProduto {
  nome: string;
  urlImagem: string;
  precoUnitario: number;
}

export default function HomeScreen() {
  const [produtos, setProdutos] = useState<IProduto[]>([]);
  const [busca, setBusca] = useState("");
  const { session } = useAuth();
  const [abortController, setAbortController] =
    useState<AbortController | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProdutos, setTotalProdutos] = useState(0);

  const getProdutos = async (search?: string, page: number = 1) => {
    const params: { limit: number; skip: number; nome?: string } = {
      limit: 10,
      skip: (page - 1) * 10,
    };

    if (search) {
      params.nome = search;
    }

    const controller = new AbortController();
    setAbortController(controller);

    try {
      setLoading(true);

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

      setLoading(false);
    } catch (error) {
      if (error !== "AbortError") {
        console.log(error);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (abortController) {
      abortController.abort();
    }

    setPage(1);
    getProdutos(busca, 1);
  }, [busca]);

  const handleEndReached = () => {
    if (!loading && produtos.length < totalProdutos) {
      setPage((prev) => prev + 1);
      getProdutos(busca, page + 1);
    }
  };

  return (
    <>
      <Header user={session.user}>
        <SearchInput setBusca={setBusca} />
      </Header>
      <ScrollView>
        <HorizontalList
          data={produtos}
          title="Produtos em destaque"
          renderItem={({ item }) => (
            <Card
              image={item.urlImagem}
              title={item.nome}
              price={item.precoUnitario}
            />
          )}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
        />
      </ScrollView>
    </>
  );
}
