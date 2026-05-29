import React from 'react';

// ── Dados da Página Principal ────────────────────────────────
const missoes = [
  { id: 1, text: 'Subir 2 degraus no Direicontent', done: false },
  { id: 2, text: 'Estudar 1h utilizando Pomodoro', done: true },
  { id: 3, text: 'Chegar em 30 dias de ofensiva', done: false },
]

const artigos = [
  {
    id: 121,
    titulo: 'Homicídio Simples',
    descricao: 'Matar alguém:\nPena/reclusão, de seis a vinte anos',
    localizacao: 'Título I — Dos Crimes Contra a Pessoa\nCapítulo I — Dos Crimes Contra a Vida\nArtigo 121',
  },
  {
    id: 157,
    titulo: 'Roubo',
    descricao:
      'Subtrair coisa móvel alheia, para si ou para outrem, mediante a grave ameaça ou violência, reduzido à impossibilidade de resistência.\nPena/Reclusão, de quatro a dez anos, e multa.',
    localizacao:
      'Título II — Dos Crimes Contra o Patrimônio\nCapítulo II — Do Roubo e da Extorsão\nArtigo 157',
  },
]

export default function Home() {
  return (
    <>
      <style>{`
        /* ── ESTRUTURA GERAL DA PÁGINA ── */
        .home-container {
          display: flex;
          justify-content: space-between;
          align-items: stretch;
          padding: 40px 60px;
          gap: 40px;
        }

        .home-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 400px;
          flex-shrink: 0;
        }

        .home-right {
          display: flex;
          flex-direction: column;
          gap: 24px;
          flex: 1;
          max-width: 500px;
          align-items: flex-end; 
          margin-left: auto; 
        }

        .home-card {
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          padding: 28px;
          width: 100%;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          position: relative;
        }

        /* ── ESTILOS DAS MISSÕES ── */
        .missoes-title {
          font-size: 16px;
          font-weight: 600;
          border-bottom: 2px solid #e32929;
          padding-bottom: 4px;
          display: inline-block;
          margin-top: 0;
          margin-bottom: 20px;
          color: #222;
        }
        .missoes-list {
          list-style: none;
          padding: 0;
          margin: 0 0 20px 0;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .missao-item {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .checkbox {
          width: 18px;
          height: 18px;
          border: 1px solid #888;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f8f8;
          flex-shrink: 0;
        }
        .checkbox.checked {
          background: #4a5a73;
          border-color: #4a5a73;
        }
        .missao-text {
          font-size: 15px;
          color: #222;
        }
        .missao-item.done .missao-text {
          text-decoration: line-through;
          color: #888;
        }
        .btn-missoes-futuras {
          width: 100%;
          padding: 14px;
          border: 2px solid #1c2b44;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          color: #1c2b44;
          background: transparent;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-missoes-futuras:hover {
          background: #1c2b44;
          color: #fff;
        }

        /* ── ESTILOS DOS ARTIGOS ── */
        .artigo-header {
          font-size: 17px;
          font-weight: 500;
          line-height: 1.3;
          margin-bottom: 14px;
        }
        .artigo-num { color: #e32929; font-weight: bold;}
        .artigo-dash { color: #222; }
        .artigo-titulo { color: #222; font-weight: bold;}
        .artigo-descricao {
          font-size: 15px;
          color: #222;
          line-height: 1.6;
          white-space: pre-line;
          margin: 0;
        }
        .artigo-localizacao {
          font-size: 13px;
          color: #888;
          line-height: 1.5;
          white-space: pre-line;
          margin-top: 14px;
          margin-bottom: 0;
        }
        .btn-aprendizado {
          padding: 16px 32px;
          border: 2px solid #1c2b44;
          border-radius: 4px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.5px;
          color: #1c2b44;
          background: transparent;
          align-self: flex-end;
          transition: all 0.2s;
          margin-top: 8px;
          cursor: pointer;
        }
        .btn-aprendizado:hover {
          background: #1c2b44;
          color: #fff;
        }


        /* ════════════════════════════════════════════════
           ESTILOS DO FOGO ANIMADO (Sua versão)
           ════════════════════════════════════════════════ */
        .fire-banner {
          width: 100%;
          height: 160px; /* Reduzido para ficar mais proporcional */
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          background: linear-gradient(
            180deg,
            #1a0000 0%,
            #3d0500 15%,
            #7a1000 35%,
            #c83000 55%,
            #e85000 70%,
            #f87020 85%,
            #ffa040 100%
          );
          margin-top: auto;
        }

        .fire-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 4px; /* Adiciona o gap para separar o Tribunal dos Números */
        }

        /* Floating fire particles */
        .fire-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          border-radius: 50% 50% 30% 30% / 60% 60% 40% 40%;
          opacity: 0;
          animation: rise 2.4s ease-in infinite;
        }

        .p0  { width: 8px;  height: 14px; background: #ffcc00; bottom: 10%; left: 10%; animation-delay: 0s;    animation-duration: 2.1s; }
        .p1  { width: 6px;  height: 10px; background: #ff8800; bottom: 5%;  left: 22%; animation-delay: 0.3s;  animation-duration: 1.8s; }
        .p2  { width: 10px; height: 18px; background: #ff4400; bottom: 15%; left: 35%; animation-delay: 0.6s;  animation-duration: 2.4s; }
        .p3  { width: 7px;  height: 12px; background: #ffaa00; bottom: 8%;  left: 50%; animation-delay: 0.9s;  animation-duration: 2.0s; }
        .p4  { width: 9px;  height: 16px; background: #ff6600; bottom: 12%; left: 65%; animation-delay: 0.15s; animation-duration: 2.2s; }
        .p5  { width: 5px;  height: 9px;  background: #ffdd00; bottom: 5%;  left: 78%; animation-delay: 0.45s; animation-duration: 1.7s; }
        .p6  { width: 8px;  height: 13px; background: #ff3300; bottom: 18%; left: 88%; animation-delay: 0.75s; animation-duration: 2.3s; }
        .p7  { width: 6px;  height: 11px; background: #ffbb00; bottom: 6%;  left: 15%; animation-delay: 1.05s; animation-duration: 1.9s; }
        .p8  { width: 7px;  height: 14px; background: #ff5500; bottom: 10%; left: 42%; animation-delay: 1.35s; animation-duration: 2.1s; }
        .p9  { width: 5px;  height: 8px;  background: #ffee00; bottom: 4%;  left: 57%; animation-delay: 1.65s; animation-duration: 1.6s; }
        .p10 { width: 9px;  height: 15px; background: #ff7700; bottom: 14%; left: 72%; animation-delay: 1.95s; animation-duration: 2.0s; }
        .p11 { width: 6px;  height: 10px; background: #ff2200; bottom: 7%;  left: 95%; animation-delay: 0.55s; animation-duration: 1.8s; }

        @keyframes rise {
          0%   { transform: translateY(0) scale(1);   opacity: 0.9; }
          50%  { transform: translateY(-40px) scale(1.1); opacity: 0.6; }
          100% { transform: translateY(-90px) scale(0.4); opacity: 0; }
        }

        .tribunal-label {
          /* Mudado de absolute para flow normal para o Flexbox cuidar do espaçamento */
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.55);
          text-transform: uppercase;
        }

        .fire-badge-bg {
          display: flex;
          align-items: baseline;
          gap: 2px;
          z-index: 2;
          position: relative;
          filter: drop-shadow(0 2px 12px rgba(0,0,0,0.5));
        }

        .fire-number {
          font-size: 72px;
          font-weight: 900;
          color: #ffffff;
          letter-spacing: -3px;
          line-height: 1;
          text-shadow: 0 0 30px rgba(255,100,0,0.8), 0 2px 4px rgba(0,0,0,0.6);
        }

        .fire-dias {
          font-size: 36px;
          font-weight: 900;
          color: #e32929; /* Mudado de var(--red) para garantir a cor */
          letter-spacing: 2px;
          line-height: 1;
          text-shadow: 0 0 20px rgba(255,50,0,0.9), 0 2px 4px rgba(0,0,0,0.6);
          align-self: flex-end;
          padding-bottom: 8px;
        }
      `}</style>

      <div className="home-container">
        
        {/* COLUNA ESQUERDA (Missões no topo, Tribunal em baixo) */}
        <div className="home-left">
          
          <div className="home-card">
            <h3 className="missoes-title">Missões</h3>
            <ul className="missoes-list">
              {missoes.map((m) => (
                <li key={m.id} className={`missao-item${m.done ? ' done' : ''}`}>
                  <span className={`checkbox${m.done ? ' checked' : ''}`}>
                    {m.done && (
                      <svg viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </span>
                  <span className="missao-text">{m.text}</span>
                </li>
              ))}
            </ul>
            <button className="btn-missoes-futuras">MISSÕES FUTURAS</button>
          </div>

          {/* O NOVO BANNER DE FOGO */}
          <div className="fire-banner">
            <div className="fire-overlay">
              <div className="fire-particles">
                {[...Array(12)].map((_, i) => (
                  <span key={i} className={`particle p${i}`} />
                ))}
              </div>
              <div className="fire-badge-bg">
                <span className="fire-number">26</span>
                <span className="fire-dias">DIAS</span>
              </div>
            </div>
          </div>

        </div>

        {/* COLUNA DIREITA (Artigos de lei encostados na direita) */}
        <div className="home-right">
          
          {artigos.map((a) => (
            <div key={a.id} className="home-card">
              <div className="artigo-header">
                <span className="artigo-num">Art . {a.id}</span>
                <span className="artigo-dash"> — </span>
                <span className="artigo-titulo">{a.titulo}</span>
              </div>
              <p className="artigo-descricao">{a.descricao}</p>
              <p className="artigo-localizacao">{a.localizacao}</p>
            </div>
          ))}

          <button className="btn-aprendizado">MEU APRENDIZADO</button>
          
        </div>

      </div>
    </>
  )
}