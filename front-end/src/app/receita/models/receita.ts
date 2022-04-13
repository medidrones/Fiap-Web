export interface Receita {
  id: string,
  nome: string,
  descricao: string,
  ingrediente: string,
  modoPreparo: string,
  tag: string,
  imagem: string,
  imagemUpload: string;
  valor: number,
  dataCadastro: string,
  ativo: true,
  restauranteId: string,
  nomeRestaurante: string
}

export interface Restaurante{
  id: string,
  nome: string,
}
