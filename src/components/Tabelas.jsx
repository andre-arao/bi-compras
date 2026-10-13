import { useMemo, useState } from 'react';
import { analisarSemCompra, diasDesde, fmtData } from '../utils/indice.js';

export function AgendaTabela({ agenda }) {
  const total = agenda.reduce(
    (a, d) => ({ f: a.f + d.fornecedores, p: a.p + d.pedidos }), { f: 0, p: 0 });
  return (
    <>
      <div className="mini-kpis">
        <div><strong>{total.f}</strong><span>agendados</span></div>
        <div><strong className="ok">{total.p}</strong><span>com pedido</span></div>
        <div><strong className="alerta">{total.f - total.p}</strong><span>sem pedido</span></div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr><th>Dia</th><th className="num">Fornecedores</th><th className="num">Pedidos feitos</th><th className="num">Pendentes</th><th>Conclusão</th></tr>
          </thead>
          <tbody>
            {agenda.map((d) => {
              const pend = d.fornecedores - d.pedidos;
              const pctOk = (d.pedidos / d.fornecedores) * 100;
              return (
                <tr key={d.dia}>
                  <td>{d.dia}</td>
                  <td className="num">{d.fornecedores}</td>
                  <td className="num">{d.pedidos}</td>
                  <td className={`num ${pend ? 'alerta' : 'ok'}`}>{pend}</td>
                  <td><div className="bar"><span style={{ width: `${pctOk}%` }} /></div></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function RupturaTabela({ rupturas, setores }) {
  const [setor, setSetor] = useState('Todos');
  const lista = useMemo(
    () => rupturas
      .filter((r) => setor === 'Todos' || r.setor === setor)
      .sort((a, b) => b.vendaDia - a.vendaDia),
    [rupturas, setor]);
  return (
    <>
      <div className="filtros">
        <label>Setor
          <select value={setor} onChange={(e) => setSetor(e.target.value)}>
            {['Todos', ...setores].map((s) => <option key={s}>{s}</option>)}
          </select>
        </label>
      </div>
      <div className="table-wrap">
        <table>
          <thead><tr><th>Produto</th><th>Setor</th><th className="num">Estoque</th><th className="num">Venda/dia</th></tr></thead>
          <tbody>
            {lista.map((r) => (
              <tr key={r.produto}>
                <td>{r.produto}</td>
                <td>{r.setor}</td>
                <td className={`num ${r.estoque === 0 ? 'ruim' : 'alerta'}`}>{r.estoque}</td>
                <td className="num">{r.vendaDia}</td>
              </tr>
            ))}
            {!lista.length && <tr><td colSpan={4} className="vazio">Nenhum produto em ruptura.</td></tr>}
          </tbody>
        </table>
      </div>
    </>
  );
}

export function SemCompraTabela({ itens, hoje }) {
  const linhas = itens
    .map((i) => ({ ...i, dias: diasDesde(i.ultimaCompra, hoje), analise: analisarSemCompra(i) }))
    .filter((i) => i.dias > 30)
    .sort((a, b) => b.dias - a.dias);
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr><th>Produto</th><th>Setor</th><th>Última compra</th><th className="num">Dias</th><th className="num">Estoque atual</th><th className="num">Vendas em 30 dias</th><th>Análise</th></tr>
        </thead>
        <tbody>
          {linhas.map((i) => (
            <tr key={i.produto}>
              <td>{i.produto}</td>
              <td>{i.setor}</td>
              <td>{fmtData(i.ultimaCompra)}</td>
              <td className="num">{i.dias}</td>
              <td className="num">{i.estoque} un.</td>
              <td className="num">{i.vendas30d} un.</td>
              <td><span className={`tag tag-${i.analise.tom}`}>{i.analise.texto}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
