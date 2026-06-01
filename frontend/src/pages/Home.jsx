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
];

// Recebendo o setActiveNav como propriedade
export default function Home({ setActiveNav }) {
  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
          font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
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
          flex-direction: row; 
          gap: 30px;
        }

        /* Coluna para os cards pequenos */
        .stats-col {
          display: flex;
          flex-direction: column;
          justify-content: space-between; 
          height: 100%;
        }

        /* Cards aumentados */
        .small-card {
          width: 210px; 
          height: 160px; 
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.15);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 15px;
        }

        /* Efeito de clique nos cards */
        .clickable-card {
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .clickable-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }

        .stat-number { font-size: 52px; font-weight: 300; color: #111; margin-bottom: 8px; line-height: 1; }
        .stat-label { font-size: 13px; font-weight: 500; color: #333; line-height: 1.4; text-transform: uppercase; letter-spacing: 0.5px; }
        
        .timer-card { background: #06111f; border: none; position: relative; }
        .timer-text { color: #d90000; font-size: 26px; font-weight: 800; letter-spacing: 2px; position: absolute; z-index: 2; }
        .timer-svg { position: absolute; width: 140px; height: 140px; }

        /* ── CARD DO LADDER (NO MEIO) ── */
        .ladder-card {
          flex: 1; 
          background: #081724;
          border-radius: 6px;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px;
          overflow: hidden;
          box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
        }

        .ladder-card::before {
          content: "";
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 6px;
          background: #d90000; 
        }

        .ladder-badge {
          background: rgba(255, 255, 255, 0.1);
          color: #facc15;
          padding: 6px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 20px;
          z-index: 2;
        }

        .ladder-title {
          font-size: 28px;
          font-weight: 800;
          letter-spacing: 3px;
          color: #ffffff;
          margin: 0 0 15px 0;
          z-index: 2;
        }

        .ladder-desc {
          font-size: 15px;
          color: #a0aab8;
          max-width: 80%;
          line-height: 1.6;
          margin-bottom: 40px;
          z-index: 2;
        }

        .btn-jogar-ladder {
          background: #d90000;
          color: #ffffff;
          border: none;
          padding: 18px 50px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 3px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-transform: uppercase;
          z-index: 2;
        }

        .btn-jogar-ladder:hover {
          background: #ff1a1a;
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(217, 0, 0, 0.3);
        }

        .ladder-bg-icon {
          position: absolute;
          right: -30px;
          bottom: -40px;
          color: rgba(255, 255, 255, 0.03); 
          transform: rotate(-15deg);
          z-index: 1;
          pointer-events: none;
        }

        /* ── COLUNA DIREITA ── */
        .col-right {
          width: 360px; 
          height: 600px; 
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 20px; 
        }

        .btn-aprendizado {
          align-self: flex-end; 
          margin: 0; 
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

        .articles {
          flex: 1; 
          display: flex;
          flex-direction: column;
          gap: 18px; 
        }

        .article-card {
          flex: 1; 
          background: #ffffff;
          border: 1px solid #e0e0e0;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
          padding: 20px; 
          display: flex;
          flex-direction: column;
          position: relative;
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
        .artigo-num { color: #d90000; font-weight: bold;}
        .artigo-desc { font-size: 14px; color: #222; line-height: 1.5; white-space: pre-line; margin: 0; }
        .artigo-loc { font-size: 12px; color: #888; line-height: 1.4; white-space: pre-line; margin-top: 12px; margin-bottom: 0; }
      `}</style>

      <div className="home-page">
        <div className="cards-row">
          
          {/* GRANDE PAINEL ESQUERDO */}
          <div className="main-panel-left">
            
            {/* Coluna de Estatísticas */}
            <div className="stats-col">
              {/* Direciona para Simulados (Índice 3) */}
              <div 
                className="small-card clickable-card" 
                onClick={() => setActiveNav(3)}
              >
                <div className="stat-number">4</div>
                <div className="stat-label">SIMULADOS<br/>ATRASADOS</div>
              </div>
              
              {/* Direciona para Direitodo / Filosofia (Índice 0) */}
              <div 
                className="small-card clickable-card" 
                onClick={() => setActiveNav(0)}
              >
                <div className="stat-number">30%</div>
                <div className="stat-label">FILOSOFIA DO<br/>DIREITO</div>
              </div>
              
              {/* Direciona para Pomodoro (Índice 1) */}
              <div 
                className="small-card timer-card clickable-card" 
                onClick={() => setActiveNav(1)}
              >
                <svg className="timer-svg" viewBox="0 0 100 100">
                  <circle 
                    cx="50" cy="50" r="38" 
                    fill="none" 
                    stroke="#ffffff" 
                    strokeWidth="8" 
                    strokeDasharray="180 250" 
                    strokeLinecap="butt" 
                    transform="rotate(135 50 50)" 
                  />
                </svg>
                <span className="timer-text">45:00</span>
              </div>
            </div>

            {/* Card do Ladder no Centro */}
            <div className="ladder-card">
              <span className="ladder-badge">VADE MECUM</span>
              <h2 className="ladder-title">🔥 26 DIAS DE OFENSIVA</h2>
              <p className="ladder-desc">
                Continue resolvendo questões para finalizar o capítulo. Não deixe a chama apagar!
              </p>
              
              {/* Direciona para Direiladder (Índice 2) */}
              <button 
                className="btn-jogar-ladder"
                onClick={() => setActiveNav(2)}
              >
                CONTINUAR LADDER
              </button>

              <svg 
                className="ladder-bg-icon" 
                width="300" height="300" viewBox="0 0 37 42" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
              >
                <path fillRule="evenodd" clipRule="evenodd" d="M31.3143 0.0511552C29.9662 0.240199 28.6707 1.0699 27.885 2.24737C27.3185 3.09629 27.0888 3.93456 27.1336 4.98832C27.1666 5.76461 27.4011 6.54368 27.8403 7.33551C28.7813 9.03228 31.455 11.9665 32.0602 11.9665C32.4946 11.9665 34.3655 10.0742 35.5816 8.40507C37.0972 6.32476 37.3917 4.49116 36.4963 2.71053C35.54 0.808982 33.4735 -0.251569 31.3143 0.0511552ZM31.1477 2.06207C30.6558 2.227 30.2835 2.46388 29.9158 2.84584C29.3246 3.46011 29.0858 4.11263 29.1341 4.9821C29.1853 5.90347 29.562 6.59754 30.3169 7.1615C31.1943 7.81694 32.5477 7.89808 33.505 7.35264C34.4355 6.82243 34.9941 5.87607 34.9941 4.82973C34.9941 3.52665 34.1501 2.41503 32.8711 2.03358C32.4586 1.91058 31.5549 1.92555 31.1477 2.06207ZM28.5376 12.5144C27.8096 12.7417 27.1891 12.9515 27.1586 12.9805C27.103 13.0334 27.2171 13.4647 27.2994 13.5127C27.3235 13.5267 28.0631 13.3019 28.9431 13.013L30.5431 12.4877L30.2897 12.2905C30.1503 12.1821 29.9969 12.0951 29.9487 12.0972C29.9006 12.0994 29.2656 12.2871 28.5376 12.5144ZM24.8897 13.7969C24.215 14.0673 23.5685 14.3378 23.453 14.398L23.243 14.5074L23.3434 14.7436C23.3986 14.8735 23.4667 15.0023 23.4947 15.03C23.5228 15.0577 23.9498 14.9041 24.4437 14.6889C24.9375 14.4736 25.6031 14.1983 25.9227 14.0772C26.2423 13.9559 26.5108 13.8504 26.5192 13.8427C26.5278 13.835 26.487 13.7094 26.4288 13.5636C26.3644 13.4028 26.2823 13.2999 26.2196 13.302C26.1628 13.3038 25.5644 13.5265 24.8897 13.7969ZM21.8375 15.202C21.1243 15.6132 20.5516 16.0196 20.0761 16.4521L19.6839 16.809L19.9622 17.0445L20.2405 17.28L20.6198 16.935C21.0712 16.5244 21.7606 16.0394 22.3394 15.7253C22.5702 15.6 22.7676 15.4915 22.7782 15.4842C22.8237 15.4524 22.5007 14.885 22.4395 14.8894C22.4022 14.892 22.1313 15.0327 21.8375 15.202ZM19.0991 17.7817C19.0565 17.8805 19.02 18.1897 19.018 18.4688C19.0147 18.9267 19.0352 19.0142 19.228 19.3634C19.3941 19.6641 19.9777 20.3171 20.4362 20.7152C20.4765 20.7502 20.7105 20.5384 20.8614 20.3304L20.9836 20.1619L20.5326 19.7341C19.8698 19.1054 19.6266 18.5282 19.817 18.0359C19.8729 17.8915 19.8552 17.8716 19.5752 17.7621C19.4091 17.6972 19.2514 17.6347 19.2248 17.6231C19.1982 17.6116 19.1417 17.683 19.0991 17.7817ZM21.4082 20.9493C21.2823 21.1113 21.1947 21.2683 21.2135 21.2981C21.2511 21.358 23.3252 22.7112 23.7123 22.9284L23.9553 23.0648L24.1469 22.7651C24.2522 22.6003 24.339 22.4342 24.3397 22.396C24.3403 22.3578 24.0141 22.1315 23.6145 21.8931C23.2151 21.6546 22.6412 21.299 22.3394 21.1029C22.0375 20.9069 21.756 20.7258 21.7139 20.7006C21.6664 20.6722 21.5499 20.767 21.4082 20.9493ZM7.71225 21.6765C5.71791 21.8305 3.8908 22.6655 2.45146 24.0807C0.866651 25.6387 0 27.6742 0 29.838C0 32.1494 1.29497 34.7709 4.00766 37.9514C5.5638 39.7758 7.41067 41.5459 8.13909 41.911C8.33323 42.0083 8.42369 42.0215 8.55714 41.9716C9.2199 41.7241 11.5579 39.4475 13.2471 37.405C14.8498 35.4669 15.8202 33.865 16.3596 32.2665C16.7024 31.2504 16.805 30.6862 16.8035 29.8242C16.8012 28.5028 16.5437 27.4555 15.9145 26.2082C14.3998 23.2058 11.1508 21.4108 7.71225 21.6765ZM25.0003 22.957C24.9611 23.0356 24.8686 23.1891 24.795 23.2983L24.6609 23.4967L26.0579 24.3346C26.8261 24.7954 27.4772 25.1486 27.5046 25.1194C27.5321 25.0902 27.6429 24.9248 27.7508 24.7519L27.9472 24.4374L27.742 24.3019C27.3581 24.0484 25.1933 22.8143 25.1324 22.8143C25.0991 22.8143 25.0397 22.8785 25.0003 22.957ZM28.4475 25.1958C28.3195 25.3852 28.2148 25.5649 28.2148 25.5951C28.2148 25.6252 28.469 25.8159 28.7797 26.0186C29.0905 26.2214 29.6709 26.6253 30.0696 26.9163C30.4685 27.2072 30.8063 27.4453 30.8205 27.4453C30.8582 27.4453 31.3784 26.7748 31.3784 26.7262C31.3784 26.6582 30.0258 25.7098 28.9479 25.0221L28.6803 24.8513L28.4475 25.1958ZM7.59668 24.97C4.94217 25.443 3.12603 27.7972 3.42374 30.3792C3.64778 32.3222 4.97135 33.9069 6.90842 34.5513C7.49086 34.745 8.81592 34.7968 9.45873 34.6509C10.4085 34.4353 11.1007 34.0771 11.8037 33.4376C14.3766 31.097 13.7655 26.9667 10.6209 25.4437C10.3013 25.2889 9.86548 25.1172 9.65242 25.0621C9.19285 24.9432 8.03746 24.8915 7.59668 24.97ZM31.7497 27.6214L31.4468 27.9772L32.109 28.647C32.6711 29.2154 32.9692 29.5903 33.3488 30.2066C33.4084 30.3034 33.4547 30.2938 33.8492 30.1027C34.0882 29.9869 34.2838 29.8591 34.2838 29.8187C34.2838 29.6332 33.5637 28.6934 32.9391 28.064C32.5601 27.682 32.2056 27.3461 32.1513 27.3175C32.078 27.2789 31.9746 27.3571 31.7497 27.6214ZM34.0902 30.8644L33.6705 30.9726L33.6924 31.3639C33.7259 31.9604 33.5749 32.3225 33.0755 32.8426L32.6567 33.2788L32.8505 33.5181C32.957 33.6497 33.1228 33.8287 33.2188 33.9159L33.3933 34.0745L33.7968 33.6491C34.4744 32.9347 34.8744 31.9786 34.7666 31.3306C34.6543 30.6549 34.722 30.7016 34.0902 30.8644ZM31.5102 34.077C31.2809 34.2314 30.6853 34.5621 30.1866 34.812C29.6881 35.062 29.2722 35.2724 29.2626 35.2797C29.2387 35.2979 29.7076 36.2631 29.7404 36.2631C29.8952 36.2631 31.8926 35.1696 32.3949 34.8097L32.6689 34.6135L32.3671 34.2012C32.2011 33.9745 32.0342 33.7907 31.9963 33.7927C31.9583 33.7947 31.7396 33.9227 31.5102 34.077ZM28.0534 35.7838C27.8758 35.8633 27.2511 36.1079 26.6652 36.3273C26.0793 36.5467 25.5743 36.7486 25.5429 36.7759C25.5108 36.8038 25.5667 37.0493 25.6707 37.3369C25.8329 37.7853 25.8717 37.8435 25.9861 37.8097C26.2956 37.7181 28.7415 36.7455 28.8395 36.6751C28.9386 36.6039 28.9296 36.5573 28.7309 36.1131C28.6118 35.8467 28.4832 35.6311 28.4452 35.6339C28.4072 35.6368 28.2309 35.7042 28.0534 35.7838ZM24.1795 37.1897C23.9309 37.2755 23.2481 37.492 22.6622 37.6708C22.0763 37.8497 21.5892 38.0014 21.5798 38.0081C21.5703 38.0147 21.6406 38.2671 21.7358 38.5689C21.8417 38.9045 21.943 39.1178 21.9965 39.1178C22.1348 39.1178 25.0511 38.1644 25.0511 38.1193C25.0511 38.0243 24.6985 37.0248 24.6665 37.029C24.6472 37.0316 24.428 37.104 24.1795 37.1897ZM19.1757 38.6579C18.3412 38.8853 17.6486 39.0796 17.6365 39.0897C17.6244 39.0998 17.6821 39.3672 17.7646 39.6839C17.8579 40.0416 17.9468 40.2597 17.9994 40.2597C18.085 40.2597 21.0628 39.4365 21.1011 39.4022C21.1125 39.392 21.0598 39.174 20.9839 38.9177C20.9081 38.6614 20.8314 38.4017 20.8136 38.3407C20.7957 38.2797 20.7613 38.233 20.7371 38.2371C20.7128 38.2411 20.0102 38.4305 19.1757 38.6579ZM15.1128 39.6848L13.6002 40.0461L12.904 40.8666C12.521 41.3178 12.232 41.6953 12.2616 41.7055C12.3417 41.7329 17.0231 40.5562 17.0881 40.4923C17.1016 40.479 17.048 40.2071 16.9688 39.8881C16.8622 39.4586 16.799 39.3101 16.7251 39.3158C16.6703 39.32 15.9448 39.4861 15.1128 39.6848Z" />
              </svg>
            </div>
            
          </div>

          {/* COLUNA DIREITA */}
          <div className="col-right">
            
            {/* Direciona para Direiladder (Índice 2) */}
            <button 
              className="btn-aprendizado" 
              onClick={() => setActiveNav(2)}
            >
              MEU APRENDIZADO
            </button>
            
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
  );
}