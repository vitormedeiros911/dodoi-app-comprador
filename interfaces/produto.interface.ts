export interface IProduto {
  id: string;
  nome: string;
  urlImagem: string;
  precoUnitario: number;
  descricao: string;
  isFavorito?: boolean;
  idFarmacia: string;
  quantidadeDisponivel: number;
  farmacia: {
    id: string;
    nome: string;
    urlImagem: string;
  };
}
