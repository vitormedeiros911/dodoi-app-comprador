import { CarrinhoContext } from "@/contexts/CarrinhoContext";
import { useContext } from "react";

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error("useCarrinho must be used within a CarrinhoProvider");
  }
  return context;
};
