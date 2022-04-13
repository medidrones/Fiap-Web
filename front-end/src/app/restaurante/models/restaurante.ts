import { Endereco } from './endereco';
import { Receita } from 'src/app/receita/models/receita';

export class Restaurante {
    id: string;
    nome: string;
    documento: string;
    ativo: boolean;
    tipoRestaurante: number;
    endereco: Endereco;
    receitas: Receita[]
}
