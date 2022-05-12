export interface receita {
    id: string;
    nome: string;
    descricao : string;
    ingrediente : string;
    modoPreparo : string;
    tag : string;
    imagem : string;
    valor : number;
    dataCadastro : Date;
    ativo : boolean;
}
