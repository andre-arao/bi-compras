# Pinheirão • BI Compras

Painel de acompanhamento mensal de compras (Compras ÷ Vendas) — React + Vite + Recharts, com dados fictícios.

## Rodar

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # gera dist/
```

## Estrutura

```
src/
  mocks/data.js        # dados fictícios
  services/api.js      # camada de dados (troque o mock por fetch na API real)
  utils/indice.js      # fórmula, faixas (Atenção…Ruim), formatadores
  components/          # KPIs, gráficos, tabelas
  App.jsx              # layout do painel
```

## Integração real

- **Fórmula**: `calcularIndice()` em `utils/indice.js` — substituir pela oficial da rede.
- **Faixas**: array `FAIXAS` em `utils/indice.js`.
- **Dados**: `getDashboard()` em `services/api.js` deve retornar o mesmo formato do mock
  (vendas/compras do Arius, agenda do Google Agenda etc.).
- "Dias sem compra" é calculado a partir da data atual; a coluna "Análise" usa uma heurística simples
  (`analisarSemCompra`) que pode ser ajustada.
