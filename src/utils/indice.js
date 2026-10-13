// Faixas definidas pelo setor (ajustáveis conforme regra oficial do gestor).
export const FAIXAS = [
  { ate: 73, label: 'Atenção', faixa: 'Abaixo de 73%', cor: 'var(--c-atencao)' },
  { ate: 75, label: 'Aceitável', faixa: '73% a 74,9%', cor: 'var(--c-aceitavel)' },
  { ate: 76, label: 'Meta', faixa: '75% a 75,9%', cor: 'var(--c-meta)' },
  { ate: 80, label: 'Regular', faixa: '76% a 79,9%', cor: 'var(--c-regular)' },
  { ate: Infinity, label: 'Ruim', faixa: '80% ou mais', cor: 'var(--c-ruim)' },
];

export const classificar = (v) => FAIXAS.find((f) => v < f.ate);

// Fórmula ilustrativa — substituir pela oficial da rede.
export const calcularIndice = (compras, vendas) => (vendas ? (compras / vendas) * 100 : 0);

const pct = new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
export const fmtPct = (v) => `${pct.format(v)}%`;

export const fmtMilhoes = (v) =>
  `R$ ${new Intl.NumberFormat('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(v / 1e6)} mi`;

export const fmtData = (iso) => new Date(`${iso}T12:00:00`).toLocaleDateString('pt-BR');

export const diasDesde = (iso, hoje = new Date()) =>
  Math.floor((hoje - new Date(`${iso}T00:00:00`)) / 86_400_000);

// Heurística para a coluna "Análise" de produtos sem compra.
export function analisarSemCompra({ estoque, vendas30d }) {
  if (estoque === 0 && vendas30d > 0) return { texto: 'Ruptura e sem reposição', tom: 'ruim' };
  if (estoque >= vendas30d) return { texto: 'Estoque cobre vendas', tom: 'ok' };
  return { texto: 'Avaliar reposição', tom: 'alerta' };
}
