const { useEffect, useState } = React;

function EagleLogo() {
  return <img className="eagle-logo" src="/assets/logo-direitriz.svg" alt="" />;
}

function Icon({ name }) {
  const icons = {
    check: "/assets/icon-check.svg",
    timer: "/assets/icon-timer.svg",
    route: "/assets/icon-route.svg",
    document: "/assets/icon-book.svg",
    community: "/assets/icon-users.svg",
    bell: "/assets/icon-bell.svg",
  };

  return <img src={icons[name]} alt="" />;
}

function Topbar() {
  return (
    <header className="topbar">
      <div className="logo-wrap"><EagleLogo /></div>
      <div className="streak">
        <strong>26</strong>
        <span>Dias de<br />ofensiva</span>
      </div>
      <button className="premium">PREMIUM</button>
      <div className="user-name">Rento Neves</div>
      <div className="avatar" aria-hidden="true">
        <div className="avatar-head" />
        <div className="avatar-body" />
      </div>
      <div className="top-bell"><Icon name="bell" /></div>
    </header>
  );
}

function Sidebar({ onNavigate, onCommunity }) {
  return (
    <aside className="sidebar" aria-label="Menu lateral">
      <button aria-label="Missões" onClick={() => onNavigate("missions")}><Icon name="check" /></button>
      <button aria-label="Cronômetro" onClick={() => onNavigate("timer")}><Icon name="timer" /></button>
      <button aria-label="Trilha" onClick={() => onNavigate("route")}><Icon name="route" /></button>
      <button aria-label="Aprendizado" onClick={() => onNavigate("learning")}><Icon name="document" /></button>
      <button aria-label="Comunidade" onClick={onCommunity}><Icon name="community" /></button>
    </aside>
  );
}

function Home({ showRanking, ranking }) {
  const topScore = Math.max(...ranking.map((student) => student.points), 1);

  return (
    <section className="workspace">
      {showRanking && (
        <article className="ranking-card card">
          <div className="ranking-header">
            <h1>Comunidade</h1>
            <h2>Ranking da semana</h2>
            <p>Continue estudando para subir de posição.</p>
          </div>
          <div className="ranking-list">
            {ranking.map((student) => (
              <div className={student.name === "Rento Neves" ? "ranking-row current" : "ranking-row"} key={student.name}>
                <span className="rank">{student.position}</span>
                <span className={`rank-avatar avatar-${student.position}`} aria-hidden="true">
                  {student.name.split(" ").map((part) => part[0]).join("").slice(0, 2)}
                </span>
                <div className="rank-name">
                  <strong>{student.name}</strong>
                  <small>{student.streak} dias de ofensiva</small>
                  <span className="rank-progress">
                    <span style={{ width: `${Math.max(12, (student.points / topScore) * 100)}%` }} />
                  </span>
                </div>
                <b>{student.points.toLocaleString("pt-BR")} XP</b>
              </div>
            ))}
          </div>
        </article>
      )}
    </section>
  );
}

function App() {
  const [page, setPage] = useState("home");
  const [community, setCommunity] = useState({ ranking: [] });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/community")
      .then((response) => response.json())
      .then(setCommunity)
      .catch(() => setCommunity({ ranking: [] }));
  }, []);

  return (
    <main className="app-shell">
      <Topbar />
      <Sidebar
        onNavigate={(nextPage) => setPage(nextPage)}
        onCommunity={() => setPage("community")}
      />
      <Home showRanking={page === "community"} ranking={community.ranking} />
    </main>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
