import { TipoPessoa } from './tipo-pessoa.model';

export interface Parte {
  id: string;
  nome: string;
  tipoPessoa: TipoPessoa;
  cpfCnpj: string;
  email: string;
}
