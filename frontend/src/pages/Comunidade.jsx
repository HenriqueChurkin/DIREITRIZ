import React from 'react';

// ── Dados simulados do backend Python ────────────────────────
const rankingData = [
  { position: 1, name: "Bento Neves", points: 2840, streak: 26 },
  { position: 2, name: "Ana Martins", points: 2610, streak: 24 },
  { position: 3, name: "Caio Lima", points: 2380, streak: 21 },
  { position: 4, name: "Julia Santos", points: 2145, streak: 18 },
  { position: 5, name: "Pedro Alves", points: 1980, streak: 16 },
  { position: 6, name: "Marina Costa", points: 1760, streak: 14 },
];

// Função para pegar a primeira letra do nome e sobrenome (Ex: Bento Neves -> RN)
const getInitials = (name) => {
  const parts = name.split(' ');
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
};

// Cores dos avatares com base na posição
const getAvatarColor = (position) => {
  const colors = {
    1: 'linear-gradient(135deg, #0f5f38, #2fd47f)',
    2: 'linear-gradient(135deg, #125c9c, #5cc4ff)',
    3: 'linear-gradient(135deg, #6934a8, #c285ff)',
    4: 'linear-gradient(135deg, #b36b00, #ffd36b)',
    5: 'linear-gradient(135deg, #0b6b67, #64ded7)',
    6: 'linear-gradient(135deg, #4b5563, #b9c1cc)'
  };
  return colors[position] || '#ccc';
};

export default function Comunidade() {
  // Pega o maior XP para calcular a largura da barra de progresso proporcionalmente
  const maxPoints = Math.max(...rankingData.map(user => user.points));

  return (
    <>
      <style>{`
        /* ── ESTRUTURA GERAL DA PÁGINA (Igual ao Pomodoro) ── */
        .comunidade-page {
          padding: 40px 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
        }

        /* ── TÍTULO SUPERIOR ESQUERDO ── */
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

        /* Envoltório para centralizar o card no espaço restante da tela */
        .card-wrapper {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
        }

        /* ── ESTILO DO CARD PRINCIPAL ── */
        .ranking-card {
          background: #ffffff;
          width: 100%;
          max-width: 520px; /* Largura baseada no design */
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f0f0f0;
          padding: 32px;
          transform: none;
          position: relative;
          top: auto;
          left: auto;
        }

        /* Cabeçalho do Card */
        .ranking-header {
          margin-bottom: 24px;
        }
        .ranking-title {
          font-size: 22px;
          font-weight: 700;
          color: #10251a;
          margin: 0 0 4px 0;
        }
        .ranking-subtitle {
          font-size: 13px;
          color: #68756d;
          margin: 0;
        }

        /* Lista de Usuários */
        .ranking-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        /* Linha de cada usuário */
        .ranking-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border: 1px solid #e2e9e5;
          border-radius: 8px;
          background: #ffffff;
        }

        /* Destaque para o Usuário Atual (Verde) */
        .ranking-row.current-user {
          border-color: #2fd47f;
          background: #f0fff6;
        }

        /* Número da Posição (Círculo) */
        .rank-number {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #19a463;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #19a463;
          background: #fff;
          flex-shrink: 0;
        }

        /* Círculo do Avatar com as iniciais */
        .rank-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 14px;
          font-weight: 800;
          flex-shrink: 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        /* Área de Textos do Usuário */
        .rank-info {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        /* Nome e Pontuação */
        .rank-name-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2px;
        }
        .rank-name {
          font-size: 15px;
          font-weight: 700;
          color: #222;
          margin: 0;
        }
        .rank-points {
          font-size: 13px;
          font-weight: 700;
          color: #19a463;
        }

        /* Dias de Ofensiva */
        .rank-streak {
          font-size: 11px;
          color: #777;
          margin: 0 0 6px 0;
        }

        /* Barrinha de Progresso */
        .rank-progress-bg {
          width: 100%;
          height: 6px;
          background: #e3eee8;
          border-radius: 999px;
          overflow: hidden;
        }
        .rank-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #0e8f50, #2fd47f);
          border-radius: 999px;
        }
      `}</style>

      <div className="comunidade-page">
        {/* Título da página colocado fora do card, na lateral superior esquerda */}
        <h1 className="page-title">
          COMUN<span className="title-accent">!</span>DADE
        </h1>

        <div className="card-wrapper">
          <div className="ranking-card">
            
            <div className="ranking-header">
              <h2 className="ranking-title">Ranking da semana</h2>
              <p className="ranking-subtitle">Continue estudando para subir de posição.</p>
            </div>

            <div className="ranking-list">
              {rankingData.map((user) => {
                // Verifica se é o usuário atual para aplicar o estilo verde de destaque
                const isCurrentUser = user.name === "Bento Neves"; 
                
                // Calcula a porcentagem da barra baseada no maior XP do ranking
                const progressPercentage = (user.points / maxPoints) * 100;

                return (
                  <div key={user.position} className={`ranking-row ${isCurrentUser ? 'current-user' : ''}`}>
                    
                    <div className="rank-number">{user.position}</div>
                    
                    <div className="rank-avatar" style={{ background: getAvatarColor(user.position) }}>
                      {getInitials(user.name)}
                    </div>
                    
                    <div className="rank-info">
                      <div className="rank-name-row">
                        <span className="rank-name">{user.name}</span>
                        {/* toLocaleString formata o número com ponto: 2840 -> 2.840 */}
                        <span className="rank-points">{user.points.toLocaleString('pt-BR')} XP</span>
                      </div>
                      
                      <p className="rank-streak">{user.streak} dias de ofensiva</p>
                      
                      <div className="rank-progress-bg">
                        <div 
                          className="rank-progress-fill" 
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}