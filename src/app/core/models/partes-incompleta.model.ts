import { TipoPessoa } from './tipo-pessoa.model';

export interface ParteIncompleta {
  nome: string;
  tipoPessoa: TipoPessoa;
  cpfCnpj: string;
  email: string;
}
