import React, { useState } from 'react';

// ── Dados simulados (Mock) ────────────────────────
const simuladosData = [
  { 
    id: 1, type: "Simulado Prova", date: "13/03", subject: "Ciência Politica",
    questions: [
      { id: 1, title: "QUESTÃO 1", status: "pending", correctAnswer: "A", text: "Quais são os três elementos fundamentais que constituem o Estado moderno?", options: { A: "Território, Povo e Soberania.", B: "Governo, Exército e Leis.", C: "Nação, Cultura e Religião.", D: "Poder Legislativo, Executivo e Judiciário." } },
      { id: 2, title: "QUESTÃO 2", status: "pending", correctAnswer: "B", text: "No sistema Parlamentarista, como se divide a chefia do Poder Executivo?", options: { A: "O Presidente detém todo o poder.", B: "Chefia de Estado (Presidente/Monarca) e Chefia de Governo (Primeiro-Ministro).", C: "O Judiciário assume funções executivas.", D: "Não há divisão." } },
      { id: 3, title: "QUESTÃO 3", status: "pending", correctAnswer: "C", text: "Quem é o autor da obra 'O Espírito das Leis' (1748), que consolidou a teoria da separação dos poderes?", options: { A: "Thomas Hobbes.", B: "John Locke.", C: "Barão de Montesquieu.", D: "Jean-Jacques Rousseau." } },
      { id: 4, title: "QUESTÃO 4", status: "pending", correctAnswer: "B", text: "O conceito de 'Poliarquia', desenvolvido por Robert Dahl, caracteriza-se por:", options: { A: "Concentração total de poder.", B: "Combinação de alta participação política com alta competição eleitoral.", C: "Governo dos aristocratas.", D: "Ausência de instituições estatais." } },
      { id: 5, title: "QUESTÃO 5", status: "pending", correctAnswer: "C", text: "Segundo a teoria aristotélica, qual é a forma degenerada (corrompida) da Monarquia?", options: { A: "Democracia.", B: "Oligarquia.", C: "Tirania.", D: "Aristocracia." } },
      { id: 6, title: "QUESTÃO 6", status: "pending", correctAnswer: "A", text: "O 'Estado de Natureza' como uma 'guerra de todos contra todos' é uma concepção atribuída a:", options: { A: "Thomas Hobbes.", B: "Karl Marx.", C: "Immanuel Kant.", D: "Max Weber." } },
      { id: 7, title: "QUESTÃO 7", status: "pending", correctAnswer: "B", text: "O sistema de 'Checks and Balances' (Freios e Contrapesos) serve primordialmente para:", options: { A: "Aumentar a arrecadação.", B: "Garantir que nenhum poder se torne absoluto, mantendo limitação mútua.", C: "Dissolver o Congresso.", D: "Substituir a Constituição." } },
      { id: 8, title: "QUESTÃO 8", status: "pending", correctAnswer: "B", text: "Qual o principal marco teórico de Hans Kelsen para a Ciência Política e o Direito?", options: { A: "O contrato social.", B: "A Teoria Pura do Direito e a hierarquia das normas.", C: "A luta de classes.", D: "A dominação carismática." } },
      { id: 9, title: "QUESTÃO 9", status: "pending", correctAnswer: "B", text: "O que define um 'Estado Democrático de Direito'?", options: { A: "Vontade da maioria sobre a lei.", B: "Submissão à Constituição e respeito aos direitos fundamentais.", C: "Governo militar.", D: "Leis criadas só pelo Executivo." } },
      { id: 10, title: "QUESTÃO 10", status: "pending", correctAnswer: "B", text: "A soberania, elemento essencial do Estado, significa que:", options: { A: "O Estado depende de outros países.", B: "O poder estatal é supremo na ordem interna e independente na ordem externa.", C: "O poder é dividido com empresas.", D: "As leis não se aplicam a estrangeiros." } }
    ]
  },
  { 
    id: 2, type: "Simulado Prova", date: "04/05", subject: "Ciência Politica", 
    questions: [
      { id: 11, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "Na classificação de Maquiavel, quais são as duas formas fundamentais de governo?", options: { A: "Democracia e Aristocracia.", B: "Monarquia e República.", C: "Tirania e Oligarquia.", D: "Parlamentarismo e Presidencialismo." } },
      { id: 12, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "A forma de Estado na qual existe uma pluralidade de centros de poder político autônomos, unidos por uma Constituição rígida, denomina-se:", options: { A: "Estado Unitário.", B: "Confederação.", C: "Estado Federal.", D: "Império." } },
      { id: 13, title: "QUESTÃO 3", status: "pending", correctAnswer: "A", text: "Em qual sistema de governo o Presidente da República acumula as funções típicas de Chefe de Estado e Chefe de Governo?", options: { A: "Presidencialismo.", B: "Parlamentarismo.", C: "Monarquia Constitucional.", D: "Diretorial." } },
      { id: 14, title: "QUESTÃO 4", status: "pending", correctAnswer: "C", text: "Para Jean-Jacques Rousseau, a soberania reside fundamentalmente e inalienavelmente:", options: { A: "No monarca.", B: "No parlamento.", C: "No povo (vontade geral).", D: "Na aristocracia dominante." } },
      { id: 15, title: "QUESTÃO 5", status: "pending", correctAnswer: "C", text: "Qual dos seguintes pensadores é considerado o pai do liberalismo político, defendendo que os direitos à vida, à liberdade e à propriedade são direitos naturais?", options: { A: "Thomas Hobbes.", B: "Karl Marx.", C: "John Locke.", D: "Nicolau Maquiavel." } },
      { id: 16, title: "QUESTÃO 6", status: "pending", correctAnswer: "B", text: "Como o sociólogo Max Weber define o Estado Moderno em sua teoria?", options: { A: "Uma associação de classe voltada para a exploração econômica.", B: "A comunidade humana que reivindica, com êxito, o monopólio do uso legítimo da força física em um dado território.", C: "Um contrato social voltado exclusivamente à proteção da propriedade privada.", D: "Uma instituição puramente divina e irrefutável." } },
      { id: 17, title: "QUESTÃO 7", status: "pending", correctAnswer: "B", text: "No sistema eleitoral proporcional, frequentemente utilizado para eleições legislativas (como para deputados e vereadores no Brasil), o objetivo principal é:", options: { A: "Garantir que apenas o candidato mais votado tenha assento no parlamento.", B: "Refletir a pluralidade de votos e correntes de opinião na distribuição das cadeiras legislativas.", C: "Eliminar a influência de partidos políticos minoritários.", D: "Escolher diretamente o Chefe do Poder Executivo." } },
      { id: 18, title: "QUESTÃO 8", status: "pending", correctAnswer: "B", text: "Segundo a doutrina moderna da separação de poderes (inspirada em Montesquieu), uma função ATÍPICA do Poder Legislativo é:", options: { A: "A criação ordinária de leis.", B: "O julgamento em casos específicos (como em processos de impeachment).", C: "O veto parcial ou total de projetos de lei.", D: "O comando supremo das forças armadas." } },
      { id: 19, title: "QUESTÃO 9", status: "pending", correctAnswer: "C", text: "A transição do Estado Liberal clássico para o Estado Social (Welfare State) no decorrer do século XX foi caracterizada pela:", options: { A: "Abstenção total do Estado nas relações econômicas e trabalhistas.", B: "Eliminação total da propriedade privada dos meios de produção.", C: "Intervenção ativa do Estado para garantir direitos sociais, econômicos e trabalhistas essenciais.", D: "Concentração absoluta do poder político e econômico nas mãos de um déspota." } },
      { id: 20, title: "QUESTÃO 10", status: "pending", correctAnswer: "A", text: "No contexto da Teoria Geral do Estado, a 'Soberania' é classicamente caracterizada como um poder:", options: { A: "Uno, indivisível, inalienável e imprescritível.", B: "Dividido, alienável e de vigência temporária.", C: "Subordinado de forma absoluta às leis e tratados internacionais sem direito de recusa.", D: "Exclusivo do Poder Judiciário, não afetando os demais poderes." } }
    ]
  },
  { 
    id: 3, type: "QUIZ AULA", date: "04/05", subject: "Ciência Politica", 
    questions: [
      { id: 21, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "Para Thomas Hobbes, a saída do caótico estado de natureza se dá através da celebração de um pacto que estabelece um soberano com poder absoluto. Qual o nome da obra máxima onde ele expõe essa ideia?", options: { A: "O Príncipe.", B: "O Leviatã.", C: "O Contrato Social.", D: "Segundo Tratado sobre o Governo Civil." } },
      { id: 22, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "Na ciência política, como se diferencia o conceito de 'Estado' do conceito de 'Nação'?", options: { A: "São sinônimos exatos utilizados para a mesma finalidade jurídica.", B: "Nação refere-se ao aparato jurídico-político e geográfico, e Estado apenas à comunidade de indivíduos.", C: "Estado é a entidade jurídico-política (aparato de poder e território), enquanto Nação envolve identidade cultural, histórica e laços de pertencimento.", D: "O Estado não possui território definido, enquanto a Nação obrigatoriamente sim." } },
      { id: 23, title: "QUESTÃO 3", status: "pending", correctAnswer: "A", text: "Qual a diferença central e estrutural entre Democracia Direta e Democracia Representativa?", options: { A: "Na direta, o povo toma as decisões políticas sem intermediários; na representativa, elege mandatários para fazê-lo em seu nome.", B: "Apenas a democracia representativa é legítima e permite o sufrágio universal.", C: "A direta só ocorre no sistema parlamentarista.", D: "Não há diferença prática, pois as leis votadas são idênticas." } },
      { id: 24, title: "QUESTÃO 4", status: "pending", correctAnswer: "A", text: "No estudo das Formas de Estado, o que diferencia basicamente uma Confederação de uma Federação?", options: { A: "Na Confederação, os Estados-membros mantêm sua soberania plena e o direito de secessão (separação).", B: "Na Federação não há um documento constitucional, apenas tratados internacionais.", C: "Confederação é o termo histórico para Estado Unitário Descentralizado.", D: "Na Confederação há um forte poder central irrevogável que submete os entes locais." } },
      { id: 25, title: "QUESTÃO 5", status: "pending", correctAnswer: "D", text: "A quem pertence juridicamente e politicamente a titularidade do 'Poder Constituinte Originário', responsável por instituir uma nova Constituição em um Estado Democrático?", options: { A: "Ao Congresso Nacional ou Parlamento em exercício.", B: "Às Forças Armadas da respectiva nação.", C: "Ao Chefe do Poder Executivo em exercício.", D: "Ao Povo." } }
    ]
  },
  { 
    id: 4, type: "QUIZ AULA", date: "20/05", subject: "Ciência Politica", 
    questions: [
      { id: 26, title: "QUESTÃO 1", status: "pending", correctAnswer: "A", text: "O que caracteriza o modelo de 'voto censitário', adotado nas primeiras constituições liberais (como a do Brasil Império em 1824)?", options: { A: "O direito ao voto era restrito apenas àqueles que comprovassem um nível mínimo de renda ou patrimônio.", B: "O voto era obrigatório e universal para todas as pessoas maiores de 18 anos.", C: "O voto era baseado na escolaridade, restrito aos alfabetizados.", D: "Era o sistema em que o voto pertencia exclusivamente aos clérigos e militares." } },
      { id: 27, title: "QUESTÃO 2", status: "pending", correctAnswer: "B", text: "Segundo a taxonomia clássica aristotélica, a Oligarquia é considerada o governo corrompido ou degenerado de qual das opções abaixo?", options: { A: "De um só (degeneração da Monarquia).", B: "De poucos (degeneração da Aristocracia, visando ao interesse dos ricos).", C: "De muitos (degeneração da Politeia, visando apenas à maioria pobre).", D: "Dos militares (degeneração do governo civil)." } },
      { id: 28, title: "QUESTÃO 3", status: "pending", correctAnswer: "D", text: "Embora facções existissem desde a antiguidade, o conceito estrutural de 'Partidos Políticos' de massa ganhou força fundamentalmente durante qual momento histórico?", options: { A: "Durante a República Romana e o Senado.", B: "Ao longo de toda a Idade Média, com a disputa entre Reinos.", C: "No Renascimento, nas cidades-estado italianas.", D: "A partir do Século XIX, com a expansão do sufrágio e a solidificação dos parlamentos modernos." } },
      { id: 29, title: "QUESTÃO 4", status: "pending", correctAnswer: "B", text: "Em um Estado Democrático de Direito pautado na separação dos poderes, é correto afirmar que o Poder Judiciário deve ser institucionalmente:", options: { A: "Subordinado funcionalmente às diretrizes e ordens do Presidente da República.", B: "Independente e imparcial, exercendo a função jurisdicional sob o império da Constituição e da lei.", C: "Composto por magistrados eleitos pelo voto direto e secreto a cada dois anos.", D: "O principal responsável pela formulação e execução orçamentária de políticas públicas." } },
      { id: 30, title: "QUESTÃO 5", status: "pending", correctAnswer: "B", text: "Na dualidade das Formas de Governo, a característica principal da República, em nítida oposição ao modelo tradicional da Monarquia, é:", options: { A: "A vitaliciedade, hereditariedade e irresponsabilidade política do Chefe de Estado.", B: "A eletividade, a temporariedade do mandato e a responsabilidade política do governante perante os governados.", C: "A ausência total de processos eleitorais regulares e pluripartidarismo.", D: "O fato de que o poder fica concentrado em um Primeiro-Ministro vitalício." } }
    ]
  },
];

