import { classificar } from '../utils/indice.js';

export const Card = ({ title, subtitle, actions, className = '', children }) => (
  <section className={`card ${className}`}>
    {(title || actions) && (
      <header className="card-head">
        <div>
          {title && <h2>{title}</h2>}
          {subtitle && <p className="sub">{subtitle}</p>}
        </div>
        {actions}
      </header>
    )}
    {children}
  </section>
);

export const Badge = ({ valor }) => {
  const c = classificar(valor);
  return (
    <span className="badge" style={{ '--badge': c.cor }}>
      <i /> {c.label}
    </span>
  );
};

export const Kpi = ({ label, valor, rodape, destaque, children }) => (
  <div className={`kpi ${destaque ? 'kpi-destaque' : ''}`}>
    <span className="kpi-label">{label}</span>
    <strong className="kpi-valor">{valor}</strong>
    {children}
    {rodape && <span className="kpi-rodape">{rodape}</span>}
  </div>
);

export const Nota = ({ children }) => <p className="nota">{children}</p>;
