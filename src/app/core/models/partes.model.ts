export interface Parte {
  id: number;
  nome: string;
  tipoPessoa: string;
  cpfCnpj: string; // CPF ou CNPJ
  email?: string; // Opcional
}
