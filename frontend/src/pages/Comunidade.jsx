import React, { useState } from 'react';
import { MessageCircle, Send, Trash2, UserRound } from 'lucide-react';
import bentoPhoto from '../assets/profile/bento.jpg';
import anaPhoto from '../assets/profile/ana-real.jpg';
import caioPhoto from '../assets/profile/caio.jpg';
import juliaPhoto from '../assets/profile/julia-real.jpg';
import pedroPhoto from '../assets/profile/pedro.jpg';
import marinaPhoto from '../assets/profile/marina-real.jpg';
import helenaPhoto from '../assets/profile/helena-real.jpg';

const profilePhotos = {
  'Bento Neves': bentoPhoto,
  'Ana Martins': anaPhoto,
  'Caio Lima': caioPhoto,
  'Julia Santos': juliaPhoto,
  'Pedro Alves': pedroPhoto,
  'Marina Costa': marinaPhoto,
  'Prof. Helena Duarte': helenaPhoto,
};

const rankingData = [
  { position: 1, name: 'Bento Neves', points: 2840, streak: 26, photo: profilePhotos['Bento Neves'] },
  { position: 2, name: 'Ana Martins', points: 2610, streak: 24, photo: profilePhotos['Ana Martins'] },
  { position: 3, name: 'Caio Lima', points: 2380, streak: 21, photo: profilePhotos['Caio Lima'] },
  { position: 4, name: 'Julia Santos', points: 2145, streak: 18, photo: profilePhotos['Julia Santos'] },
  { position: 5, name: 'Pedro Alves', points: 1980, streak: 16, photo: profilePhotos['Pedro Alves'] },
  { position: 6, name: 'Marina Costa', points: 1760, streak: 14, photo: profilePhotos['Marina Costa'] },
];

const initialPosts = [
  {
    id: 1,
    author: 'Prof. Helena Duarte',
    role: 'Professora',
    time: 'Hoje, 09:18',
    tone: 'teacher',
    text: 'Pessoal, bom dia. Para revisar: Estado envolve territorio, governo e soberania. Nacao esta mais ligada a identidade, cultura e sentimento de pertencimento.',
  },
  {
    id: 2,
    author: 'Ana Martins',
    role: 'Aluno',
    time: 'Hoje, 09:21',
    tone: 'student',
    text: 'Professora, entao quando a questao fala em povo com cultura comum, mas sem governo proprio, a resposta tende a ser Nacao?',
  },
  {
    id: 3,
    author: 'Caio Lima',
    role: 'Aluno',
    time: 'Hoje, 09:24',
    tone: 'student',
    text: 'Tambem fiquei nessa duvida. Estado seria mais a estrutura juridica e politica, certo?',
  },
  {
    id: 4,
    author: 'Prof. Helena Duarte',
    role: 'Professora',
    time: 'Hoje, 09:29',
    tone: 'teacher',
    text: 'Isso, Ana e Caio. Nacao e identidade coletiva. Estado e a organizacao politica soberana, com territorio e governo. Esse contraste costuma cair bastante.',
  },
  {
    id: 5,
    author: 'Bento Neves',
    role: 'Aluno',
    time: 'Hoje, 09:32',
    tone: 'student',
    text: 'Entendi. Vou anotar: Estado e estrutura politica; Nacao e identidade coletiva. Valeu!',
  },
  {
    id: 6,
    author: 'Julia Santos',
    role: 'Aluna',
    time: 'Hoje, 09:36',
    tone: 'student',
    text: 'Alguem tem um macete para lembrar soberania? Sempre confundo com autonomia.',
  },
  {
    id: 7,
    author: 'Pedro Alves',
    role: 'Aluno',
    time: 'Hoje, 09:39',
    tone: 'student',
    text: 'Eu lembro assim: soberania e o poder maximo do Estado no territorio. Autonomia e mais limitada, tipo um ente com regras proprias dentro de uma estrutura maior.',
  },
  {
    id: 8,
    author: 'Marina Costa',
    role: 'Aluna',
    time: 'Hoje, 09:43',
    tone: 'student',
    text: 'Boa, Pedro. Isso ajuda tambem em Federalismo, porque os entes tem autonomia, mas nao soberania.',
  },
];

const getInitials = (name) => {
  const parts = name.split(' ');
  return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
};

