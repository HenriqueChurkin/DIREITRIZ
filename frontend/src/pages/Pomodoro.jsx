import { useState, useEffect } from 'react';

export default function PomodoroPage() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutos
  const [isActive, setIsActive] = useState(false);
  const [nivel, setNivel] = useState('experiente');

  // Lógica do Timer
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      setIsActive(false);
      alert("Tempo esgotado! Hora da pausa.");
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Níveis disponíveis com as exatas labels da imagem
  const niveis = [
    { id: 'iniciante', label: 'Iniciante' },
    { id: 'intermediario', label: 'Intermediário' },
    { id: 'experiente', label: 'Experiente' },
    { id: 'personalizado', label: 'Personalizado' }
  ];

  return (
    <div className="pomodoro-page">
      <style>{`
        .pomodoro-page {
          padding: 40px 60px;
          height: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
        }

        /* Título Exato: POMODORO com ! vermelho */
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

        /* Container Principal Azul Escuro */
        .main-card {
          background-color: #081724; /* Azul escuro da imagem */
          flex: 1;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 100px;
          min-height: 500px;
        }

        /* ─── LADO ESQUERDO: CONTROLES ─── */
        .controls-section {
          width: 380px;
        }

        .input-group {
          margin-bottom: 30px;
        }

        .input-group label {
          display: block;
          color: #ffffff;
          font-size: 14px;
          font-weight: 400;
          margin-bottom: 10px;
        }

        .custom-select {
          width: 100%;
          padding: 12px 16px;
          border-radius: 6px;
          border: none;
          background-color: #e2e4e6;
          color: #202020;
          font-size: 15px;
          font-family: inherit;
          appearance: none;
          outline: none;
          cursor: pointer;
          /* Ícone de chevron para o select */
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 20px;
        }

        /* Estilização dos Radio Buttons (Nível) */
        .nivel-row {
          display: flex;
          gap: 25px;
          margin-top: 20px;
        }

        .nivel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
        }

        .radio-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #e2e4e6;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .radio-dot.active {
          background-color: #ffffff;
        }

        .radio-dot.active::after {
          content: "";
          width: 8px;
          height: 8px;
          background-color: #0070b8; /* Centro azul */
          border-radius: 50%;
        }

        .nivel-item span {
          color: #b0b8c0;
          font-size: 10px;
          font-weight: 500;
        }

        /* ─── LADO DIREITO: TIMER ─── */
        .timer-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .timer-visual {
          position: relative;
          width: 360px;
          height: 360px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .timer-data {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-top: 20px; /* Ajuste visual para o centro do arco */
        }

        .timer-data h2 {
          font-size: 64px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #ffffff;
          margin: 0;
          line-height: 1;
        }

        .pausa-label {
          font-size: 12px;
          font-weight: 600;
          color: #ffffff;
          letter-spacing: 1px;
          margin: 15px 0 2px 0;
        }

        .pausa-time {
          font-size: 16px;
          font-weight: 700;
          color: #d90000;
          margin: 0;
        }

        /* Botão Iniciar */
        .btn-iniciar {
          background-color: #b80000;
          color: #ffffff;
          border: 1px solid rgba(255, 255, 255, 0.4); /* Borda sutil como na imagem */
          padding: 12px 50px;
          font-size: 14px;
          font-weight: 600;
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 1px;
          margin-top: -15px; /* Puxa o botão pra cima, entrando na falha do arco */
          z-index: 10;
          transition: background 0.2s;
        }

        .btn-iniciar:hover {
          background-color: #d90000;
        }
      `}</style>

      <h1 className="page-title">
        POMODORO<span className="title-accent">!</span>
      </h1>

      <div className="main-card">
        {/* Controles à Esquerda */}
        <div className="controls-section">
          <div className="input-group">
            <label>Assunto:</label>
            <select className="custom-select">
              <option>Legislação Federal</option>
              <option>Direito Constitucional</option>
              <option>Direito Civil</option>
            </select>
          </div>

          <div className="input-group">
            <label>Tema:</label>
            <select className="custom-select">
              <option>Decretos</option>
              <option>Leis Ordinárias</option>
              <option>Emendas</option>
            </select>
          </div>

          <div className="input-group">
            <label>Nível:</label>
            <div className="nivel-row">
              {niveis.map((op) => (
                <div 
                  key={op.id} 
                  className="nivel-item" 
                  onClick={() => setNivel(op.id)}
                >
                  <div className={`radio-dot ${nivel === op.id ? 'active' : ''}`}></div>
                  <span>{op.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Relógio à Direita */}
        <div className="timer-section">
          <div className="timer-visual">
            <svg width="360" height="360" viewBox="0 0 320 320">
              {/* Cálculo do Arco:
                Raio(r) = 130
                Circunferência = 2 * PI * 130 = 816.8
                Queremos um arco de 270 graus (75% do círculo), deixando 25% de buraco em baixo.
                75% de 816.8 = 612.6
                25% de 816.8 = 204.2
                strokeDasharray = "612.6 204.2"
                transform="rotate(135 160 160)" gira o círculo para a falha ficar centralizada embaixo.
              */}
              <circle
                cx="160"
                cy="160"
                r="130"
                fill="none"
                stroke="#ffffff"
                strokeWidth="32"
                strokeDasharray="612.6 204.2"
                strokeDashoffset="0"
                transform="rotate(135 160 160)"
                strokeLinecap="butt"
              />
            </svg>
            
            <div className="timer-data">
              <h2>{formatTime(timeLeft)}</h2>
              <p className="pausa-label">PAUSA</p>
              <p className="pausa-time">05:00</p>
            </div>
          </div>

          <button 
            className="btn-iniciar" 
            onClick={() => setIsActive(!isActive)}
          >
            {isActive ? 'PAUSAR' : 'INICIAR'}
          </button>
        </div>
      </div>
    </div>
  );
}