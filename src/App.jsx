import { useEffect, useState } from 'react';
import { getDashboard } from './services/api.js';
import { Card, Badge, Kpi, Nota } from './components/Ui.jsx';
import { IndiceGeralChart, SetorSparkline } from './components/Charts.jsx';
import { AgendaTabela, RupturaTabela, SemCompraTabela } from './components/Tabelas.jsx';
import { FAIXAS, calcularIndice, classificar, fmtMilhoes, fmtPct } from './utils/indice.js';

export default function App() {
  const [data, setData] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    getDashboard().then(setData).catch((e) => setErro(e.message));
  }, []);

  if (erro) return <div className="estado">Erro ao carregar: {erro}</div>;
  if (!data) return <div className="estado">Carregando painel…</div>;

  const { resumo, indiceSemanal, setores, agenda, rupturas, semCompra } = data;
  const indice = calcularIndice(resumo.compras, resumo.vendas);
  const faixa = classificar(indice);

  return (
    <div className="app">
      <header className="topo">
        <div>
          <span className="marca">Pinheirão • BI Compras</span>
          <h1>Acompanhamento mensal de compras</h1>
          <p className="sub">Compras ÷ Vendas • {resumo.mesReferencia} • comparação com a referência de {resumo.meta}%</p>
        </div>
        <span className="aviso">Dados fictícios (mock)</span>
      </header>

      <Nota>
        Exemplo visual com valores fictícios. A conta foi representada como Compras ÷ Vendas × 100;
        o painel deve usar a fórmula oficial da rede.
      </Nota>

      <div className="kpis">
        <Kpi label="Índice geral Compras ÷ Vendas" valor={fmtPct(indice)} destaque
          rodape={`Referência: ${resumo.meta}%`}>
          <Badge valor={indice} />
        </Kpi>
        <Kpi label="Compras no mês" valor={fmtMilhoes(resumo.compras)} rodape="Todas as lojas e setores" />
        <Kpi label="Vendas no mês" valor={fmtMilhoes(resumo.vendas)} rodape="Mesmo período das compras" />
        <Kpi label="Fornecedores agendados" valor={resumo.fornecedoresAgendados}
          rodape={`${resumo.pedidosRealizados} pedidos realizados • ${resumo.pedidosPendentes} pendentes`} />
      </div>

      <div className="grid-2-1">
        <Card title="Índice geral ao longo do mês"
          subtitle={`Percentual semanal de compras sobre vendas • linha de referência em ${resumo.meta}%`}
          actions={<div className="atual"><strong style={{ color: faixa.cor }}>{fmtPct(indice)}</strong><span>Atual</span></div>}>
          <IndiceGeralChart data={indiceSemanal} meta={resumo.meta} />
        </Card>

        <Card title="Como ler o índice" subtitle="Faixas de acompanhamento definidas pelo setor">
          <ul className="faixas">
            {FAIXAS.map((f) => (
              <li key={f.label} className={f.label === faixa.label ? 'ativa' : ''}>
                <span><i style={{ background: f.cor }} />{f.faixa}</span>
                <strong style={{ color: f.cor }}>{f.label}</strong>
              </li>
            ))}
          </ul>
          <Nota>As faixas podem ser ajustadas conforme a regra oficial do gestor.</Nota>
        </Card>
      </div>

      <Card title="Desempenho por setor"
        subtitle={`Cada gráfico mostra o índice semanal; a linha verde marca ${resumo.meta}%`}
        actions={<span className="chip">Mês atual</span>}>
        <div className="setores">
          {setores.map((s) => {
            const atual = s.semanas.at(-1);
            return (
              <article key={s.id} className="setor">
                <div className="setor-head">
                  <div>
                    <h3>{s.nome}</h3>
                    <p className="sub">
                      {s.responsavel ?? 'Responsável: confirmar'}
                      {s.detalhe && ` • ${s.detalhe}`}
                    </p>
                  </div>
                  <div className="setor-valor">
                    <strong>{fmtPct(atual)}</strong>
                    <Badge valor={atual} />
                  </div>
                </div>
                <SetorSparkline semanas={s.semanas} meta={resumo.meta} />
              </article>
            );
          })}
        </div>
      </Card>

      <div className="grid-2">
        <Card title="Agenda de fornecedores da semana"
          subtitle="Agendamentos do Google Agenda • pedidos realizados conferidos no Arius">
          <AgendaTabela agenda={agenda} />
          <Nota>Para cruzar agenda e pedido, associar evento ao fornecedor e comparar com o pedido gerado no Arius.</Nota>
        </Card>

        <Card title="Produtos com ruptura" subtitle="Sem estoque disponível ou abaixo do mínimo • exemplo">
          <RupturaTabela rupturas={rupturas} setores={[...new Set(rupturas.map((r) => r.setor))]} />
          <Nota>Filtros úteis: loja, setor, dias em ruptura, estoque e venda média diária.</Nota>
        </Card>
      </div>

      <Card title="Produtos sem compra há mais de 30 dias"
        subtitle="Use a última compra recebida; cruze com vendas e estoque para separar item esquecido de item sem necessidade de reposição • exemplo">
        <SemCompraTabela itens={semCompra} hoje={new Date()} />
      </Card>
    </div>
  );
}
