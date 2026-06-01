import React, { useState } from 'react';

// ── COMPONENTE DO CARD (MOLDE REUTILIZÁVEL) ──
function SubjectCard({ title, initialTasks }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [tasks, setTasks] = useState(initialTasks);
  const [menuOpenId, setMenuOpenId] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const getAllCheckedStatuses = () => {
    let statuses = [];
    tasks.forEach(t => {
      statuses.push(t.checked);
      if (t.subTasks) {
        t.subTasks.forEach(s => statuses.push(s.checked));
      }
    });
    return statuses;
  };

  const allStatuses = getAllCheckedStatuses();
  const isAllChecked = allStatuses.length > 0 && allStatuses.every(Boolean);

  const handleCheck = (targetId) => {
    setTasks(prev => prev.map(t => {
      if (t.id === targetId) return { ...t, checked: !t.checked };
      if (t.subTasks) {
        return { ...t, subTasks: t.subTasks.map(s => s.id === targetId ? { ...s, checked: !s.checked } : s) };
      }
      return t;
    }));
  };

  const handleMainCheck = (e) => {
    e.stopPropagation(); 
    const newValue = !isAllChecked;
    setTasks(prev => prev.map(t => ({
      ...t,
      checked: newValue,
      subTasks: t.subTasks ? t.subTasks.map(s => ({ ...s, checked: newValue })) : undefined
    })));
  };

  const handleCardClick = () => {
    if (!hasGenerated) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setHasGenerated(true);
        setIsExpanded(true);
      }, 1500);
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const toggleMenu = (id) => {
    setMenuOpenId(prev => prev === id ? null : id);
  };

  const handleDelete = (id) => {
    setTasks(prev => {
      let newTasks = prev.filter(t => t.id !== id);
      return newTasks.map(t => {
        if (t.subTasks) {
          return { ...t, subTasks: t.subTasks.filter(s => s.id !== id) };
        }
        return t;
      });
    });
    setMenuOpenId(null);
  };

  const handleStartEdit = (id, currentText) => {
    setEditingId(id);
    setEditValue(currentText);
    setMenuOpenId(null);
  };

  const handleSaveEdit = (id) => {
    if (editValue.trim() === '') return; 
    setTasks(prev => prev.map(t => {
      if (t.id === id) return { ...t, text: editValue };
      if (t.subTasks) {
        return { ...t, subTasks: t.subTasks.map(s => s.id === id ? { ...s, text: editValue } : s) };
      }
      return t;
    }));
    setEditingId(null);
  };

  return (
    <div className="subject-wrapper">
      <div className="subject-header" onClick={handleCardClick}>
        <div className="subject-left">
          <svg width="24" height="20" viewBox="0 0 24 20" fill="none">
            <circle cx="4" cy="4" r="1.5" fill="#4a4a4a"/>
            <circle cx="4" cy="10" r="1.5" fill="#4a4a4a"/>
            <circle cx="4" cy="16" r="1.5" fill="#4a4a4a"/>
            <circle cx="10" cy="4" r="1.5" fill="#4a4a4a"/>
            <circle cx="10" cy="10" r="1.5" fill="#4a4a4a"/>
            <circle cx="10" cy="16" r="1.5" fill="#4a4a4a"/>
          </svg>
          <input 
            type="checkbox" 
            checked={isAllChecked} 
            onChange={handleMainCheck} 
            onClick={(e) => e.stopPropagation()} 
          />
          <p className="subject-title">{title}</p>
        </div>
        
        <div className="subject-right-icons">
          {isGenerating ? (
            <div className="loader"></div>
          ) : isExpanded ? (
            <>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8c8c8c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 3 21 3 21 9"></polyline>
                <polyline points="9 21 3 21 3 15"></polyline>
                <line x1="21" y1="3" x2="14" y2="10"></line>
                <line x1="3" y1="21" x2="10" y2="14"></line>
              </svg>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </>
          ) : (
            <svg width="10" height="16" viewBox="0 0 8 14" fill="none" stroke="#081724" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 1L7 7L1 13" />
            </svg>
          )}
        </div>
      </div>

      {isExpanded && (
        <div className="subject-body">
          <hr className="divider" />
          
          {tasks.map((task, index) => (
            <React.Fragment key={task.id}>
              <div className="task-row">
                <input 
                  type="checkbox" 
                  checked={task.checked} 
                  onChange={() => handleCheck(task.id)} 
                />
                
                {editingId === task.id ? (
                  <input
                    className="edit-input"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onBlur={() => handleSaveEdit(task.id)} 
                    onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(task.id)}
                    autoFocus
                  />
                ) : (
                  <span className="task-text">{task.text}</span>
                )}
                
                <div className="task-actions" style={{ position: 'relative' }}>
                  <svg onClick={() => toggleMenu(task.id)} style={{ cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="2"></circle>
                    <circle cx="12" cy="5" r="2"></circle>
                    <circle cx="12" cy="19" r="2"></circle>
                  </svg>

                  {task.subTasks && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  )}

                  {menuOpenId === task.id && (
                    <>
                      <div className="menu-overlay" onClick={() => setMenuOpenId(null)}></div>
                      <div className="dropdown-menu">
                        <div className="dropdown-item" onClick={() => handleStartEdit(task.id, task.text)}>Editar</div>
                        <div className="dropdown-item delete" onClick={() => handleDelete(task.id)}>Excluir</div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {task.subTasks && task.subTasks.length > 0 && (
                <div className="sub-tasks-container">
                  {task.subTasks.map(sub => (
                    <div className="sub-task-row" key={sub.id}>
                      <input 
                        type="checkbox" 
                        checked={sub.checked} 
                        onChange={() => handleCheck(sub.id)} 
                      />
                      
                      {editingId === sub.id ? (
                        <input
                          className="edit-input"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          onBlur={() => handleSaveEdit(sub.id)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit(sub.id)}
                          autoFocus
                        />
                      ) : (
                        <span className="task-text">{sub.text}</span>
                      )}
                      
                      <div className="task-actions" style={{ position: 'relative', marginLeft: 'auto' }}>
                        <svg onClick={() => toggleMenu(sub.id)} style={{ cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="2"></circle>
                          <circle cx="12" cy="5" r="2"></circle>
                          <circle cx="12" cy="19" r="2"></circle>
                        </svg>

                        {menuOpenId === sub.id && (
                          <>
                            <div className="menu-overlay" onClick={() => setMenuOpenId(null)}></div>
                            <div className="dropdown-menu">
                              <div className="dropdown-item" onClick={() => handleStartEdit(sub.id, sub.text)}>Editar</div>
                              <div className="dropdown-item delete" onClick={() => handleDelete(sub.id)}>Excluir</div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {index < tasks.length - 1 && <hr className="divider" />}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

// ── PÁGINA PRINCIPAL ──
export default function DireitodoPage() {

  // Listas de Tarefas
  const filosofiaTasks = [
    { id: 't1', text: "Investigar a origem e a evolução da Filosofia do Direito", checked: false },
    {
      id: 't2', text: "Pesquisar o conceito de Filosofia do Direito", checked: false,
      subTasks: [
        { id: 's1', text: "Buscar fontes confiáveis sobre Filosofia do Direito", checked: false },
        { id: 's2', text: "Anotar definições e conceitos chave encontrados nas fontes", checked: false },
        { id: 's3', text: "Comparar diferentes perspectivas e interpretações sobre Filosofia do Direito", checked: false },
        { id: 's4', text: "Identificar os principais temas e problemas abordados na Filosofia do Direito", checked: false }
      ]
    },
    { id: 't3', text: "Identificar os principais filósofos que contribuíram para a diciplina", checked: false }
  ];

  const teoriasJusticaTasks = [
    {
      id: 't4', text: "Estudar a Teoria da Justiça de John Rawls", checked: false,
      subTasks: [
        { id: 's5', text: "Compreender o conceito de 'Véu de Ignorância' e 'Posição Original'", checked: false },
        { id: 's6', text: "Analisar os dois princípios da justiça propostos por Rawls", checked: false }
      ]
    },
    { id: 't5', text: "Ler sobre o Libertarismo de Robert Nozick e a ideia de Estado Mínimo", checked: false },
    { id: 't6', text: "Revisar as críticas comunitaristas de Michael Sandel", checked: false }
  ];

  const teoriaProcessoTasks = [
    {
      id: 't7', text: "Compreender os Princípios Constitucionais do Processo", checked: false,
      subTasks: [
        { id: 's7', text: "Resumir as aplicações do princípio do Contraditório e Ampla Defesa", checked: false },
        { id: 's8', text: "Estudar o conceito de Devido Processo Legal (Formal e Material)", checked: false }
      ]
    },
    { id: 't8', text: "Diferenciar Jurisdição, Ação e Competência (Teoria Tripartite)", checked: false },
    { id: 't9', text: "Estudar os Elementos da Ação (Partes, Causa de Pedir e Pedido)", checked: false }
  ];

  return (
    <>
      <style>{`
        /* ── ESTRUTURA GERAL DA PÁGINA ── */
        .direitodo-page {
          padding: 40px 60px;
          height: 100vh;
          overflow-y: auto;
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

        .search-input:focus { border-color: #081724; }

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

        .btn-add:hover { background-color: #152c40; }

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
          justify-content: space-between; 
          gap: 24px;
        }

        /* Colunas para manter o layout lado a lado */
        .board-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          width: 100%;
          max-width: 500px;
        }

        /* ── CARDS ESTRUTURA ── */
        .premium-card {
          width: 100%;
          height: 70px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          padding: 0 20px;
          background-color: #0d1424;
          gap: 16px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          justify-content: flex-end;
        }

        .premium-text {
          font-size: 13px;
          font-weight: 500;
          color: #ffffff;
          margin: 0;
          line-height: 1.4;
        }

        /* ── CARD EXPANSÍVEL (Matérias) ── */
        .subject-wrapper {
          width: 100%;
          border-radius: 6px;
          border: 1px solid #081724;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          transition: all 0.3s ease;
        }

        .subject-header {
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          cursor: pointer;
          background-color: #ffffff;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .subject-header:hover { background-color: #f8f9fa; }

        .subject-left { display: flex; align-items: center; gap: 12px; }

        .subject-title { font-size: 15px; font-weight: 700; color: #000000; margin: 0; }

        .subject-right-icons { display: flex; align-items: center; gap: 12px; }

        input[type="checkbox"] { width: 16px; height: 16px; cursor: pointer; accent-color: #081724; }

        /* ── ANIMAÇÃO DE LOADING ── */
        .loader {
          width: 20px; height: 20px;
          border: 3px solid #e0e0e0; border-top-color: #081724;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        @keyframes spin { to { transform: rotate(360deg); } }

        /* ── CONTEÚDO EXPANDIDO (LISTA DE TAREFAS) ── */
        .subject-body { padding: 0 20px 20px 20px; display: flex; flex-direction: column; background-color: #ffffff; }

        .divider { height: 1px; background-color: #e0e0e0; border: none; margin: 10px 0; }

        .task-row { display: flex; align-items: center; gap: 12px; padding: 8px 0; }

        .task-text { font-size: 13px; color: #555555; flex: 1; line-height: 1.4; }

        .task-actions { display: flex; align-items: center; gap: 8px; color: #000000; }

        /* Menu Dropdown dos 3 pontinhos */
        .menu-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; z-index: 9; }

        .dropdown-menu {
          position: absolute; right: 0; top: 24px;
          background: #ffffff; border: 1px solid #e0e0e0;
          border-radius: 6px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: flex; flex-direction: column; z-index: 10; min-width: 100px; overflow: hidden;
        }

        .dropdown-item { padding: 10px 16px; font-size: 13px; cursor: pointer; text-align: left; color: #000; font-weight: 500; transition: background-color 0.2s; }
        .dropdown-item:hover { background-color: #f0f0f0; }
        .dropdown-item.delete { color: #d90000; }

        /* Input do Modo de Edição */
        .edit-input {
          flex: 1; height: 28px; font-size: 13px; font-family: inherit;
          border: 1px solid #081724; border-radius: 4px; padding: 0 8px; outline: none;
        }
        .edit-input:focus { border-color: #d90000; }

        /* Sub-tarefas */
        .sub-tasks-container {
          border: 1px solid #d4d4d4; border-radius: 8px; padding: 12px;
          margin-left: 28px; margin-bottom: 10px; display: flex; flex-direction: column;
          gap: 12px; background-color: #fcfcfc; max-height: 140px; overflow-y: auto;
        }

        .sub-tasks-container::-webkit-scrollbar { width: 6px; }
        .sub-tasks-container::-webkit-scrollbar-track { background: #f1f1f1; border-radius: 4px; }
        .sub-tasks-container::-webkit-scrollbar-thumb { background: #c1c1c1; border-radius: 4px; }

        .sub-task-row { display: flex; align-items: center; gap: 10px; }
        @media (max-width: 768px) {
          .direitodo-page {
            padding: 20px;
          }
          .header-row {
            flex-wrap: wrap; /* Permite que os itens do cabeçalho se ajustem */
          }
          .main-board {
            flex-direction: column; /* Coloca as colunas uma embaixo da outra */
            padding: 15px;
            gap: 20px;
          }
          .board-column {
            max-width: 100%; /* Faz a coluna ocupar 100% da largura no celular */
          }
          .premium-card {
            padding: 0 15px;
            justify-content: center;
            text-align: center;
            height: auto;
            padding-top: 15px;
            padding-bottom: 15px;
          }
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
                <circle cx="12" cy="12" r="9"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            </button>
            <div className="counter-container">
              <div className="counter-top">3</div>
              <div className="counter-bottom">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 1L5 5L9 1" />
                </svg>
              </div>
            </div>
          </div>

          <div className="main-board" style={{ justifyContent: 'center', gap: '40px' }}>
            
            {/* ── COLUNA 1 (ESQUERDA) ── */}
            <div className="board-column">
              <SubjectCard 
                title="Filosofia do Direito" 
                initialTasks={filosofiaTasks} 
              />
              <SubjectCard 
                title="Teorias da Justiça Contemporâneas" 
                initialTasks={teoriasJusticaTasks} 
              />
            </div>

            {/* ── COLUNA 2 (DIREITA) ── */}
            <div className="board-column">
              <SubjectCard 
                title="Teoria Geral do Processo" 
                initialTasks={teoriaProcessoTasks} 
              />
              
              <div className="premium-card">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="5" y="11" width="14" height="10" rx="2" fill="#d90000"/>
                  <path d="M8 11V7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7V11" stroke="#d90000" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="12" cy="15" r="1.5" fill="#ffffff"/>
                  <path d="M12 16.5V18" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                <p className="premium-text">
                  Para desbloquear até 15 DIRE<span className="title-accent">!</span>TODO é necessário ter o plano premium
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}