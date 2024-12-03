export const formatBRL = (preco: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(preco);
};

export const formatBRLWithCents = (preco: number) => {
  return formatBRL(preco / 100);
};
