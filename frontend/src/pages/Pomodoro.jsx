import { useEffect, useMemo, useState } from 'react';

const LEVELS = {
  iniciante: {
    label: 'Iniciante',
    focus: 25,
    shortBreak: 5,
    longBreak: 15,
  },
  intermediario: {
    label: 'Intermediário',
    focus: 45,
    shortBreak: 5,
    longBreak: 15,
  },
  experiente: {
    label: 'Experiente',
    focus: 50,
    shortBreak: 10,
    longBreak: 20,
  },
  personalizado: {
    label: 'Personalizado',
    focus: 30,
    shortBreak: 5,
    longBreak: 15,
  },
};

const SUBJECTS = {
  'Legislação Federal': ['Decretos', 'Leis Ordinárias', 'Emendas'],
  'Direito Constitucional': ['Direitos Fundamentais', 'Organização do Estado', 'Controle de Constitucionalidade'],
  'Direito Civil': ['Contratos', 'Responsabilidade Civil', 'Direitos Reais'],
};

const MODES = {
  focus: 'FOCO',
  shortBreak: 'PAUSA',
  longBreak: 'PAUSA LONGA',
};

function clampMinutes(value, fallback) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) return fallback;
  return Math.min(Math.max(Math.round(parsed), 1), 180);
}

function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

