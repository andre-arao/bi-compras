import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, Dot,
} from 'recharts';
import { classificar, fmtPct } from '../utils/indice.js';

const PontoColorido = (props) => {
  const { cx, cy, payload, dataKey, r = 4 } = props;
  if (cx == null || cy == null) return null;
  return <Dot cx={cx} cy={cy} r={r} fill={classificar(payload[dataKey]).cor} stroke="var(--surface)" strokeWidth={2} />;
};

const TooltipIndice = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  const v = payload[0].value;
  const c = classificar(v);
  return (
    <div className="tooltip">
      <strong>{label}</strong>
      <span>{fmtPct(v)} • <span style={{ color: c.cor }}>{c.label}</span></span>
    </div>
  );
};

export function IndiceGeralChart({ data, meta }) {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart data={data} margin={{ top: 12, right: 16, left: -8, bottom: 0 }}>
        <CartesianGrid stroke="var(--grid)" vertical={false} />
        <XAxis dataKey="semana" tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <YAxis domain={[72.5, 80]} ticks={[72.5, 75, 77.5, 80]} tickFormatter={fmtPct}
          tick={{ fill: 'var(--muted)', fontSize: 12 }} axisLine={false} tickLine={false} />
        <Tooltip content={<TooltipIndice />} cursor={{ stroke: 'var(--grid)' }} />
        <ReferenceLine y={meta} stroke="var(--c-meta)" strokeDasharray="5 4" strokeWidth={1.5}
          label={{ value: `Meta ${meta}%`, position: 'insideBottomRight', fill: 'var(--c-meta)', fontSize: 11 }} />
        <Line type="monotone" dataKey="indice" stroke="var(--accent)" strokeWidth={2.5}
          dot={<PontoColorido r={5} />} activeDot={{ r: 7 }} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function SetorSparkline({ semanas, meta }) {
  const data = semanas.map((indice, i) => ({ semana: `Sem. ${i + 1}`, indice }));
  return (
    <ResponsiveContainer width="100%" height={120}>
      <LineChart data={data} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
        <CartesianGrid stroke="var(--grid)" vertical={false} />
        <XAxis dataKey="semana" tickFormatter={(_, i) => i + 1} tick={{ fill: 'var(--muted)', fontSize: 11 }}
          axisLine={false} tickLine={false} />
        <YAxis domain={[65, 85]} ticks={[65, 75, 85]} tickFormatter={(v) => `${v}%`}
          tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} tickLine={false} />
        <Tooltip content={<TooltipIndice />} cursor={{ stroke: 'var(--grid)' }} />
        <ReferenceLine y={meta} stroke="var(--c-meta)" strokeWidth={1.5} />
        <Line type="monotone" dataKey="indice" stroke="var(--ink-2)" strokeWidth={2}
          dot={<PontoColorido r={3.5} />} isAnimationActive={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
