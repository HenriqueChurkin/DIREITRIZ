import React from 'react';

export default function DireitodoPage() {
  return (
    <>
      <style>{`
        /* ── ESTRUTURA GERAL DA PÁGINA ── */
        .direitodo-page {
          padding: 40px 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
          background-color: #f8f9fa;
        }

        .content-wrapper {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .page-title {
          font-size: 24px;
          font-weight: 700;
          letter-spacing: 4px;
          color: #000000;
          margin: 0 0 25px 0;
          text-transform: uppercase;
        }

        .title-accent {
          color: #d90000;
        }

        /* ── CABEÇALHO DE FERRAMENTAS ── */
        .header-row {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 25px;
        }

        .search-input-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
        }

        .search-input {
          width: 100%;
          height: 42px;
          border: 1px solid #8c8c8c;
          border-radius: 6px;
          padding: 0 16px;
          font-family: inherit;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .search-input:focus {
          border-color: #081724;
        }

        .btn-add {
          background-color: #081724;
          border: none;
          border-radius: 6px;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .btn-add:hover {
          background-color: #152c40;
        }

        /* Caixa do Contador */
        .counter-container {
          width: 42px;
          height: 42px;
          border-radius: 6px;
          border: 1px solid #8c8c8c;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          cursor: pointer;
        }

        .counter-top {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
          color: #000000;
        }

        .counter-bottom {
          height: 12px;
          background-color: #081724;
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom-left-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        /* ── QUADRO PRINCIPAL ── */
        .main-board {
          background: #ffffff;
          flex: 1;
          border-radius: 6px;
          border: 1px solid #d4d4d4;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          padding: 30px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-start;
          gap: 24px;
        }

        /* ── CARDS (Tamanhos iguais e espelhados) ── */
        .subject-card, .premium-card {
          flex: 1; /* Faz com que ambos dividam o espaço igualmente */
          max-width: 500px; /* Limite máximo para não esticarem demais */
          height: 70px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 20px;
        }

        /* Card Filosofia do Direito */
        .subject-card {
          border: 1px solid #081724;
          justify-content: space-between;
          background: #ffffff;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .subject-card:hover {
          background-color: #f8f9fa;
        }

        .subject-left {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .subject-title {
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          margin: 0;
        }

        /* Card Aviso Premium */
        .premium-card {
          background-color: #0d1424;
          gap: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        }

        .premium-text {
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          line-height: 1.4;
        }
      `}</style>

      <div className="direitodo-page">

        <h1 className="page-title">
          DIRE<span className="title-accent">!</span>TODO
        </h1>

        <div className="content-wrapper">
          
          <div className="header-row">
            <div className="search-input-wrapper">
              <input type="text" className="search-input" placeholder="Pesquisar..." />
            </div>

            <button className="btn-add">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>

            <div className="counter-container">
              <div className="counter-top">2</div>
              <div className="counter-bottom">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1L5 5L9 1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="main-board">
            <div className="subject-card">
              <div className="subject-left">
                <svg width="28" height="20" viewBox="0 0 28 20" fill="none">
                  <circle cx="2" cy="4" r="1.5" fill="#4a4a4a"/>
                  <circle cx="2" cy="10" r="1.5" fill="#4a4a4a"/>
                  <circle cx="2" cy="16" r="1.5" fill="#4a4a4a"/>
                  <circle cx="8" cy="4" r="1.5" fill="#4a4a4a"/>
                  <circle cx="8" cy="10" r="1.5" fill="#4a4a4a"/>
                  <circle cx="8" cy="16" r="1.5" fill="#4a4a4a"/>
                  <rect x="15" y="5" width="10" height="10" rx="1" stroke="#8c8c8c" strokeWidth="1.5"/>
                </svg>
                <p className="subject-title">Filosofia do Direito</p>
              </div>
              <svg width="10" height="16" viewBox="0 0 8 14" fill="none" stroke="#081724" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 1L7 7L1 13" />
              </svg>
            </div>

            <div className="premium-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" fill="#d90000"/>
                <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#d90000" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="15" r="1.5" fill="#ffffff"/>
                <path d="M12 16.5V18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <p className="premium-text">
                Para desbloquear até 15 desenvolvimentos é necessário ter o plano premium
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}