const getAvatarColor = (position) => {
  const colors = {
    1: 'linear-gradient(135deg, #0f5f38, #2fd47f)',
    2: 'linear-gradient(135deg, #125c9c, #5cc4ff)',
    3: 'linear-gradient(135deg, #6934a8, #c285ff)',
    4: 'linear-gradient(135deg, #b36b00, #ffd36b)',
    5: 'linear-gradient(135deg, #0b6b67, #64ded7)',
    6: 'linear-gradient(135deg, #4b5563, #b9c1cc)',
  };
  return colors[position] || '#cccccc';
};

export default function Comunidade() {
  const [posts, setPosts] = useState(initialPosts);
  const [newPost, setNewPost] = useState('');
  const maxPoints = Math.max(...rankingData.map((user) => user.points));

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedPost = newPost.trim();
    if (!trimmedPost) return;

    setPosts([
      ...posts,
      {
        id: Date.now(),
        author: 'Bento Neves',
        role: 'Aluno',
        time: 'Agora',
        tone: 'student',
        text: trimmedPost,
      },
    ]);
    setNewPost('');
  };

  const handleDeletePost = (postId) => {
    setPosts(posts.filter((post) => post.id !== postId));
  };

  return (
    <>
      <style>{`
        .comunidade-page {
          box-sizing: border-box;
          padding: clamp(18px, 3vw, 40px) clamp(14px, 4vw, 60px);
          height: 100%;
          width: 100%;
          display: flex;
          flex-direction: column;
          font-family: "Montserrat", Arial, sans-serif;
          overflow-x: hidden;
        }

        .comunidade-page *,
        .comunidade-page *::before,
        .comunidade-page *::after {
          box-sizing: border-box;
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

        .community-grid {
          flex: 1;
          display: grid;
          grid-template-columns: minmax(0, 620px) minmax(320px, 520px);
          align-items: start;
          justify-content: center;
          gap: 28px;
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          min-width: 0;
        }

        .community-panel,
        .ranking-card {
          background: #ffffff;
          width: 100%;
          min-width: 0;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #f0f0f0;
          padding: 32px;
        }

        .community-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 20px;
        }

        .community-heading {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }

        .community-icon {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #071b25;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .community-title,
        .ranking-title {
          font-size: clamp(18px, 2.2vw, 22px);
          font-weight: 700;
          color: #10251a;
          margin: 0 0 4px 0;
          overflow-wrap: anywhere;
        }

        .community-subtitle,
        .ranking-subtitle {
          font-size: 13px;
          color: #68756d;
          margin: 0;
          line-height: 1.35;
        }

        .composer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          border: 1px solid #dce7e1;
          border-radius: 8px;
          background: #f8fbf9;
          margin-top: 22px;
        }

        .composer-user {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #10251a;
          font-size: 13px;
          font-weight: 700;
        }

        .composer-photo {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #ffffff;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.16);
        }

        .composer textarea {
          min-height: 92px;
          width: 100%;
          resize: vertical;
          border: 1px solid #d3ddd8;
          border-radius: 8px;
          padding: 12px 14px;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.45;
          color: #111827;
          outline: none;
          background: #ffffff;
        }

        .composer textarea:focus {
          border-color: #19a463;
          box-shadow: 0 0 0 3px rgba(25, 164, 99, 0.12);
        }

        .composer-actions {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .composer-hint {
          margin: 0;
          font-size: 12px;
          color: #68756d;
        }

        .composer-button {
          min-width: 124px;
          height: 40px;
          border: 0;
          border-radius: 8px;
          background: #d90000;
          color: #ffffff;
          font-family: inherit;
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .composer-button:disabled {
          background: #a7b1ac;
          cursor: default;
        }

        .conversation-list,
        .ranking-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .post-card {
          display: grid;
          grid-template-columns: 42px 1fr;
          gap: 12px;
          padding: 16px;
          border: 1px solid #e2e9e5;
          border-radius: 8px;
          background: #ffffff;
          min-width: 0;
        }

        .post-card.teacher {
          border-left: 4px solid #071b25;
        }

        .post-card.student {
          border-left: 4px solid #d90000;
        }

        .post-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #ffffff;
          font-size: 13px;
          font-weight: 800;
          background: linear-gradient(135deg, #071b25, #168e70);
          overflow: hidden;
          position: relative;
        }

        .post-card.student .post-avatar {
          background: linear-gradient(135deg, #9e0000, #ff5b5b);
        }

        .post-avatar img,
        .rank-avatar img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .post-meta {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 4px;
          min-width: 0;
        }

        .post-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .delete-post-button {
          width: 30px;
          height: 30px;
          border: 1px solid #f1c4c4;
          border-radius: 8px;
          background: #fff7f7;
          color: #d90000;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .delete-post-button:hover {
          background: #ffecec;
        }

        .post-author {
          color: #111827;
          font-size: 14px;
          font-weight: 800;
          overflow-wrap: anywhere;
        }

        .post-role {
          color: #19a463;
          font-size: 12px;
          font-weight: 700;
          margin-left: 6px;
          white-space: nowrap;
        }

        .post-time {
          color: #7b867f;
          font-size: 11px;
          white-space: nowrap;
        }

        .post-text {
          color: #2a332e;
          font-size: 14px;
          line-height: 1.45;
          margin: 0;
          overflow-wrap: anywhere;
        }

        .ranking-header {
          margin-bottom: 24px;
        }

        .ranking-row {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          border: 1px solid #e2e9e5;
          border-radius: 8px;
          background: #ffffff;
          min-width: 0;
        }

        .ranking-row.current-user {
          border-color: #2fd47f;
          background: #f0fff6;
        }

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
          background: #ffffff;
          flex-shrink: 0;
        }

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
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          position: relative;
        }

        .rank-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .rank-name-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 2px;
        }

        .rank-name {
          font-size: 15px;
          font-weight: 700;
          color: #222222;
          margin: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .rank-points {
          font-size: 13px;
          font-weight: 700;
          color: #19a463;
          white-space: nowrap;
        }

        .rank-streak {
          font-size: 11px;
          color: #777777;
          margin: 0 0 6px 0;
        }

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

        @media (max-width: 1100px) {
          .community-grid {
            grid-template-columns: 1fr;
            max-width: 760px;
          }
        }

        @media (max-width: 768px) {
          .comunidade-page {
            padding: 18px 14px 24px;
          }

          .page-title {
            text-align: center;
            font-size: 20px;
            margin-bottom: 20px;
          }

          .community-panel,
          .ranking-card {
            padding: 18px 14px;
            max-width: 100%;
            border-radius: 12px;
          }

          .community-header {
            align-items: flex-start;
          }

          .community-title,
          .ranking-title {
            font-size: 18px;
          }

          .ranking-title,
          .ranking-subtitle {
            text-align: center;
          }

          .ranking-subtitle {
            margin-bottom: 20px;
          }

          .composer-actions,
          .post-meta {
            align-items: flex-start;
            flex-direction: column;
          }

          .post-actions {
            width: 100%;
            justify-content: space-between;
          }

          .composer-button {
            width: 100%;
          }

          .post-card {
            grid-template-columns: 36px 1fr;
            padding: 12px;
          }

          .post-avatar,
          .rank-avatar {
            width: 36px;
            height: 36px;
            font-size: 12px;
          }

          .ranking-row {
            padding: 10px;
            gap: 10px;
          }

          .rank-number {
            width: 24px;
            height: 24px;
            font-size: 11px;
          }

          .rank-name {
            font-size: 14px;
          }

          .rank-points {
            font-size: 12px;
          }

          .rank-streak {
            font-size: 10px;
          }
        }

        @media (max-width: 480px) {
          .comunidade-page {
            padding: 14px 10px 20px;
          }

          .page-title {
            font-size: 18px;
            letter-spacing: 2px;
          }

          .community-grid {
            gap: 16px;
          }

          .community-panel,
          .ranking-card {
            padding: 14px 10px;
            border-radius: 8px;
          }

          .community-heading {
            gap: 10px;
          }

          .community-icon {
            width: 36px;
            height: 36px;
          }

          .community-title,
          .ranking-title {
            font-size: 17px;
          }

          .community-subtitle,
          .ranking-subtitle {
            font-size: 12px;
          }

          .post-card {
            grid-template-columns: 34px 1fr;
            gap: 10px;
            padding: 10px;
          }

          .post-avatar,
          .rank-avatar {
            width: 34px;
            height: 34px;
          }

          .post-author,
          .post-text {
            font-size: 13px;
          }

          .post-role,
          .post-time {
            font-size: 10px;
          }

          .composer {
            padding: 12px;
          }

          .composer textarea {
            min-height: 84px;
            font-size: 13px;
          }

          .ranking-row {
            align-items: flex-start;
            gap: 8px;
            padding: 10px 8px;
          }

          .rank-number {
            width: 22px;
            height: 22px;
            font-size: 10px;
            margin-top: 5px;
          }

          .rank-name-row {
            align-items: flex-start;
            flex-direction: column;
            gap: 0;
          }

          .rank-name {
            max-width: 100%;
          }

          .rank-points {
            font-size: 11px;
          }
        }

        @media (max-width: 360px) {
          .post-card {
            grid-template-columns: 1fr;
          }

          .post-avatar {
            width: 38px;
            height: 38px;
          }

          .ranking-row {
            flex-wrap: wrap;
          }

          .rank-info {
            flex-basis: 100%;
            padding-left: 30px;
          }
        }
      `}</style>

      <div className="comunidade-page">
        <h1 className="page-title">
          COMUN<span className="title-accent">!</span>DADE
        </h1>

        <div className="community-grid">
          <section className="community-panel">
            <div className="community-header">
              <div className="community-heading">
                <div className="community-icon" aria-hidden="true">
                  <MessageCircle size={22} />
                </div>
                <div>
                  <h2 className="community-title">Mural da comunidade</h2>
                  <p className="community-subtitle">Tire duvidas e acompanhe a conversa da turma.</p>
                </div>
              </div>
            </div>

            <div className="conversation-list">
              {posts.map((post) => (
                <article key={post.id} className={`post-card ${post.tone}`}>
                  <div className="post-avatar">
                    <span>{getInitials(post.author)}</span>
                    <img
                      src={profilePhotos[post.author]}
                      alt={`Foto de ${post.author}`}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>

                  <div>
                    <div className="post-meta">
                      <div>
                        <span className="post-author">{post.author}</span>
                        <span className="post-role">{post.role}</span>
                      </div>
                      <div className="post-actions">
                        <span className="post-time">{post.time}</span>
                        {post.author === 'Bento Neves' && (
                          <button
                            className="delete-post-button"
                            type="button"
                            aria-label="Apagar mensagem"
                            title="Apagar mensagem"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 size={15} />
                          </button>
                        )}
                      </div>
                    </div>

                    <p className="post-text">{post.text}</p>
                  </div>
                </article>
              ))}
            </div>

            <form className="composer" onSubmit={handleSubmit}>
              <div className="composer-user">
                <img
                  className="composer-photo"
                  src={profilePhotos['Bento Neves']}
                  alt="Foto de Bento Neves"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <UserRound size={18} />
                <span>Bento Neves</span>
              </div>

              <textarea
                value={newPost}
                onChange={(event) => setNewPost(event.target.value)}
                placeholder="Escreva uma pergunta, resposta ou dica para a comunidade..."
                maxLength={280}
              />

              <div className="composer-actions">
                <p className="composer-hint">{newPost.length}/280 caracteres</p>
                <button className="composer-button" type="submit" disabled={!newPost.trim()}>
                  <Send size={16} />
                  Publicar
                </button>
              </div>
            </form>
          </section>

          <aside className="ranking-card">
            <div className="ranking-header">
              <h2 className="ranking-title">Ranking da semana</h2>
              <p className="ranking-subtitle">Continue estudando para subir de posicao.</p>
            </div>

            <div className="ranking-list">
              {rankingData.map((user) => {
                const isCurrentUser = user.name === 'Bento Neves';
                const progressPercentage = (user.points / maxPoints) * 100;

                return (
                  <div key={user.position} className={`ranking-row ${isCurrentUser ? 'current-user' : ''}`}>
                    <div className="rank-number">{user.position}</div>

                    <div className="rank-avatar" style={{ background: getAvatarColor(user.position) }}>
                      <span>{getInitials(user.name)}</span>
                      <img
                        src={user.photo}
                        alt={`Foto de ${user.name}`}
                        onError={(event) => {
                          event.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>

                    <div className="rank-info">
                      <div className="rank-name-row">
                        <span className="rank-name">{user.name}</span>
                        <span className="rank-points">{user.points.toLocaleString('pt-BR')} XP</span>
                      </div>

                      <p className="rank-streak">{user.streak} dias de ofensiva</p>

                      <div className="rank-progress-bg">
                        <div className="rank-progress-fill" style={{ width: `${progressPercentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
