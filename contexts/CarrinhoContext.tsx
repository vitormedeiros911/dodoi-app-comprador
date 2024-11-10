import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { CARRINHO_STORAGE } from "@/storage/storageConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useEffect, useState } from "react";

type CarrinhoContextDataProps = {
  carrinho: ItemCarrinhoDto[];
  isCarrinhoVisible: boolean;
  adicionarAoCarrinho: (item: ItemCarrinhoDto) => void;
  removerDoCarrinho: (itemId: string) => void;
  incrementarQuantidade: (itemId: string) => void;
  decrementarQuantidade: (itemId: string) => void;
  limparCarrinho: () => void;
  toggleCarrinhoOverlay: () => void;
};

type CarrinhoContextProviderProps = {
  children: React.ReactNode;
};

export const CarrinhoContext = createContext<CarrinhoContextDataProps>(
  {} as CarrinhoContextDataProps
);

export function CarrinhoProvider({ children }: CarrinhoContextProviderProps) {
  const [carrinho, setCarrinho] = useState<ItemCarrinhoDto[]>([]);
  const [isCarrinhoVisible, setCarrinhoVisible] = useState(false);

  const toggleCarrinhoOverlay = () => {
    setCarrinhoVisible((prevState) => !prevState);
  };

  const carregarCarrinho = async () => {
    try {
      const carrinhoSalvo = await AsyncStorage.getItem(CARRINHO_STORAGE);
      if (carrinhoSalvo) {
        setCarrinho(JSON.parse(carrinhoSalvo));
      }
    } catch (error) {
      console.log("Erro ao carregar o carrinho:", error);
    }
  };

  const salvarCarrinho = async (novoCarrinho: ItemCarrinhoDto[]) => {
    try {
      await AsyncStorage.setItem(
        CARRINHO_STORAGE,
        JSON.stringify(novoCarrinho)
      );
    } catch (error) {
      console.log("Erro ao salvar o carrinho:", error);
    }
  };

  const adicionarAoCarrinho = (item: ItemCarrinhoDto) => {
    const itemExistente = carrinho.find((i) => i.idProduto === item.idProduto);
    if (itemExistente) {
      const carrinhoAtualizado = carrinho.map((i) =>
        i.idProduto === item.idProduto
          ? { ...i, quantidade: i.quantidade + 1 }
          : i
      );
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    } else {
      const carrinhoAtualizado = [...carrinho, item];
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    }
  };

  const incrementarQuantidade = (itemId: string) => {
    const carrinhoAtualizado = carrinho.map((item) =>
      item.idProduto === itemId
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    );
    setCarrinho(carrinhoAtualizado);
    salvarCarrinho(carrinhoAtualizado);
  };
  const decrementarQuantidade = (itemId: string) => {
    const carrinhoAtualizado = carrinho.reduce((acc, item) => {
      if (item.idProduto === itemId) {
        if (item.quantidade > 1)
          acc.push({ ...item, quantidade: item.quantidade - 1 });
      } else {
        acc.push(item);
      }
      return acc;
    }, [] as typeof carrinho);

    setCarrinho(carrinhoAtualizado);
    salvarCarrinho(carrinhoAtualizado);
  };

  const removerDoCarrinho = (itemId: string) => {
    const carrinhoAtualizado = carrinho.filter(
      (item) => item.idProduto !== itemId
    );
    setCarrinho(carrinhoAtualizado);
    salvarCarrinho(carrinhoAtualizado);
  };

  const limparCarrinho = () => {
    setCarrinho([]);
    salvarCarrinho([]);
  };

  useEffect(() => {
    carregarCarrinho();
  }, []);

  return (
    <CarrinhoContext.Provider
      value={{
        carrinho,
        isCarrinhoVisible,
        adicionarAoCarrinho,
        removerDoCarrinho,
        incrementarQuantidade,
        decrementarQuantidade,
        limparCarrinho,
        toggleCarrinhoOverlay,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
