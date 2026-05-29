import React from 'react';

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
        * {
          box-sizing: border-box;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        }

        .home-page {
          display: flex;
          justify-content: center;
          align-items: flex-start; 
          width: 100%;
          min-height: 100vh; 
          background-color: #fdfdfd;
          padding: 40px; 
        }

        .cards-row {
          display: flex;
          gap: 40px;
        }

        /* ── O GRANDE PAINEL DA ESQUERDA ── */
        .main-panel-left {
          width: 1100px; 
          height: 600px; 
          background: #ffffff;
          border: 1px solid #a8a8a8;
          border-radius: 6px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.25);
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .small-card {
          width: 170px;
          height: 125px;
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 10px;
        }

        .stat-number { font-size: 42px; font-weight: 300; color: #111; margin-bottom: 6px; line-height: 1; }
        .stat-label { font-size: 12px; font-weight: 400; color: #333; line-height: 1.3; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .timer-card { background: #06111f; border: none; position: relative; }
        .timer-text { color: #ff0000; font-size: 20px; font-weight: 800; letter-spacing: 2px; position: absolute; z-index: 2; }
        .timer-svg { position: absolute; width: 110px; height: 110px; }

        /* ── COLUNA DIREITA ── */
        .col-right {
          width: 360px; 
          height: 600px; 
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 20px; 
        }

        /* Botão perfeitamente reto com a lateral direita dos artigos */
        .btn-aprendizado {
          align-self: flex-end; /* Crava o botão na direita */
          margin: 0; /* Remove qualquer margem invisível */
          padding: 10px 24px;
          border: 2px solid #1c2b44;
          background: #ffffff;
          font-weight: 600;
          font-size: 12px;
          color: #1c2b44;
          cursor: pointer;
          border-radius: 4px;
          text-align: center;
          transition: all 0.2s;
        }
        
        .btn-aprendizado:hover {
          background: #1c2b44;
          color: #fff;
        }

        /* Agrupamento dos artigos para dividir o espaço exato que sobra */
        .articles {
          flex: 1; 
          display: flex;
          flex-direction: column;
          gap: 18px; 
        }

        .article-card {
          flex: 1; /* Força os dois artigos a terem o mesmo tamanho exato */
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          padding: 20px; 
          display: flex;
          flex-direction: column;
          position: relative;
          /* overflow: auto removido para não quebrar o alinhamento com barras invisíveis */
        }

        .article-card::before {
          content: '';
          position: absolute;
          top: 15px;
          left: 20px;
          width: 20px;
          height: 2px;
          background-color: #222;
        }

        .artigo-header { font-size: 16px; font-weight: 500; color: #333; line-height: 1.3; margin-top: 6px; margin-bottom: 12px; }
        .artigo-num { color: #e32929; font-weight: bold;}
        .artigo-desc { font-size: 14px; color: #222; line-height: 1.5; white-space: pre-line; margin: 0; }
        .artigo-loc { font-size: 12px; color: #888; line-height: 1.4; white-space: pre-line; margin-top: 12px; margin-bottom: 0; }
      `}</style>

      <div className="home-page">
        <div className="cards-row">
          
          {/* GRANDE PAINEL ESQUERDO */}
          <div className="main-panel-left">
            
            <div className="small-card">
              <div className="stat-number">4</div>
              <div className="stat-label">SIMULADOS<br/>ATRASADOS</div>
            </div>
            
            <div className="small-card">
              <div className="stat-number">30%</div>
              <div className="stat-label">FILOSOFIA DO<br/>DIREITO</div>
            </div>
            
            <div className="small-card timer-card">
              <svg className="timer-svg" viewBox="0 0 100 100">
                <circle 
                  cx="50" cy="50" r="38" 
                  fill="none" 
                  stroke="#ffffff" 
                  strokeWidth="12" 
                  strokeDasharray="180 250" 
                  strokeLinecap="butt" 
                  transform="rotate(135 50 50)" 
                />
              </svg>
              <span className="timer-text">45:00</span>
            </div>
            
          </div>

          {/* COLUNA DIREITA */}
          <div className="col-right">
            
            <button className="btn-aprendizado">MEU APRENDIZADO</button>
            
            <div className="articles">
              {artigos.map((a) => (
                <div key={a.id} className="article-card">
                  <div className="artigo-header">
                    <span className="artigo-num">Art . {a.id}</span> — {a.titulo}
                  </div>
                  <p className="artigo-desc">{a.descricao}</p>
                  <p className="artigo-loc">{a.localizacao}</p>
                </div>
              ))}
            </div>
            
          </div>
          
        </div>
      </div>
    </>
  )
}