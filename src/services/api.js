// Camada de acesso a dados. Hoje lê do mock; troque cada função por fetch() na API real.
import * as mock from '../mocks/data.js';

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const clone = (v) => structuredClone(v);

export async function getDashboard() {
  await delay();
  return clone({
    resumo: mock.resumo,
    indiceSemanal: mock.indiceSemanal,
    setores: mock.setores,
    agenda: mock.agendaFornecedores,
    rupturas: mock.rupturas,
    semCompra: mock.semCompra,
  });
}