const monthNames = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

export default function SimuladosPage() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeSimulado, setActiveSimulado] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  
  const [answersLog, setAnswersLog] = useState({}); 
  const [feedback, setFeedback] = useState(null);
  
  const [completedSimulados, setCompletedSimulados] = useState({}); 

  // ── ESTADOS DO NOVO CALENDÁRIO / AGENDAMENTO ──
  const [currentDateView, setCurrentDateView] = useState(new Date(2026, 4, 1)); // Iniciando em Maio/2026 para corresponder ao layout
  const [provas, setProvas] = useState([
    { id: 1, subject: "Ciência Politica", date: "04/05/26" },
    { id: 2, subject: "Ciência Politica", date: "13/03/26" }
  ]);
  const [isAddingProva, setIsAddingProva] = useState(false);
  const [editingProvaId, setEditingProvaId] = useState(null);
  const [provaForm, setProvaForm] = useState({ subject: 'Ciência Politica', date: '' });

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      setIsCalendarOpen(false);
      setActiveSimulado(null);
      setSelectedOption(null);
      setFeedback(null);
      setActiveQuestionIndex(0);
      setAnswersLog({});
    }
  };

  const handleQuestionChange = (index) => {
    if (feedback) return; 
    setActiveQuestionIndex(index);
    setSelectedOption(null);
  };

  const handleEnviar = () => {
    const currentQ = activeSimulado.questions[activeQuestionIndex];
    const isCorrect = selectedOption === currentQ.correctAnswer;

    const newAnswersLog = {
      ...answersLog,
      [currentQ.id]: isCorrect ? 'correct' : 'incorrect'
    };
    setAnswersLog(newAnswersLog);
    setFeedback({
      message: isCorrect ? 'Resposta Correta! 👏' : 'Resposta Incorreta. 😕',
      isCorrect: isCorrect
    });

    setTimeout(() => {
      setFeedback(null);
      if (activeQuestionIndex < activeSimulado.questions.length - 1) {
        setActiveQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        const correctCount = Object.values(newAnswersLog).filter(status => status === 'correct').length;
        const totalQuestions = activeSimulado.questions.length;
        setCompletedSimulados(prev => ({
          ...prev,
          [activeSimulado.id]: { correct: correctCount, total: totalQuestions }
        }));
        setActiveSimulado(null);
        setActiveQuestionIndex(0);
        setAnswersLog({});
        setSelectedOption(null);
      }
    }, 1500);
  };

  // ── LÓGICA DO CALENDÁRIO & CRUD DE PROVAS ──
  const nextMonth = () => setCurrentDateView(new Date(currentDateView.getFullYear(), currentDateView.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDateView(new Date(currentDateView.getFullYear(), currentDateView.getMonth() - 1, 1));

  const handleAddClick = () => {
    setIsAddingProva(true);
    setEditingProvaId(null);
    setProvaForm({ subject: 'Ciência Politica', date: '' });
  };

  const handleEditClick = (prova) => {
    setIsAddingProva(true);
    setEditingProvaId(prova.id);
    setProvaForm({ subject: prova.subject, date: prova.date });
  };

  const handleDeleteClick = (id) => {
    setProvas(provas.filter(p => p.id !== id));
  };

  const handleSaveForm = () => {
    if (!provaForm.date) return;
    if (editingProvaId) {
      setProvas(provas.map(p => p.id === editingProvaId ? { ...p, ...provaForm } : p));
    } else {
      setProvas([...provas, { id: Date.now(), ...provaForm }]);
    }
    setIsAddingProva(false);
    setEditingProvaId(null);
  };

  // ── MÁSCARA DO INPUT DE DATA (DD/MM/AA) ──
  const handleDateChange = (e) => {
    // Remove tudo que não é número
    let value = e.target.value.replace(/\D/g, ''); 
    
    // Limita a 6 dígitos numéricos
    if (value.length > 6) {
      value = value.slice(0, 6); 
    }
    
    // Adiciona as barras de acordo com o tamanho da string
    if (value.length >= 5) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 6)}`;
    } else if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    
    setProvaForm({ ...provaForm, date: value });
  };

  const renderDays = () => {
    const year = currentDateView.getFullYear();
    const month = currentDateView.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayIndex = new Date(year, month, 1).getDay();
    const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; 

    const days = [];
    for (let i = 0; i < startOffset; i++) {
      days.push(<div key={`empty-${i}`} className="cal-day empty"></div>);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
      const dayString = `${String(i).padStart(2, '0')}/${String(month + 1).padStart(2, '0')}`;
      const dayStringYear = `${dayString}/${String(year).slice(-2)}`;

      const simuladosDoDia = simuladosData.filter(s => s.date === dayString);
      const provasDoDia = provas.filter(p => p.date === dayString || p.date === dayStringYear);
      
      const isSimulado = simuladosDoDia.length > 0;
      const isProva = provasDoDia.length > 0;

      days.push(
        <div key={i} className="cal-day">
          <span className="cal-day-num">{i}</span>
          <div className="cal-events">
            
            {/* Simulados com Tooltip */}
            {isSimulado && simuladosDoDia.map(simulado => (
              <div key={`simulado-${simulado.id}`} className="tooltip-container">
                <span className="tag-simulado">SIMULADO</span>
                <span className="tooltip-text">{simulado.subject}</span>
              </div>
            ))}

            {/* Provas com Tooltip */}
            {isProva && provasDoDia.map(prova => (
              <div key={`prova-${prova.id}`} className="tooltip-container">
                <span className="tag-prova">PROVA</span>
                <div className="tag-prova-sub"></div>
                <span className="tooltip-text">{prova.subject}</span>
              </div>
            ))}

          </div>
        </div>
      );
    }

    const totalCells = days.length;
    const remainingCells = 35 - totalCells; 
    for(let i = 0; i < (remainingCells > 0 ? remainingCells : 42 - totalCells); i++) {
        days.push(<div key={`empty-end-${i}`} className="cal-day empty"></div>);
    }

    return days;
  };

  return (
    <>
      <style>{`
        .simulados-page { padding: 40px 60px; height: 100%; display: flex; flex-direction: column; font-family: "Montserrat", Arial, sans-serif; background-color: #f8f9fa; position: relative; }
        .content-wrapper { max-width: 1200px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; height: 100%; }
        .header-section { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; }
        .title-group { display: flex; align-items: center; gap: 30px; }
        .page-title { font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #000000; margin: 0 0 25px 0; text-transform: uppercase; }
        .title-accent { color: #d90000; }
        .btn-header { background: #ffffff; font-family: inherit; font-size: 12px; font-weight: 500; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 4px; display: flex; align-items: center; justify-content: center; height: 40px; transition: all 0.2s; }
        .btn-agendar { border: 2px solid #1c2b44; color: #1c2b44; padding: 0 20px 0 15px; gap: 10px; width: 160px; }
        .btn-agendar:hover { background: #f0f2f5; }
        .btn-aprendizado { border: 2px solid #1c2b44; color: #1c2b44; padding: 0 25px; font-weight: 600; }
        .btn-aprendizado:hover { background: #f0f7fb; }
        .main-board { background: #ffffff; flex: 1; border-radius: 6px; border: 1px solid #d4d4d4; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); padding: 30px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; align-content: start; }
        .simulado-card { background: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; width: 100%; height: 160px; padding: 16px; display: flex; flex-direction: column; justify-content: space-between; box-shadow: 0 2px 6px rgba(0,0,0,0.06); transition: transform 0.2s, box-shadow 0.2s; }
        .simulado-card:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .card-header p { margin: 0; }
        .card-title { font-size: 14px; color: #222222; font-weight: 500; margin-bottom: 4px !important; }
        .card-subject { font-size: 13px; color: #666666; margin-bottom: 8px; }
        .card-performance { font-size: 12px; font-weight: 600; color: #1b633c; background: #e8f5e9; padding: 4px 8px; border-radius: 4px; display: inline-block; margin-top: 5px; }
        .btn-iniciar { background: transparent; border: 2px solid #1c2b44; color: #1c2b44; border-radius: 4px; padding: 10px 0; font-size: 12px; font-weight: 600; letter-spacing: 2px; cursor: pointer; text-align: center; transition: all 0.2s; }
        .btn-iniciar:hover { background: #1c2b44; color: #ffffff; }
        .placeholder-card { background: #bfbfbf; border-radius: 4px; width: 100%; height: 160px; display: flex; align-items: center; justify-content: center; box-shadow: inset 0 0 10px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.1); cursor: pointer; transition: filter 0.2s; }
        .placeholder-card:hover { filter: brightness(0.95); }
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        
        .simulado-window { background: #ffffff; width: 90vw; max-width: 1300px; height: 85vh; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; }
        .simulado-header-bar { padding: 20px 30px; border-bottom: 1px solid #e0e0e0; font-size: 14px; font-weight: 500; color: #4a4a4a; text-transform: uppercase; }
        .simulado-body { display: flex; flex: 1; overflow: hidden; }
        .simulado-sidebar { width: 280px; border-right: 1px solid #e0e0e0; padding: 20px; overflow-y: auto; }
        .question-item { display: flex; align-items: center; gap: 12px; padding: 12px 10px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; }
        .question-item:hover, .question-item.active { background: #f0f4f8; }
        .status-box { width: 20px; height: 20px; border-radius: 2px; border: 1px solid #ccc; flex-shrink: 0; transition: all 0.3s ease; }
        .status-correct { background: #1b633c; border-color: #1b633c; }
        .status-incorrect { background: #b01b1b; border-color: #b01b1b; }
        .status-pending { background: #ffffff; }
        .question-label { font-size: 13px; color: #555; font-weight: 500; }
        .simulado-content { flex: 1; padding: 40px 60px; display: flex; flex-direction: column; overflow-y: auto; }
        .question-title { font-size: 22px; font-weight: 700; color: #000; margin: 0 0 15px 0; }
        .question-text { font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 30px; }
        .options-container { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; flex: 1; }
        .option-btn { background: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; padding: 16px 20px; text-align: left; font-family: inherit; font-size: 15px; color: #444; cursor: pointer; transition: all 0.2s; line-height: 1.5; }
        .option-btn:hover { border-color: #1c2b44; background: #f8f9fa; }
        .option-btn.selected { border-color: #1c2b44; background: #f0f4f8; box-shadow: 0 0 0 1px #1c2b44; font-weight: 500; }
        .option-letter { font-weight: 700; margin-right: 10px; color: #1c2b44; }
        .btn-enviar-wrapper { display: flex; justify-content: flex-end; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
        .feedback-msg { font-size: 14px; font-weight: 600; margin-right: 20px; animation: fadeIn 0.3s ease; }
        .feedback-success { color: #1b633c; }
        .feedback-error { color: #b01b1b; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        .btn-enviar { background: #081724; color: #ffffff; border: none; padding: 12px 35px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 2px; cursor: pointer; transition: background 0.2s; }
        .btn-enviar:hover { background: #152c40; }
        .btn-enviar:disabled { background: #a0a0a0; cursor: not-allowed; }

        /* ── CSS DO NOVO MODAL DE AGENDAMENTO ── */
        .agenda-modal { background: #ffffff; width: 950px; max-width: 95vw; height: 500px; border-radius: 6px; box-shadow: 0 15px 50px rgba(0,0,0,0.3); display: flex; overflow: hidden; font-family: "Montserrat", Arial, sans-serif; }
        
        /* Lateral Esquerda */
        .agenda-left { width: 360px; padding: 40px; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column; overflow-y: auto; }
        .agenda-title-wrapper { display: flex; align-items: center; gap: 10px; margin-bottom: 25px; }
        .agenda-title { font-size: 16px; font-weight: 600; letter-spacing: 3px; color: #000; margin: 0; }
        
        .btn-add-prova { width: 100%; border: 1px solid #d4d4d4; background: #fff; padding: 6px; border-radius: 4px; cursor: pointer; font-size: 18px; color: #555; margin-bottom: 15px; display: flex; justify-content: center; align-items: center; transition: 0.2s; }
        .btn-add-prova:hover { background: #f9f9f9; border-color: #aaa; }

        .prova-form-card { border: 1px solid #e0e0e0; border-radius: 4px; padding: 15px; margin-bottom: 15px; background: #fff; box-shadow: 0 2px 8px rgba(0,0,0,0.03); }
        .form-row-top { display: flex; justify-content: space-between; gap: 10px; margin-bottom: 12px; }
        .form-select, .form-input { border: 1px solid #ccc; padding: 6px 10px; border-radius: 3px; font-size: 11px; color: #444; width: 100%; outline: none; font-family: inherit; }
        .form-select { width: 60%; }
        .form-input { width: 35%; text-align: center; }
        .form-row-bottom { display: flex; justify-content: flex-end; }
        .btn-salvar-form { background: #081724; color: white; border: none; padding: 6px 18px; border-radius: 3px; font-size: 10px; font-weight: 600; cursor: pointer; transition: 0.2s; }
        .btn-salvar-form:hover { background: #1c2b44; }

        .prova-item-card { border: 1px solid #e0e0e0; border-radius: 4px; padding: 15px; margin-bottom: 15px; background: #fff; display: flex; flex-direction: column; box-shadow: 0 2px 5px rgba(0,0,0,0.02); }
        .prova-item-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
        .prova-item-subject { font-size: 12px; color: #333; }
        .prova-item-date { border: 1px solid #ccc; padding: 3px 8px; border-radius: 3px; font-size: 11px; color: #666; }
        .prova-item-actions { display: flex; justify-content: flex-end; gap: 5px; }
        .action-btn { background: #fff; border: 1px solid #d4d4d4; border-radius: 3px; padding: 4px 6px; cursor: pointer; color: #555; transition: 0.2s; }
        .action-btn:hover { background: #f0f0f0; }

        /* Lateral Direita (Calendário) */
        .agenda-right { flex: 1; padding: 30px 40px; display: flex; flex-direction: column; }
        .cal-header-bar { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; padding: 0 10px; }
        .cal-nav-btn { background: transparent; border: none; font-size: 22px; cursor: pointer; color: #000; padding: 5px; font-weight: bold; }
        .cal-title-block { text-align: center; }
        .cal-month { font-size: 22px; font-weight: 400; letter-spacing: 6px; color: #000; margin: 0; }
        .cal-year { font-size: 12px; font-weight: 600; color: #333; letter-spacing: 2px; margin-top: 4px; }
        
        .cal-grid-headers { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; margin-bottom: 10px; }
        .cal-header-day { font-size: 10px; color: #888; font-weight: 500; letter-spacing: 1px; }
        
        .cal-grid { display: grid; grid-template-columns: repeat(7, 1fr); flex: 1; border-top: 1px solid #e6e6e6; border-left: 1px solid #e6e6e6; }
        .cal-day { border-right: 1px solid #e6e6e6; border-bottom: 1px solid #e6e6e6; padding: 6px; display: flex; flex-direction: column; align-items: flex-start; min-height: 65px; position: relative; }
        .cal-day.empty { background: #fdfdfd; }
        .cal-day-num { font-size: 13px; color: #444; margin-bottom: auto; }
        
        .cal-events { width: 100%; display: flex; flex-direction: column; align-items: center; gap: 3px; margin-top: 8px; }
        .tag-simulado { background: #a90000; color: white; font-size: 7px; padding: 3px 8px; border-radius: 3px; font-weight: 700; letter-spacing: 1px; width: fit-content; }
        .tag-prova { background: #a90000; color: white; font-size: 7px; padding: 3px 8px; border-radius: 3px; font-weight: 700; letter-spacing: 1px; width: fit-content; }
        .tag-prova-sub { background: #081724; width: 24px; height: 5px; border-radius: 3px; margin-top: 1px; }

        .tooltip-container { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        .tooltip-text { visibility: hidden; background-color: #081724; color: #ffffff; text-align: center; border-radius: 4px; padding: 6px 10px; font-size: 9px; font-weight: 600; letter-spacing: 1px; position: absolute; z-index: 10; bottom: 110%; /* Posiciona acima da tag */ left: 50%; transform: translateX(-50%); white-space: nowrap; opacity: 0; transition: all 0.2s ease-in-out; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .tooltip-text::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -4px; border-width: 4px; border-style: solid; border-color: #081724 transparent transparent transparent; }
        .tooltip-container:hover .tooltip-text { visibility: visible; opacity: 1; bottom: 130%; /* Sobe um pouquinho fazendo uma animação */ }

      `}</style>

      <div className="simulados-page">
        <h1 className="page-title">S<span className="title-accent">!</span>MULADOS</h1>

        <div className="content-wrapper">
          <div className="header-section">
            <div className="title-group">
              <button className="btn-header btn-agendar" onClick={() => setIsCalendarOpen(true)}>
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
            <button className="btn-header btn-aprendizado">MEU APRENDIZADO</button>
          </div>

          <div className="main-board">
            {simuladosData.map((item) => (
              <div key={item.id} className="simulado-card">
                <div className="card-header">
                  <p className="card-title">{item.type} - {item.date}</p>
                  <p className="card-subject">{item.subject}</p>
                  {completedSimulados[item.id] && (
                    <div className="card-performance">
                      {completedSimulados[item.id].correct}/{completedSimulados[item.id].total} Acertos
                    </div>
                  )}
                </div>
                <button 
                  className="btn-iniciar" 
                  onClick={() => {
                    setActiveQuestionIndex(0);
                    setAnswersLog({});
                    setActiveSimulado(item);
                  }}
                >
                  {completedSimulados[item.id] ? "REFAZER" : "INICIAR"}
                </button>
              </div>
            ))}

            <div className="placeholder-card">
               <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
                 <rect x="18" y="24" width="28" height="36" rx="4" fill="#8c8c8c" />
                 <rect x="12" y="18" width="28" height="36" rx="4" fill="#757575" />
                 <rect x="18" y="26" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="33" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="40" width="16" height="3" rx="1.5" fill="#a0a0a0" />
                 <rect x="18" y="47" width="10" height="3" rx="1.5" fill="#a0a0a0" />
               </svg>
            </div>
          </div>
        </div>
      </div>

      {/* ── MODAL AGENDAMENTO E CALENDÁRIO ── */}
      {isCalendarOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="agenda-modal" onClick={e => e.stopPropagation()}>
            
            <div className="agenda-left">
              <div className="agenda-title-wrapper">
                <h2 className="agenda-title">AGENDAR - PROVAS</h2>
              </div>

              <button className="btn-add-prova" onClick={handleAddClick}>+</button>

              {isAddingProva && (
                <div className="prova-form-card">
                  <div className="form-row-top">
                    <select 
                      className="form-select"
                      value={provaForm.subject} 
                      onChange={e => setProvaForm({...provaForm, subject: e.target.value})}
                    >
                      <option value="Ciência Politica">Ciência Politica</option>
                      <option value="Direito Civil">Direito Civil</option>
                      <option value="Direito Penal">Direito Penal</option>
                    </select>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="dd/mm/aa" 
                      maxLength="8"
                      value={provaForm.date}
                      onChange={handleDateChange}
                    />
                  </div>
                  <div className="form-row-bottom">
                    <button className="btn-salvar-form" onClick={handleSaveForm}>SALVAR</button>
                  </div>
                </div>
              )}

              {provas.map((prova) => (
                <div key={prova.id} className="prova-item-card">
                  <div className="prova-item-top">
                    <span className="prova-item-subject">{prova.subject}</span>
                    <span className="prova-item-date">{prova.date}</span>
                  </div>
                  <div className="prova-item-actions">
                    <button className="action-btn" onClick={() => handleEditClick(prova)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                      </svg>
                    </button>
                    <button className="action-btn" onClick={() => handleDeleteClick(prova.id)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="agenda-right">
              <div className="cal-header-bar">
                <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                <div className="cal-title-block">
                  <h3 className="cal-month">{monthNames[currentDateView.getMonth()]}</h3>
                  <div className="cal-year">{currentDateView.getFullYear()}</div>
                </div>
                <button className="cal-nav-btn" onClick={nextMonth}>›</button>
              </div>

              <div className="cal-grid-headers">
                <div className="cal-header-day">SEG</div>
                <div className="cal-header-day">TER</div>
                <div className="cal-header-day">QUA</div>
                <div className="cal-header-day">QUI</div>
                <div className="cal-header-day">SEX</div>
                <div className="cal-header-day">SÁB</div>
                <div className="cal-header-day">DOM</div>
              </div>

              <div className="cal-grid">
                {renderDays()}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ── MODAL DO SIMULADO ── */}
      {activeSimulado && activeSimulado.questions && activeSimulado.questions.length > 0 && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="simulado-window" onClick={e => e.stopPropagation()}>
            <div className="simulado-header-bar">
              SIMULADO {activeSimulado.date} - {activeSimulado.subject}
            </div>
            
            <div className="simulado-body">
              <div className="simulado-sidebar">
                {activeSimulado.questions.map((q, index) => {
                  const finalStatus = answersLog[q.id] || q.status;
                  return (
                    <div 
                      key={q.id} 
                      className={`question-item ${activeQuestionIndex === index ? 'active' : ''}`} 
                      onClick={() => handleQuestionChange(index)}
                    >
                      <div className={`status-box status-${finalStatus}`}></div>
                      <span className="question-label">[X] {q.title}</span>
                    </div>
                  );
                })}
              </div>

              <div className="simulado-content">
                <h2 className="question-title">{activeSimulado.questions[activeQuestionIndex].title}</h2>
                <p className="question-text">
                  {activeSimulado.questions[activeQuestionIndex].text}
                </p>
                
                <div className="options-container">
                  {Object.entries(activeSimulado.questions[activeQuestionIndex].options).map(([key, text]) => (
                    <button 
                      key={key} 
                      className={`option-btn ${selectedOption === key ? 'selected' : ''}`}
                      onClick={() => !feedback && setSelectedOption(key)} 
                    >
                      <span className="option-letter">{key})</span> {text}
                    </button>
                  ))}
                </div>

                <div className="btn-enviar-wrapper">
                  {feedback && (
                    <span className={`feedback-msg ${feedback.isCorrect ? 'feedback-success' : 'feedback-error'}`}>
                      {feedback.message}
                    </span>
                  )}
                  <button 
                    className="btn-enviar" 
                    onClick={handleEnviar}
                    disabled={!selectedOption || feedback !== null} 
                  >
                    ENVIAR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}