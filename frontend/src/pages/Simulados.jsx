import React from 'react';

// ── Dados simulados (Mock) ────────────────────────
const simuladosData = [
  { id: 1, type: "Simulado Prova", date: "13/03", subject: "Ciência Politica" },
  { id: 2, type: "Simulado Prova", date: "04/05", subject: "Ciência Politica" },
  { id: 3, type: "QUIZ AULA", date: "04/05", subject: "Ciência Politica" },
  { id: 4, type: "QUIZ AULA", date: "20/05", subject: "Ciência Politica" },
];

export default function SimuladosPage() {
  return (
    <>
      <style>{`
        .simulados-page {
          padding: 40px 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
          background-color: #f8f9fa; 
        }

        /* ── NOVO: Contêiner para limitar a largura e centralizar ── */
        .content-wrapper {
          max-width: 1200px; /* Define o tamanho máximo da área de conteúdo (diminui o geral) */
          width: 100%;
          margin: 0 auto; /* Centraliza na tela se a tela for maior que 1200px */
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        /* ── CABEÇALHO ── */
        .header-section {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .title-group {
          display: flex;
          align-items: center;
          gap: 30px;
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

        /* Botões do Cabeçalho */
        .btn-header {
          background: #ffffff;
          font-family: inherit;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 40px;
          transition: all 0.2s;
        }

        .btn-agendar {
          border: 2px solid #081724;
          color: #081724;
          padding: 0 20px 0 15px;
          gap: 10px;
          width: 160px;
        }

        .btn-agendar:hover {
          background: #f0f2f5;
        }

        .btn-aprendizado {
          border: 2px solid #0070b8;
          color: #333333;
          padding: 0 25px;
          font-weight: 600;
        }
        
        .btn-aprendizado:hover {
          background: #f0f7fb;
        }

        /* ── MURAL / QUADRO DE SIMULADOS ── */
        .main-board {
          background: #ffffff;
          flex: 1;
          border-radius: 6px;
          border: 1px solid #d4d4d4;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          padding: 30px;
          
          /* MODIFICADO: Uso de Grid para forçar exatos 4 por linha */
          display: grid;
          grid-template-columns: repeat(4, 1fr); /* Cria 4 colunas de tamanhos iguais */
          gap: 20px;
          align-content: start; /* Alinha as linhas de cards no topo */
        }

        /* ── CARDS DOS TESTES ── */
        .simulado-card {
          background: #ffffff;
          border: 1px solid #dcdcdc;
          border-radius: 4px;
          width: 100%; /* Modificado para preencher a coluna do Grid (aumenta o card) */
          height: 145px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 2px 6px rgba(0,0,0,0.06);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .simulado-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        .card-header p {
          margin: 0;
        }

        .card-title {
          font-size: 14px;
          color: #222222;
          font-weight: 500;
          margin-bottom: 4px !important;
        }

        .card-subject {
          font-size: 13px;
          color: #666666;
        }

        .btn-iniciar {
          background: transparent;
          border: 2px solid #081724;
          color: #081724;
          border-radius: 4px;
          padding: 10px 0;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 2px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }

        .btn-iniciar:hover {
          background: #081724;
          color: #ffffff;
        }

        /* ── CARD PLACEHOLDER (CINZA) ── */
        .placeholder-card {
          background: #bfbfbf;
          border-radius: 4px;
          width: 100%; /* Modificado para preencher a coluna do Grid */
          height: 145px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 0 0 10px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: filter 0.2s;
        }

        .placeholder-card:hover {
          filter: brightness(0.95);
        }
      `}</style>

      <div className="simulados-page">

        <h1 className="page-title">
          S<span className="title-accent">!</span>MULADOS
        </h1>

        <div className="content-wrapper">
          
          {/* Cabeçalho */}
          <div className="header-section">
            <div className="title-group">
              
              <button className="btn-header btn-agendar">
                {/* Ícone de Calendário */}
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#081724" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                  <circle cx="8" cy="15" r="1" fill="#081724" stroke="none"></circle>
                  <circle cx="12" cy="15" r="1" fill="#081724" stroke="none"></circle>
                  <circle cx="16" cy="15" r="1" fill="#081724" stroke="none"></circle>
                </svg>
                AGENDAR
              </button>
            </div>

            <button className="btn-header btn-aprendizado">
              MEU APRENDIZADO
            </button>
          </div>

          {/* Quadro Central */}
          <div className="main-board">
            
            {/* Renderiza os simulados ativos */}
            {simuladosData.map((item) => (
              <div key={item.id} className="simulado-card">
                <div className="card-header">
                  <p className="card-title">{item.type} - {item.date}</p>
                  <p className="card-subject">{item.subject}</p>
                </div>
                <button className="btn-iniciar">
                  INICIAR
                </button>
              </div>
            ))}

            {/* Card Cinza (Placeholder para um novo simulado ou bloqueado) */}
            <div className="placeholder-card">
               {/* Ícone de Documentos Empilhados criado em SVG puro */}
               <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
                 {/* Documento de trás (sombra/deslocado) */}
                 <rect x="18" y="24" width="28" height="36" rx="4" fill="#8c8c8c" />
                 {/* Documento da frente */}
                 <rect x="12" y="18" width="28" height="36" rx="4" fill="#757575" />
                 {/* Linhas do documento */}
                 <rect x="18" y="26" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="33" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="40" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="47" width="10" height="3" rx="1.5" fill="#a0a0a0" />
               </svg>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}