export enum TipoPessoa {
  FISICA = 'FISICA',
  JURIDICA = 'JURIDICA',
}

export const TIPOS_PESSOA_OPTIONS = [
  { label: 'Pessoa Física', value: TipoPessoa.FISICA },
  { label: 'Pessoa Jurídica', value: TipoPessoa.JURIDICA },
];