export default function PomodoroPage() {
  const [subject, setSubject] = useState('Legislação Federal');
  const [topic, setTopic] = useState('Decretos');
  const [level, setLevel] = useState('intermediario');
  const [customFocus, setCustomFocus] = useState(30);
  const [customBreak, setCustomBreak] = useState(5);
  const [mode, setMode] = useState('focus');
  const [timeLeft, setTimeLeft] = useState(LEVELS.intermediario.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [completedFocus, setCompletedFocus] = useState(0);

  const config = useMemo(() => {
    if (level !== 'personalizado') return LEVELS[level];

    return {
      ...LEVELS.personalizado,
      focus: clampMinutes(customFocus, LEVELS.personalizado.focus),
      shortBreak: clampMinutes(customBreak, LEVELS.personalizado.shortBreak),
      longBreak: Math.max(clampMinutes(customBreak, LEVELS.personalizado.shortBreak) * 3, 10),
    };
  }, [customBreak, customFocus, level]);

  const totalSeconds = config[mode] * 60;
  const progress = totalSeconds > 0 ? timeLeft / totalSeconds : 0;
  const nextBreakMinutes = completedFocus > 0 && completedFocus % 4 === 3 ? config.longBreak : config.shortBreak;
  const isBreak = mode !== 'focus';
  const subjects = Object.keys(SUBJECTS);
  const topics = SUBJECTS[subject];

  useEffect(() => {
    setTopic(SUBJECTS[subject][0]);
  }, [subject]);

  useEffect(() => {
    setIsActive(false);
    setMode('focus');
    setTimeLeft(config.focus * 60);
  }, [config.focus, config.shortBreak, config.longBreak]);

  useEffect(() => {
    if (!isActive) return undefined;

    const interval = setInterval(() => {
      setTimeLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    setIsActive(false);

    if (mode === 'focus') {
      const nextCompleted = completedFocus + 1;
      const nextMode = nextCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
      setCompletedFocus(nextCompleted);
      setMode(nextMode);
      setTimeLeft(config[nextMode] * 60);
      return;
    }

    setMode('focus');
    setTimeLeft(config.focus * 60);
  }, [completedFocus, config, mode, timeLeft]);

  const startPause = () => setIsActive((current) => !current);

  const resetTimer = () => {
    setIsActive(false);
    setMode('focus');
    setTimeLeft(config.focus * 60);
  };

  const skipStep = () => {
    setIsActive(false);

    if (mode === 'focus') {
      const nextCompleted = completedFocus + 1;
      const nextMode = nextCompleted % 4 === 0 ? 'longBreak' : 'shortBreak';
      setCompletedFocus(nextCompleted);
      setMode(nextMode);
      setTimeLeft(config[nextMode] * 60);
      return;
    }

    setMode('focus');
    setTimeLeft(config.focus * 60);
  };

  const clearCycle = () => {
    setCompletedFocus(0);
    resetTimer();
  };

  return (
    <div className="pomodoro-page">
      <style>{`
        .pomodoro-page {
          padding: 40px 60px;
          min-height: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
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

        .main-card {
          background-color: #081724;
          flex: 1;
          border-radius: 4px;
          display: grid;
          grid-template-columns: minmax(340px, 480px) minmax(430px, 1fr);
          align-items: center;
          gap: 80px;
          padding: 48px 7vw;
          min-height: 560px;
        }

        .controls-section {
          width: 100%;
        }

        .input-group {
          margin-bottom: 28px;
        }

        .input-group label,
        .custom-label {
          display: block;
          color: #ffffff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .custom-select,
        .custom-number {
          width: 100%;
          min-height: 45px;
          padding: 12px 16px;
          border-radius: 6px;
          border: none;
          background-color: #e2e4e6;
          color: #202020;
          font-size: 15px;
          font-family: inherit;
          outline: none;
        }

        .custom-select {
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 20px;
        }

        .nivel-row {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 24px;
          margin-top: 18px;
        }

        .nivel-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          border: 0;
          background: transparent;
          padding: 0;
        }

        .radio-dot {
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #e2e4e6;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .radio-dot.active {
          background-color: #ffffff;
        }

        .radio-dot.active::after {
          content: "";
          width: 8px;
          height: 8px;
          background-color: #0070b8;
          border-radius: 50%;
        }

        .nivel-item span {
          color: #d8e0e8;
          font-size: 10px;
          font-weight: 500;
        }

        .custom-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          margin-top: 22px;
        }

        .session-summary {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 8px;
        }

        .summary-item {
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 6px;
          padding: 10px;
          color: #ffffff;
          background: rgba(255, 255, 255, 0.04);
        }

        .summary-item strong {
          display: block;
          font-size: 18px;
          line-height: 1;
        }

        .summary-item span {
          display: block;
          margin-top: 5px;
          color: #b9c8d4;
          font-size: 10px;
        }

        .timer-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-self: center;
          width: min(100%, 470px);
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
          margin-top: 20px;
        }

        .timer-data h2 {
          font-size: 64px;
          font-weight: 700;
          letter-spacing: 6px;
          color: #ffffff;
          margin: 0;
          line-height: 1;
        }

        .mode-label {
          font-size: 13px;
          font-weight: 700;
          color: ${isBreak ? '#28d07d' : '#ffffff'};
          letter-spacing: 1px;
          margin: 15px 0 2px 0;
        }

        .break-time {
          font-size: 16px;
          font-weight: 700;
          color: #ff2d2d;
          margin: 0;
        }

        .timer-actions {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: -15px;
          z-index: 10;
        }

        .btn-primary,
        .btn-secondary {
          min-width: 130px;
          padding: 12px 24px;
          color: #ffffff;
          font-size: 14px;
          font-weight: 700;
          border-radius: 6px;
          cursor: pointer;
          letter-spacing: 1px;
        }

        .btn-primary {
          background-color: ${isActive ? '#0056b3' : '#b80000'};
          border: 1px solid rgba(255, 255, 255, 0.4);
        }

        .btn-primary:hover {
          background-color: ${isActive ? '#0070b8' : '#d90000'};
        }

        .btn-secondary {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.35);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
        }

        .cycle-dots {
          display: flex;
          gap: 8px;
          margin-top: 22px;
        }

        .cycle-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.7);
          background: transparent;
        }

        .cycle-dot.done {
          background: #28d07d;
          border-color: #28d07d;
        }

        .cycle-text {
          margin: 10px 0 0;
          color: #b9c8d4;
          font-size: 12px;
          text-align: center;
        }

        @media (max-width: 1200px) {
          .pomodoro-page {
            padding: 32px;
          }

          .main-card {
            grid-template-columns: 1fr;
            gap: 36px;
            padding: 36px;
          }
        }
          @media (max-width: 768px) {
          .pomodoro-page {
            padding: 20px;
          }
          .main-card {
            padding: 24px;
            gap: 40px;
          }
          .timer-visual {
            width: 260px; /* Reduz o tamanho do relógio no celular */
            height: 260px;
          }
          .timer-data h2 {
            font-size: 48px; /* Diminui a fonte do tempo para caber no círculo menor */
          }
          .session-summary {
            grid-template-columns: 1fr; /* Coloca os itens do resumo um embaixo do outro, se preferir, ou mantenha 3 colunas reduzindo o texto */
          }
        }
      `}</style>

      <h1 className="page-title">
        POMODORO<span className="title-accent">!</span>
      </h1>

      <div className="main-card">
        <div className="controls-section">
          <div className="input-group">
            <label htmlFor="subject">Assunto:</label>
            <select id="subject" className="custom-select" value={subject} onChange={(event) => setSubject(event.target.value)}>
              {subjects.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label htmlFor="topic">Tema:</label>
            <select id="topic" className="custom-select" value={topic} onChange={(event) => setTopic(event.target.value)}>
              {topics.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <span className="custom-label">Nível:</span>
            <div className="nivel-row">
              {Object.entries(LEVELS).map(([id, option]) => (
                <button key={id} type="button" className="nivel-item" onClick={() => setLevel(id)}>
                  <div className={`radio-dot ${level === id ? 'active' : ''}`} />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>

            {level === 'personalizado' && (
              <div className="custom-grid">
                <label>
                  <span className="custom-label">Foco</span>
                  <input
                    className="custom-number"
                    type="number"
                    min="1"
                    max="180"
                    value={customFocus}
                    onChange={(event) => setCustomFocus(event.target.value)}
                  />
                </label>
                <label>
                  <span className="custom-label">Pausa</span>
                  <input
                    className="custom-number"
                    type="number"
                    min="1"
                    max="60"
                    value={customBreak}
                    onChange={(event) => setCustomBreak(event.target.value)}
                  />
                </label>
              </div>
            )}
          </div>

          <div className="session-summary">
            <div className="summary-item">
              <strong>{config.focus}m</strong>
              <span>Foco</span>
            </div>
            <div className="summary-item">
              <strong>{config.shortBreak}m</strong>
              <span>Pausa</span>
            </div>
            <div className="summary-item">
              <strong>{completedFocus}</strong>
              <span>Ciclos</span>
            </div>
          </div>
        </div>

        <div className="timer-section">
          <div className="timer-visual">
            <svg viewBox="0 0 320 320" aria-hidden="true" style={{ width: '100%', height: '100%' }}>
              <circle
                cx="160"
                cy="160"
                r="130"
                fill="none"
                stroke="rgba(255, 255, 255, 0.16)"
                strokeWidth="32"
                strokeDasharray="612.6 204.2"
                transform="rotate(135 160 160)"
              />
              <circle
                cx="160"
                cy="160"
                r="130"
                fill="none"
                stroke={isBreak ? '#28d07d' : '#ffffff'}
                strokeWidth="32"
                strokeDasharray={`${612.6 * progress} ${816.8 - 612.6 * progress}`}
                strokeDashoffset="0"
                transform="rotate(135 160 160)"
                strokeLinecap="butt"
              />
            </svg>

            <div className="timer-data">
              <h2>{formatTime(timeLeft)}</h2>
              <p className="mode-label">{MODES[mode]}</p>
              <p className="break-time">{mode === 'focus' ? `${nextBreakMinutes.toString().padStart(2, '0')}:00` : 'Volte ao foco'}</p>
            </div>
          </div>

          <div className="timer-actions">
            <button className="btn-primary" type="button" onClick={startPause}>
              {isActive ? 'PAUSAR' : 'INICIAR'}
            </button>
            <button className="btn-secondary" type="button" onClick={resetTimer}>
              RESETAR
            </button>
            <button className="btn-secondary" type="button" onClick={skipStep}>
              PULAR
            </button>
          </div>

          <div className="cycle-dots" aria-label="Ciclos do Pomodoro">
            {[0, 1, 2, 3].map((item) => (
              <span key={item} className={`cycle-dot ${completedFocus % 4 > item ? 'done' : ''}`} />
            ))}
          </div>
          <p className="cycle-text">
            A cada 4 ciclos completos, a pausa longa entra automaticamente.
          </p>
          {completedFocus > 0 && (
            <button className="btn-secondary" type="button" onClick={clearCycle}>
              ZERAR CICLOS
            </button>
          )}
        </div>
      </div>
    </div>
  );
}