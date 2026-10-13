// Dados FICTÍCIOS para demonstração.
// Substitua o conteúdo de src/services/api.js por chamadas reais (Arius, Google Agenda etc.)
// mantendo o mesmo formato de retorno.

export const resumo = {
  mesReferencia: 'Outubro/2026',
  meta: 75,
  compras: 2_478_000,
  vendas: 3_210_000,
  fornecedoresAgendados: 71,
  pedidosRealizados: 63,
  pedidosPendentes: 8,
};

export const indiceSemanal = [
  { semana: 'Sem. 1', indice: 74.1 },
  { semana: 'Sem. 2', indice: 76.0 },
  { semana: 'Sem. 3', indice: 78.4 },
  { semana: 'Sem. 4', indice: 77.6 },
  { semana: 'Atual', indice: 77.2 },
];

export const setores = [
  {
    id: 'pereciveis',
    nome: 'Perecíveis',
    responsavel: 'Comprador Júlio',
    detalhe: 'congelados, iogurtes, queijos, manteiga etc.',
    semanas: [72.8, 75.1, 73.6, 74.4, 74.0],
  },
  {
    id: 'mercearia',
    nome: 'Mercearia Geral',
    responsavel: 'Comprador Daniel',
    semanas: [75.5, 76.8, 78.9, 77.0, 77.2],
  },
  {
    id: 'limpeza',
    nome: 'Limpeza',
    responsavel: null,
    semanas: [70.2, 73.4, 71.8, 72.9, 72.5],
  },
  {
    id: 'perfumaria',
    nome: 'Perfumaria',
    responsavel: null,
    semanas: [77.4, 79.8, 82.1, 81.3, 80.5],
  },
  {
    id: 'hortifruti',
    nome: 'Hortifruti',
    responsavel: null,
    semanas: [71.9, 74.6, 72.8, 74.1, 73.5],
  },
];

export const agendaFornecedores = [
  { dia: 'Segunda', fornecedores: 15, pedidos: 13 },
  { dia: 'Terça', fornecedores: 12, pedidos: 11 },
  { dia: 'Quarta', fornecedores: 16, pedidos: 14 },
  { dia: 'Quinta', fornecedores: 10, pedidos: 10 },
  { dia: 'Sexta', fornecedores: 14, pedidos: 12 },
  { dia: 'Sábado', fornecedores: 4, pedidos: 3 },
];

export const rupturas = [
  { produto: 'Iogurte natural 170 g', setor: 'Perecíveis', estoque: 0, vendaDia: 18 },
  { produto: 'Arroz tipo 1 5 kg', setor: 'Mercearia', estoque: 2, vendaDia: 24 },
  { produto: 'Detergente neutro 500 ml', setor: 'Limpeza', estoque: 4, vendaDia: 16 },
  { produto: 'Banana prata kg', setor: 'Hortifruti', estoque: 0, vendaDia: 35 },
  { produto: 'Shampoo anticaspa 200 ml', setor: 'Perfumaria', estoque: 1, vendaDia: 6 },
];

export const semCompra = [
  { produto: 'Queijo muçarela peça', setor: 'Perecíveis', ultimaCompra: '2026-09-02', estoque: 8, vendas30d: 42 },
  { produto: 'Amaciante concentrado 1 l', setor: 'Limpeza', ultimaCompra: '2026-08-28', estoque: 31, vendas30d: 12 },
  { produto: 'Biscoito wafer 110 g', setor: 'Mercearia', ultimaCompra: '2026-08-25', estoque: 0, vendas30d: 36 },
  { produto: 'Desodorante aerosol 150 ml', setor: 'Perfumaria', ultimaCompra: '2026-09-05', estoque: 22, vendas30d: 9 },
];
