import { ItemCarrinhoDto } from "@/dto/ItemCarrinhoDto";
import { CARRINHO_STORAGE } from "@/storage/storageConfig";
import { showToast } from "@/utils/showToast";
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
      showToast(`Erro ao carregar o carrinho: ${error}`, "error");
    }
  };

  const salvarCarrinho = async (novoCarrinho: ItemCarrinhoDto[]) => {
    try {
      await AsyncStorage.setItem(
        CARRINHO_STORAGE,
        JSON.stringify(novoCarrinho)
      );
    } catch (error) {
      showToast(`Erro ao salvar o carrinho: ${error}`, "error");
    }
  };

  const adicionarAoCarrinho = (item: ItemCarrinhoDto) => {
    // Verifica se a quantidade a ser adicionada não excede a disponível
    if (item.quantidade > item.quantidadeDisponivel) {
      showToast(
        "Quantidade solicitada excede a quantidade disponível",
        "error"
      );
      return;
    }

    const itemExistente = carrinho.find((i) => i.idProduto === item.idProduto);

    if (itemExistente) {
      // Verifica se a quantidade total não excede a disponível
      if (
        itemExistente.quantidade + item.quantidade >
        itemExistente.quantidadeDisponivel
      ) {
        showToast(
          "Quantidade no carrinho excede a quantidade disponível",
          "error"
        );
        return;
      }

      const carrinhoAtualizado = carrinho.map((i) =>
        i.idProduto === item.idProduto
          ? { ...i, quantidade: i.quantidade + item.quantidade }
          : i
      );
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    } else {
      if (carrinho.length > 0 && carrinho[0].idFarmacia !== item.idFarmacia) {
        showToast(
          "Você só pode realizar o pedido de produtos de uma farmácia por vez",
          "error"
        );
        return;
      }

      const carrinhoAtualizado = [...carrinho, item];
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    }
  };

  const incrementarQuantidade = (itemId: string) => {
    const item = carrinho.find((item) => item.idProduto === itemId);
    if (item && item.quantidade < item.quantidadeDisponivel) {
      const carrinhoAtualizado = carrinho.map((i) =>
        i.idProduto === itemId ? { ...i, quantidade: i.quantidade + 1 } : i
      );
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    } else {
      showToast("Não é possível aumentar a quantidade", "error");
    }
  };

  const decrementarQuantidade = (itemId: string) => {
    const item = carrinho.find((item) => item.idProduto === itemId);
    if (item && item.quantidade > 1) {
      const carrinhoAtualizado = carrinho.map((i) =>
        i.idProduto === itemId ? { ...i, quantidade: i.quantidade - 1 } : i
      );
      setCarrinho(carrinhoAtualizado);
      salvarCarrinho(carrinhoAtualizado);
    } else {
      showToast("A quantidade não pode ser menor que 1", "error");
    }
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
