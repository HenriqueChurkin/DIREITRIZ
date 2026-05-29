import { useState } from 'react'
import logoDireitriz from '../../assets/logodireitriz.png'

// ── SVG Icons (inline, como no projeto Direitriz) ──────────
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)
const IconTimer = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="13" r="8" /><path d="M12 9v4l2 2" /><path d="M9 3h6" /><path d="M12 3v2" />
  </svg>
)
const IconRoute = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="6" cy="19" r="2" /><circle cx="18" cy="5" r="2" />
    <path d="M6 17V7a2 2 0 0 1 2-2h8" /><path d="M6 17c4 0 6-4 10-4" />
  </svg>
)
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
)
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
)

// ── Itens da sidebar ─────────────────────────────────────────
const sidebarItems = [
  { icon: <IconCheck />,  label: 'Direitodo'    },
  { icon: <IconTimer />,  label: 'Pomodoro'   },
  { icon: <IconRoute />,  label: 'Direicontent'},
  { icon: <IconBook />,   label: 'Simulados' },
  { icon: <IconUsers />,  label: 'Comunidade' },
]

export default function PageLayout({ pages = [] }) {
  const [activeNav,      setActiveNav]      = useState('home')
  const [showPremium,    setShowPremium]    = useState(false)
  const [showUserPopup,  setShowUserPopup]  = useState(false)
  const [showNotifPopup, setShowNotifPopup] = useState(false)

  const toggleUserPopup = () => {
    setShowUserPopup(prev => !prev)
    setShowNotifPopup(false)
  }
  const toggleNotifPopup = () => {
    setShowNotifPopup(prev => !prev)
    setShowUserPopup(false)
  }

  return (
    <>
      {/* ── ESTILOS CSS INJETADOS DIRETAMENTE NO COMPONENTE ── */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          min-height: 100vh;
          background: #ffffff;
          font-family: "Montserrat", Arial, sans-serif;
          color: #202020;
        }

        button,
        input {
          font: inherit;
        }

        .app-shell {
          position: relative;
          width: 100vw;
          min-width: 1224px;
          height: 100vh;
          min-height: 688px;
          margin: 0;
          overflow: hidden;
          background: #ffffff;
        }

        .topbar {
          position: absolute;
          inset: 0 0 auto 0;
          height: 93px;
          background: #001624;
          color: #ffffff;
          display: flex;
          align-items: center;
        }

        .logo-wrap {
          position: absolute;
          left: 23px;
          top: 20px;
          width: 78px;
          height: 63px;
          cursor: pointer; /* Adicionado */
          transition: transform 0.2s; /* Adicionado */
        }
        .logo-wrap:hover {
          transform: scale(1.05); /* Adicionado */
        }

        .eagle-logo {
          width: 100%;
          height: 100%;
          object-fit: contain;
          fill: #ffffff;
        }

        .streak {
          position: absolute;
          left: 153px;
          top: 30px;
          margin-left: 0;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .streak strong {
          color: #ff575c;
          font-size: 39px;
          line-height: 1;
          font-weight: 800;
        }

        .streak span {
          font-size: 17px;
          line-height: 1.15;
          font-weight: 500;
        }

        .premium {
          position: absolute;
          right: 402px;
          top: 27px;
          width: 177px;
          height: 41px;
          border: 2px solid #0070b8;
          border-radius: 4px;
          background: transparent;
          color: #ffffff;
          font-size: 12px;
          letter-spacing: 0;
          cursor: pointer;
        }

        .user-name {
          position: absolute;
          right: 228px;
          top: 43px;
          font-size: 15px;
          line-height: 1;
        }

        .avatar {
          position: absolute;
          right: 119px;
          top: 25px;
          width: 45px;
          height: 45px;
          border: 2px solid #d90000;
          border-radius: 50%;
          overflow: hidden;
          background: #f7f7f7;
          cursor: pointer;
        }

        .avatar-head {
          position: absolute;
          left: 16px;
          top: 7px;
          width: 12px;
          height: 13px;
          border-radius: 50%;
          background: #d8ad92;
        }

        .avatar-body {
          position: absolute;
          left: 10px;
          top: 22px;
          width: 24px;
          height: 31px;
          background: linear-gradient(90deg, #101010 0 36%, #ffffff 37% 58%, #101010 59%);
        }

        .top-bell {
          position: absolute;
          right: 40px;
          top: 35px;
          width: 25px;
          height: 25px;
          color: #ffffff;
          cursor: pointer;
          border: none;
          background: transparent;
        }

        .sidebar {
          position: absolute;
          left: 0;
          top: 93px;
          width: 114px;
          bottom: 0;
          background: #080808;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 72px;
          gap: 42px;
        }

        .sidebar button {
          width: 50px;
          height: 50px;
          border: 0;
          padding: 0;
          background: transparent;
          color: #ffffff;
          cursor: pointer;
          transition: 0.2s;
        }
          
        .sidebar button.active {
          color: #0c5f38;
        }

        .workspace {
          position: absolute;
          left: 114px;
          top: 93px;
          right: 0;
          bottom: 0;
          background: #ffffff;
          overflow-y: auto;
        }

        /* Mantivemos as classes abaixo no escopo caso as páginas filhas herdem os estilos do card/ranking */
        .card {
          position: absolute;
          border: 1px solid #c8c8c8;
          border-radius: 5px;
          background: #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, .42);
        }

        .ranking-card h1 {
          display: inline-block;
          margin: 0 0 6px;
          padding-bottom: 2px;
          border-bottom: 1px solid #19a463;
          font-size: 14px;
          font-weight: 400;
        }

        .ranking-card {
          left: 50%;
          top: 50%;
          width: 520px;
          min-height: 480px;
          padding: 22px 24px;
          transform: translate(-50%, -50%);
          border-color: #d7e7dd;
          box-shadow: 0 8px 22px rgba(0, 0, 0, .16);
        }

        .ranking-card h2 {
          margin: 8px 0 4px;
          font-size: 24px;
          font-weight: 700;
          color: #10251a;
        }

        .ranking-header { margin-bottom: 18px; }
        .ranking-header p { margin: 0; color: #68756d; font-size: 12px; }
        .ranking-list { display: grid; gap: 10px; }
        
        .ranking-row {
          display: flex;
          align-items: center;
          min-height: 62px;
          border: 1px solid #e2e9e5;
          border-radius: 7px;
          gap: 12px;
          padding: 9px 12px;
          background: #fbfdfb;
        }

        .ranking-row.current {
          border-color: #19a463;
          background: #f0fff6;
          color: #0c5f38;
        }

        .rank {
          width: 30px;
          height: 30px;
          border: 2px solid #19a463;
          border-radius: 50%;
          display: grid;
          place-items: center;
          font-size: 12px;
          font-weight: 700;
          color: #0c5f38;
          background: #ffffff;
        }

        .rank-avatar {
          width: 42px;
          height: 42px;
          border: 2px solid #ffffff;
          border-radius: 50%;
          box-shadow: 0 1px 5px rgba(0, 0, 0, .18);
          color: #ffffff;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
          font-size: 12px;
          font-weight: 800;
        }

        .avatar-1 { background: linear-gradient(135deg, #0f5f38, #2fd47f); }
        .avatar-2 { background: linear-gradient(135deg, #125c9c, #5cc4ff); }
        .avatar-3 { background: linear-gradient(135deg, #6934a8, #c285ff); }
        .avatar-4 { background: linear-gradient(135deg, #b36b00, #ffd36b); }
        .avatar-5 { background: linear-gradient(135deg, #0b6b67, #64ded7); }
        .avatar-6 { background: linear-gradient(135deg, #4b5563, #b9c1cc); }

        .rank-name { flex: 1; min-width: 0; }
        .rank-name strong { display: block; font-size: 14px; }
        .rank-name small { display: block; margin-top: 2px; color: #777777; font-size: 11px; }
        .rank-progress { width: 100%; height: 6px; display: block; margin-top: 7px; overflow: hidden; border-radius: 999px; background: #e3eee8; }
        .rank-progress span { height: 100%; display: block; border-radius: inherit; background: linear-gradient(90deg, #0e8f50, #2fd47f); }
        .ranking-row b { color: #15945a; font-size: 13px; white-space: nowrap; }
      `}</style>

      <div className="app-shell">

        {/* ════════════════════════════════
            TOPBAR (Fixa no topo)
            ════════════════════════════════ */}
        <header className="topbar">
          
          <div className="logo-wrap" onClick={() => setActiveNav('home')}>
            <img src={logoDireitriz} alt="Direitriz" className="eagle-logo" />
          </div>

          {/* Mantido: Ofensiva fixa na barra do topo */}
          <div className="streak">
            <strong>26</strong>
            <span>Dias de<br />ofensiva</span>
          </div>

          <button className="premium" onClick={() => setShowPremium(true)}>
            PREMIUM
          </button>

          <div className="user-name">Bento Neves</div>

          <div className="avatar" onClick={toggleUserPopup}>
            <div className="avatar-head"></div>
            <div className="avatar-body"></div>
          </div>

          {/* Popup de Usuário */}
          {showUserPopup && (
            <div style={{ position: 'absolute', right: '119px', top: '80px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', color: '#202020', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px' }}>Meu Perfil</h4>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Nome:</strong> Bento Neves</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Plano:</strong> Gratuito</p>
              <p style={{ margin: '4px 0', fontSize: '14px' }}><strong>Ofensiva máx.:</strong> 26 dias</p>
              <button style={{ width: '100%', marginTop: '12px', padding: '8px', background: '#f8f8f8', border: '1px solid #ccc', color: '#d90000', cursor: 'pointer' }}>Sair da Conta</button>
            </div>
          )}

          <button className="top-bell" onClick={toggleNotifPopup}>
            <IconBell />
          </button>

          {/* Popup de Notificações */}
          {showNotifPopup && (
            <div style={{ position: 'absolute', right: '40px', top: '70px', background: '#fff', border: '1px solid #ccc', borderRadius: '8px', padding: '20px', color: '#202020', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <h4 style={{ margin: '0 0 10px' }}>Notificações</h4>
              <p style={{ margin: '4px 0', fontSize: '14px', color: '#666' }}>Você não tem notificações no momento.</p>
            </div>
          )}
        </header>

        {/* ════════════════════════════════
            SIDEBAR
            ════════════════════════════════ */}
        <aside className="sidebar">
          {sidebarItems.map((item, i) => (
            <button
              key={i}
              className={activeNav === i ? 'active' : ''}
              onClick={() => setActiveNav(i)}
              title={item.label}
              aria-label={item.label}
            >
              {item.icon}
            </button>
          ))}
        </aside>

        {/* ════════════════════════════════
            ÁREA DE CONTEÚDO (Totalmente Limpa)
            ════════════════════════════════ */}
        <main className="workspace">
          {pages[activeNav] || null}
        </main>

        {/* ════════════════════════════════
            MODAL PREMIUM
            ════════════════════════════════ */}
        {showPremium && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setShowPremium(false)}>
            <div style={{ background: '#fff', padding: '32px', borderRadius: '12px', width: '400px', textAlign: 'center', position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button style={{ position: 'absolute', top: '12px', right: '16px', fontSize: '24px', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowPremium(false)}>×</button>
              <h2 style={{ marginTop: 0 }}>Desbloqueie o Premium</h2>
              <p style={{ color: '#666' }}>Tenha acesso a simulados ilimitados, trilhas personalizadas e recursos exclusivos.</p>
              
              <div style={{ width: '100%', height: '200px', background: 'linear-gradient(45deg, #ffd700, #ff8c00)', borderRadius: '8px', margin: '20px 0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                IMAGEM DE COMPRA AQUI
              </div>

              <button style={{ width: '100%', padding: '14px', background: '#0056b3', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>COMPRAR AGORA</button>
            </div>
          </div>
        )}

      </div>
    </>
  )
}