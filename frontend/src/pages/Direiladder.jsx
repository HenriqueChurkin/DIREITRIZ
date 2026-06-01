import React, { useState } from 'react';
import { Lock, Check, Star, Play, ArrowLeft, Trophy } from 'lucide-react';

// ── Dados Simulados com Trilhas Embutidas ────────────────────────
const initialCoursesData = [
  { 
    id: 'vade-mecum', 
    title: 'VADE MECUM', 
    progress: 40, 
    isLocked: false, 
    isGold: false,
    pathLevels: [
      { 
        id: 'vm-1', status: 'completed', label: 'Introdução', 
        questions: [
          { id: 11, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "A Lei de Introdução às Normas do Direito Brasileiro (LINDB) é considerada:", options: { A: "Norma constitucional primária.", B: "Norma de sobredireito (ou lex legum).", C: "Lei complementar material.", D: "Apenas aplicável ao Código Civil." } },
          { id: 12, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "Salvo disposição em contrário, a lei começa a vigorar em todo o país após quantos dias de sua publicação oficial?", options: { A: "15 dias.", B: "30 dias.", C: "45 dias.", D: "90 dias." } },
          { id: 13, title: "QUESTÃO 3", status: "pending", correctAnswer: "A", text: "Ninguém se escusa de cumprir a lei, alegando que não a conhece. Esse princípio consagra a:", options: { A: "Presunção de conhecimento da lei.", B: "Irretroatividade das leis.", C: "Cláusula rebus sic stantibus.", D: "Vacatio legis estendida." } },
          { id: 14, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "A repristinação no direito brasileiro (restauração da lei revogada porque a lei revogadora perdeu a vigência):", options: { A: "É a regra geral.", B: "Ocorre tacitamente na maioria dos casos.", C: "Só não ocorre em leis complementares.", D: "Não ocorre automaticamente, exigindo previsão expressa." } },
          { id: 15, title: "QUESTÃO 5", status: "pending", correctAnswer: "B", text: "Quando a lei for omissa, o juiz decidirá o caso de acordo com a analogia, os costumes e:", options: { A: "A opinião doutrinária.", B: "Os princípios gerais de direito.", C: "As súmulas persuasivas.", D: "A jurisprudência não vinculante." } }
        ] 
      },
      { 
        id: 'vm-2', status: 'completed', label: 'Conceitos Iniciais', 
        questions: [
          { id: 21, title: "QUESTÃO 1", status: "pending", correctAnswer: "A", text: "A personalidade civil da pessoa natural começa:", options: { A: "Do nascimento com vida.", B: "Da concepção.", C: "Aos 18 anos completos.", D: "Com a emissão da certidão de nascimento." } },
          { id: 22, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "São absolutamente incapazes de exercer pessoalmente os atos da vida civil:", options: { A: "Os ébrios habituais.", B: "Os pródigos.", C: "Os menores de 16 anos.", D: "Os excepcionais sem desenvolvimento mental completo." } },
          { id: 23, title: "QUESTÃO 3", status: "pending", correctAnswer: "B", text: "Os bens naturalmente divisíveis podem tornar-se indivisíveis:", options: { A: "Apenas por determinação da lei.", B: "Por determinação da lei ou por vontade das partes.", C: "Apenas por ordem judicial.", D: "Nunca podem se tornar indivisíveis." } },
          { id: 24, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "O domicílio da pessoa natural é o lugar onde ela:", options: { A: "Possui propriedade imobiliária.", B: "Foi registrada ao nascer.", C: "Exerce esporadicamente sua profissão.", D: "Estabelece a sua residência com ânimo definitivo." } },
          { id: 25, title: "QUESTÃO 5", status: "pending", correctAnswer: "A", text: "O negócio jurídico nulo:", options: { A: "Não é suscetível de confirmação e nem convalesce pelo decurso do tempo.", B: "Pode ser convalidado em até 4 anos.", C: "Gera efeitos jurídicos até ser anulado judicialmente.", D: "Depende exclusivamente da iniciativa das partes para ser anulado." } }
        ] 
      },
      { 
        id: 'vm-3', status: 'current', label: 'Prática Básica', 
        questions: [
          { id: 101, title: "QUESTÃO 1", status: "pending", correctAnswer: "C", text: "Segundo a Constituição Federal, qual o remédio constitucional cabível para proteger direito líquido e certo, não amparado por habeas corpus ou habeas data?", options: { A: "Ação Popular.", B: "Mandado de Injunção.", C: "Mandado de Segurança.", D: "Ação Civil Pública." } },
          { id: 102, title: "QUESTÃO 2", status: "pending", correctAnswer: "A", text: "No que tange aos Direitos e Garantias Fundamentais, é correto afirmar que a prática do racismo constitui crime:", options: { A: "Inafiançável e imprescritível.", B: "Afiançável e imprescritível.", C: "Inafiançável e prescritível.", D: "Hediondo e afiançável." } },
          { id: 103, title: "QUESTÃO 3", status: "pending", correctAnswer: "B", text: "A quem compete originariamente processar e julgar o Presidente da República nas infrações penais comuns?", options: { A: "Superior Tribunal de Justiça (STJ).", B: "Supremo Tribunal Federal (STF).", C: "Senado Federal.", D: "Câmara dos Deputados." } },
          { id: 104, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "Qual a idade mínima constitucionalmente exigida para que um cidadão possa se candidatar ao cargo de Senador da República?", options: { A: "21 anos.", B: "18 anos.", C: "30 anos.", D: "35 anos." } },
          { id: 105, title: "QUESTÃO 5", status: "pending", correctAnswer: "B", text: "São direitos sociais expressamente previstos no Art. 6º da CF/88, EXCETO:", options: { A: "Educação e saúde.", B: "Propriedade privada e livre iniciativa.", C: "Trabalho, moradia e transporte.", D: "Segurança e lazer." } }
        ]
      },
      { 
        id: 'vm-4', status: 'locked', label: 'Aprofundamento', 
        questions: [
          { id: 201, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "Normas constitucionais de eficácia limitada são aquelas que:", options: { A: "Produzem efeitos imediatos.", B: "Dependem da emissão de uma lei posterior para produzirem seus efeitos essenciais.", C: "Aplicam-se apenas ao Judiciário.", D: "Possuem aplicabilidade integral desde a promulgação." } },
          { id: 202, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "Compete privativamente à União legislar sobre as seguintes matérias, EXCETO:", options: { A: "Direito civil, penal e processual.", B: "Águas e telecomunicações.", C: "Proteção à infância e à juventude.", D: "Direito do trabalho e eleitoral." } },
          { id: 203, title: "QUESTÃO 3", status: "pending", correctAnswer: "A", text: "O controle concentrado de constitucionalidade perante a CF/88 é competência exclusiva do:", options: { A: "Supremo Tribunal Federal.", B: "Superior Tribunal de Justiça.", C: "Congresso Nacional.", D: "Procurador-Geral da República." } },
          { id: 204, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "Não se inclui expressamente entre as cláusulas pétreas a vedação à abolição de:", options: { A: "A forma federativa de Estado.", B: "Os direitos e garantias individuais.", C: "O voto direto, secreto e universal.", D: "O sistema presidencialista de governo." } },
          { id: 205, title: "QUESTÃO 5", status: "pending", correctAnswer: "C", text: "A prática da tortura e o terrorismo são considerados pela CF/88 como:", options: { A: "Prescritíveis e afiançáveis.", B: "Imprescritíveis e insuscetíveis de graça.", C: "Inafiançáveis e insuscetíveis de graça ou anistia.", D: "Suscetíveis de fiança e liberdade provisória." } }
        ] 
      },
      { 
        id: 'vm-5', status: 'locked', label: 'Revisão Final', 
        questions: [
          { id: 301, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "No controle incidental de constitucionalidade, a decisão proferida pelo STF possui, como regra, efeitos:", options: { A: "Erga omnes e ex tunc.", B: "Inter partes e ex tunc.", C: "Erga omnes e ex nunc.", D: "Inter partes e ex nunc." } },
          { id: 302, title: "QUESTÃO 2", status: "pending", correctAnswer: "A", text: "No Direito Administrativo, o atributo do ato que impõe submissão ao administrado independentemente de concordância é:", options: { A: "Imperatividade.", B: "Autoexecutoriedade.", C: "Tipicidade.", D: "Presunção de Legitimidade." } },
          { id: 303, title: "QUESTÃO 3", status: "pending", correctAnswer: "D", text: "A emenda à Constituição rejeitada ou havida por prejudicada:", options: { A: "Pode ser reapresentada na mesma sessão por maioria absoluta.", B: "Pode ser reapresentada por convocação presidencial.", C: "Será arquivada definitivamente nesta legislatura.", D: "Não pode ser objeto de nova proposta na mesma sessão legislativa." } },
          { id: 304, title: "QUESTÃO 4", status: "pending", correctAnswer: "C", text: "A responsabilidade civil do Estado por atos comissivos, nos termos da CF/88, adota a teoria do(a):", options: { A: "Risco Integral.", B: "Culpa Administrativa.", C: "Risco Administrativo (objetiva).", D: "Fato da Administração." } },
          { id: 305, title: "QUESTÃO 5", status: "pending", correctAnswer: "A", text: "É condição indispensável para ajuizamento de Habeas Data:", options: { A: "A recusa ou omissão da obtenção do dado na via administrativa.", B: "O prévio parecer do MPF.", C: "A hipossuficiência econômica.", D: "O esgotamento de instâncias judiciais." } },
          { id: 306, title: "QUESTÃO 6", status: "pending", correctAnswer: "C", text: "O provimento de cargos mediante ascensão funcional para carreira diversa:", options: { A: "É válido com concurso interno.", B: "Depende de decreto do chefe do Executivo.", C: "É inconstitucional (Súmula Vinculante 43).", D: "É permitido para estabilizados antes de 1988." } },
          { id: 307, title: "QUESTÃO 7", status: "pending", correctAnswer: "B", text: "A descentralização administrativa ocorre quando o Estado distribui competências para:", options: { A: "Órgãos internos da mesma pessoa jurídica.", B: "Outra pessoa jurídica autônoma.", C: "Chefias setoriais.", D: "Agentes delegados do poder de polícia." } },
          { id: 308, title: "QUESTÃO 8", status: "pending", correctAnswer: "D", text: "A aplicação de penalidade a um servidor público decorre imediatamente do Poder:", options: { A: "Regulamentar.", B: "De Polícia.", C: "Hierárquico Puro.", D: "Disciplinar." } },
          { id: 309, title: "QUESTÃO 9", status: "pending", correctAnswer: "A", text: "A idade mínima para ser Presidente da República é:", options: { A: "35 anos.", B: "30 anos.", C: "21 anos.", D: "18 anos." } },
          { id: 310, title: "QUESTÃO 10", status: "pending", correctAnswer: "B", text: "O princípio da indisponibilidade do interesse público atua para:", options: { A: "Permitir vendas lucrativas de bens de uso comum.", B: "Vedar a livre disposição dos bens e interesses da coletividade.", C: "Garantir privilégios estatais irrestritos.", D: "Proibir licitações." } }
        ] 
      }
    ]
  },
  { 
    id: 'oab', 
    title: 'OAB', 
    progress: 0, 
    isLocked: false, 
    isGold: false,
    pathLevels: [
      { 
        id: 'oab-1', status: 'current', label: 'Ética Profissional', 
        questions: [
          { id: 401, title: "QUESTÃO 1", status: "pending", correctAnswer: "C", text: "Segundo o Estatuto da OAB, a publicidade profissional do advogado:", options: { A: "Pode ser feita em rádio e televisão, desde que moderada.", B: "Tem caráter estritamente mercantil e captação de clientela.", C: "Deve ter caráter meramente informativo e primar pela discrição.", D: "É permitida em outdoors e letreiros luminosos." } },
          { id: 402, title: "QUESTÃO 2", status: "pending", correctAnswer: "A", text: "A retenção abusiva ou o extravio de autos recebidos com vista ou em confiança constitui:", options: { A: "Infração disciplinar punível com suspensão.", B: "Conduta atípica sob o ponto de vista ético.", C: "Crime inafiançável de apropriação indébita.", D: "Mera irregularidade punível apenas com advertência reservada." } },
          { id: 403, title: "QUESTÃO 3", status: "pending", correctAnswer: "D", text: "Sobre o sigilo profissional do advogado, é correto afirmar:", options: { A: "Pode ser quebrado mediante mera solicitação de autoridade policial.", B: "É absoluto e não admite exceções sob nenhuma hipótese.", C: "Não abrange fatos de que o advogado tome conhecimento na relação com cliente que não chegou a contratá-lo.", D: "Cede em face de grave ameaça ao direito à vida, à honra, ou quando o advogado for afrontado pelo próprio cliente." } },
          { id: 404, title: "QUESTÃO 4", status: "pending", correctAnswer: "B", text: "A inscrição principal do advogado deve ser feita no Conselho Seccional cujo território:", options: { A: "Onde obteve a graduação em Direito.", B: "Pretenda estabelecer o seu domicílio profissional.", C: "Onde nasceu o requerente.", D: "Pretenda exercer a atividade de forma eventual." } },
          { id: 405, title: "QUESTÃO 5", status: "pending", correctAnswer: "A", text: "O advogado é indispensável à administração da justiça, sendo inviolável por seus atos e manifestações no exercício da profissão, nos limites da lei. Trata-se de previsão estabelecida:", options: { A: "Na Constituição Federal.", B: "Apenas no Regulamento Geral da OAB.", C: "Exclusivamente no Código de Ética e Disciplina.", D: "Em provimentos do Conselho Federal." } }
        ] 
      },
      { 
        id: 'oab-2', status: 'locked', label: 'Direito Civil', 
        questions: [
          { id: 501, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "No que se refere à prescrição e à decadência no Código Civil, assinale a opção correta.", options: { A: "Os prazos prescricionais podem ser alterados por acordo das partes.", B: "A decadência legal deve ser conhecida de ofício pelo juiz.", C: "A prescrição iniciada contra uma pessoa não continua a correr contra o seu sucessor.", D: "A interrupção da prescrição por um credor solidário não aproveita aos outros." } },
          { id: 502, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "Na sistemática do Código Civil, aquele que, por ato ilícito, causar dano a outrem, fica obrigado a repará-lo. Haverá obrigação de reparar o dano independentemente de culpa quando:", options: { A: "O autor do dano for absolutamente incapaz.", B: "Se tratar de dano moral reflexo.", C: "A atividade normalmente desenvolvida pelo autor do dano implicar, por sua natureza, risco para os direitos de outrem.", D: "Houver exclusão de ilicitude por estado de necessidade." } },
          { id: 503, title: "QUESTÃO 3", status: "pending", correctAnswer: "A", text: "No regime da comunhão parcial de bens, comunicam-se:", options: { A: "Os bens adquiridos na constância do casamento por título oneroso.", B: "Os bens que cada cônjuge possuir ao casar.", C: "Os bens adquiridos por doação, sucessão ou sub-rogação.", D: "Os instrumentos de profissão, livros e equipamentos de trabalho." } },
          { id: 504, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "Aquele que possuir como sua área urbana de até 250 m², por cinco anos ininterruptos e sem oposição, utilizando-a para sua moradia, adquire-lhe o domínio, desde que:", options: { A: "Comprove justo título e boa-fé.", B: "Pague os impostos atrasados.", C: "Edifique uma construção de alvenaria no local.", D: "Não seja proprietário de outro imóvel urbano ou rural." } },
          { id: 505, title: "QUESTÃO 5", status: "pending", correctAnswer: "B", text: "Os contratantes são obrigados a guardar, assim na conclusão do contrato, como em sua execução, os princípios de:", options: { A: "Sigilo absoluto e lealdade.", B: "Probidade e boa-fé.", C: "Pacta sunt servanda em caráter absoluto e irrestrito.", D: "Inalterabilidade das cláusulas penais estipuladas." } }
        ] 
      },
      { 
        id: 'oab-3', status: 'locked', label: 'Direito Penal', 
        questions: [
          { id: 601, title: "QUESTÃO 1", status: "pending", correctAnswer: "B", text: "Ocorre o crime de feminicídio quando o homicídio é cometido contra a mulher por razões da condição de sexo feminino. Considera-se que há tais razões quando o crime envolve:", options: { A: "Qualquer discussão verbal prévia.", B: "Violência doméstica e familiar ou menosprezo à condição de mulher.", C: "Motivo fútil e utilização de arma branca.", D: "Fim de obtenção de vantagem financeira indevida." } },
          { id: 602, title: "QUESTÃO 2", status: "pending", correctAnswer: "A", text: "Subtrair coisa alheia móvel, para si ou para outrem, mediante grave ameaça ou violência a pessoa, configura o crime de:", options: { A: "Roubo.", B: "Furto Qualificado.", C: "Extorsão.", D: "Apropriação Indébita." } },
          { id: 603, title: "QUESTÃO 3", status: "pending", correctAnswer: "C", text: "O inquérito policial no Brasil possui, dentre outras, a seguinte característica:", options: { A: "Contraditório pleno e ampla defesa.", B: "Oralidade estrita.", C: "Natureza inquisitiva.", D: "Dispensa obrigatória de advogado na sua condução para todas as testemunhas." } },
          { id: 604, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "Constitui requisito básico e fundamental para a decretação da prisão preventiva (art. 312 do CPP):", options: { A: "A confissão formal do acusado.", B: "O clamor público e a repercussão do caso na mídia.", C: "A reincidência específica.", D: "A garantia da ordem pública, da ordem econômica, conveniência da instrução criminal ou asseguração da aplicação da lei penal." } },
          { id: 605, title: "QUESTÃO 5", status: "pending", correctAnswer: "C", text: "O recurso cabível contra a decisão que pronuncia o réu para julgamento pelo Tribunal do Júri é:", options: { A: "A Apelação.", B: "O Agravo em Execução.", C: "O Recurso em Sentido Estrito (RESE).", D: "Os Embargos Infringentes." } }
        ] 
      },
      { 
        id: 'oab-4', status: 'locked', label: 'Direito do Trabalho', 
        questions: [
          { id: 701, title: "QUESTÃO 1", status: "pending", correctAnswer: "A", text: "Para que seja configurado o vínculo empregatício (art. 3º da CLT), é imprescindível a presença cumulativa de:", options: { A: "Pessoalidade, onerosidade, não eventualidade e subordinação.", B: "Exclusividade, habitualidade e subordinação.", C: "Onerosidade, subordinação jurídica e exclusividade de prestação.", D: "Trabalho voluntário, habitualidade e diretividade patronal." } },
          { id: 702, title: "QUESTÃO 2", status: "pending", correctAnswer: "C", text: "A concessão das férias será participada ao empregado, por escrito, com antecedência de, no mínimo:", options: { A: "10 dias.", B: "15 dias.", C: "30 dias.", D: "45 dias." } },
          { id: 703, title: "QUESTÃO 3", status: "pending", correctAnswer: "B", text: "O trabalho noturno urbano é aquele executado entre as:", options: { A: "20 horas de um dia e as 6 horas do dia seguinte.", B: "22 horas de um dia e as 5 horas do dia seguinte.", C: "21 horas de um dia e as 5 horas do dia seguinte.", D: "18 horas de um dia e as 6 horas do dia seguinte." } },
          { id: 704, title: "QUESTÃO 4", status: "pending", correctAnswer: "D", text: "A ausência não justificada do empregado, de forma contínua, que caracteriza o abandono de emprego para fins de justa causa, é fixada pela jurisprudência em regra de:", options: { A: "5 dias.", B: "15 dias.", C: "20 dias.", D: "30 dias." } },
          { id: 705, title: "QUESTÃO 5", status: "pending", correctAnswer: "A", text: "O aviso prévio proporcional ao tempo de serviço garante ao empregado o direito a:", options: { A: "30 dias mínimos, acrescidos de 3 dias por ano completo de serviço na mesma empresa, até o limite de 90 dias.", B: "30 dias fixos, independentemente do tempo de serviço.", C: "15 dias mínimos, acrescidos de 5 dias por ano trabalhado.", D: "45 dias fixos para quem tiver mais de 5 anos de empresa." } }
        ] 
      },
      { 
        id: 'oab-5', status: 'locked', label: 'Simulado OAB Final', 
        questions: [
          { id: 801, title: "QUESTÃO 1 (Constitucional)", status: "pending", correctAnswer: "C", text: "A Ação Direta de Inconstitucionalidade (ADI) genérica, perante o STF, pode ser proposta pelos seguintes legitimados, EXCETO:", options: { A: "O Presidente da República.", B: "O Procurador-Geral da República.", C: "Prefeito de capital de Estado.", D: "O Conselho Federal da OAB." } },
          { id: 802, title: "QUESTÃO 2 (Tributário)", status: "pending", correctAnswer: "B", text: "Em respeito ao princípio da anterioridade nonagesimal, um tributo criado hoje só pode ser cobrado após 90 dias da publicação da lei. Não se sujeitam a essa regra (podem ser cobrados antes de 90 dias):", options: { A: "IPVA e IPTU.", B: "Imposto de Importação e Imposto de Exportação.", C: "ICMS e ISS.", D: "Imposto de Renda e Imposto sobre Grandes Fortunas." } },
          { id: 803, title: "QUESTÃO 3 (ECA)", status: "pending", correctAnswer: "A", text: "Para adoção, o Estatuto da Criança e do Adolescente exige que o adotante seja maior de 18 anos e que a diferença de idade entre ele e o adotando seja de, no mínimo:", options: { A: "16 anos.", B: "21 anos.", C: "10 anos.", D: "12 anos." } },
          { id: 804, title: "QUESTÃO 4 (Administrativo)", status: "pending", correctAnswer: "C", text: "Conforme alterações na Lei de Improbidade Administrativa, os atos de improbidade que causam lesão ao erário:", options: { A: "Admitem responsabilização na modalidade culposa.", B: "Não prescrevem em hipótese alguma.", C: "Exigem a comprovação de dolo específico para sua configuração.", D: "Podem ser punidos com pena de morte em tempo de guerra." } },
          { id: 805, title: "QUESTÃO 5 (Consumidor)", status: "pending", correctAnswer: "D", text: "O prazo decadencial para reclamar de vícios aparentes ou de fácil constatação em fornecimento de serviço e de produtos duráveis é de:", options: { A: "30 dias.", B: "45 dias.", C: "60 dias.", D: "90 dias." } },
          { id: 806, title: "QUESTÃO 6 (Empresarial)", status: "pending", correctAnswer: "B", text: "A ação de execução do cheque contra o emitente prescreve no prazo de:", options: { A: "3 meses contados da apresentação.", B: "6 meses contados da expiração do prazo de apresentação.", C: "1 ano contado da data de emissão.", D: "3 anos contados da recusa do pagamento." } },
          { id: 807, title: "QUESTÃO 7 (Processo Civil)", status: "pending", correctAnswer: "A", text: "O prazo geral para interposição do recurso de Apelação no Novo CPC é de:", options: { A: "15 dias úteis.", B: "10 dias úteis.", C: "15 dias corridos.", D: "30 dias úteis." } },
          { id: 808, title: "QUESTÃO 8 (Ambiental)", status: "pending", correctAnswer: "C", text: "A responsabilidade civil por danos ambientais no Brasil adota a teoria da responsabilidade:", options: { A: "Subjetiva com culpa presumida.", B: "Objetiva baseada na teoria do risco administrativo.", C: "Objetiva baseada na teoria do risco integral.", D: "Contratual estrita." } },
          { id: 809, title: "QUESTÃO 9 (Internacional)", status: "pending", correctAnswer: "A", text: "A respeito da extradição, a Constituição Federal brasileira estabelece que:", options: { A: "Nenhum brasileiro nato será extraditado.", B: "O brasileiro nato pode ser extraditado por crime de tráfico de drogas.", C: "O brasileiro naturalizado nunca será extraditado.", D: "Estrangeiros podem ser extraditados por crime político ou de opinião." } },
          { id: 810, title: "QUESTÃO 10 (Ética OAB)", status: "pending", correctAnswer: "D", text: "O exercício da profissão de advogado é incompatível (proibição total de atuar como advogado) com a função de:", options: { A: "Deputado Estadual.", B: "Senador da República.", C: "Vereador.", D: "Juiz ou membro do Ministério Público." } }
        ] 
      }
    ]
  },
  { id: 'locked-1', title: 'DIREITO CIVIL', isLocked: true, isGold: false },
  { id: 'locked-2', title: 'DIREITO PENAL', isLocked: true, isGold: false },
  { id: 'locked-3', title: 'DIREITO TRIBUTÁRIO', isLocked: true, isGold: false },
];

export default function DireiladderPage() {
  // ── ESTADOS DA PÁGINA ──
  const [courses, setCourses] = useState(initialCoursesData);
  const [activeCourse, setActiveCourse] = useState(null);
  
  // ── ESTADOS DO MODAL DE ATIVIDADE (QUIZ) ──
  const [activeActivity, setActiveActivity] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answersLog, setAnswersLog] = useState({});
  const [feedback, setFeedback] = useState(null);

  // ── ESTADO DO ALERTA CUSTOMIZADO ──
  const [customAlert, setCustomAlert] = useState(null);

  const handleCardClick = (course) => {
    if (!course.isLocked) {
      setActiveCourse(course);
    }
  };

  const handleStartActivity = (level) => {
    if (level.status === 'locked') return;

    if (level.status === 'completed' || !level.questions || level.questions.length === 0) {
      setCustomAlert({
        title: "Atividade Concluída!",
        message: `A etapa "${level.label}" já foi finalizada com sucesso. Avance para a próxima atividade disponível!`,
        isSuccess: false,
        isFinal: false
      });
      return;
    }

    setActiveActivity(level);
    setActiveQuestionIndex(0);
    setSelectedOption(null);
    setAnswersLog({});
    setFeedback(null);
  };

  const closeActivity = () => {
    setActiveActivity(null);
    setActiveQuestionIndex(0);
    setSelectedOption(null);
    setAnswersLog({});
    setFeedback(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target.className.includes('modal-overlay')) {
      closeActivity();
    }
  };

  const handleQuestionChange = (index) => {
    if (feedback) return;
    setActiveQuestionIndex(index);
    setSelectedOption(null);
  };

  const handleEnviar = () => {
    const currentQ = activeActivity.questions[activeQuestionIndex];
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
      if (activeQuestionIndex < activeActivity.questions.length - 1) {
        // Avança para a próxima questão
        setActiveQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
      } else {
        // ---- PROGRESSO & CONCLUSÃO DA ATIVIDADE ----
        
        let targetLevelIndex = -1;
        let isLastLevel = false;
        
        // Atualiza a lista de cursos mantendo as trilhas individuais em sincronia
        const updatedCourses = courses.map(course => {
          if (course.id === activeCourse.id) {
            let newPathLevels = [...course.pathLevels];
            targetLevelIndex = newPathLevels.findIndex(l => l.id === activeActivity.id);
            isLastLevel = targetLevelIndex === newPathLevels.length - 1;

            newPathLevels[targetLevelIndex].status = 'completed';

            if (isLastLevel) {
              // Concluiu o Curso todo
              return { ...course, progress: 100, isGold: true, pathLevels: newPathLevels };
            } else {
              // Concluiu etapa intermediária
              if (targetLevelIndex + 1 < newPathLevels.length) {
                newPathLevels[targetLevelIndex + 1].status = 'current';
              }
              const completedCount = newPathLevels.filter(l => l.status === 'completed').length;
              const totalCount = newPathLevels.length;
              const newProgressPercent = Math.round((completedCount / totalCount) * 100);
              return { ...course, progress: newProgressPercent, pathLevels: newPathLevels };
            }
          }
          return course;
        });

        setCourses(updatedCourses);
        // Atualiza também a referência do curso ativo para a view da trilha
        const currentUpdatedCourse = updatedCourses.find(c => c.id === activeCourse.id);
        
        closeActivity();

        // NOVO: Dispara evento global de atividade concluída para a PageLayout escutar!
        window.dispatchEvent(new CustomEvent('activityCompleted'));

        if (isLastLevel) {
          setActiveCourse(null);
          // Volta para a tela inicial dos cards
          setCustomAlert({
            title: "CAPÍTULO CONCLUÍDO! 🏆",
            message: `Sensacional! Você dominou a Revisão Final de "${currentUpdatedCourse.title}". O capítulo está completo e coroado em ouro!`,
            isSuccess: true,
            isFinal: true
          });
        } else {
          setActiveCourse(currentUpdatedCourse);
          // Mantém na trilha, mas atualizado
          setCustomAlert({
            title: "Boa! Etapa Concluída! 🎉",
            message: `Você finalizou a etapa de "${activeActivity.label}" e seu progresso geral subiu para ${currentUpdatedCourse.progress}%!`,
            isSuccess: true,
            isFinal: false
          });
        }
      }
    }, 1500);
  };

  return (
    <>
      <style>{`
        /* ── ESTRUTURA BASE ── */
        .direiladder-page { padding: 40px 60px; min-height: 100vh; display: flex; flex-direction: column; font-family: "Montserrat", Arial, sans-serif; background-color: #f8f9fa; position: relative; }
        .content-wrapper { max-width: 1200px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; flex: 1; }
        .page-title { font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #000000; margin: 0 0 40px 0; text-transform: uppercase; }
        .title-accent { color: #a90000; }
        
        .main-board { background: #ffffff; flex: 1; border-radius: 6px; border: 1px solid #d4d4d4; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05); padding: 40px; }
        
        /* ── TELA DE CARDS (GRID) ── */
        .ladder-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 25px; align-content: start; }
        
        .ladder-card { background: #ffffff; border: 1px solid #dcdcdc; border-radius: 6px; height: 130px;
        padding: 15px 20px; display: flex; flex-direction: column; justify-content: center; box-shadow: 0 2px 6px rgba(0,0,0,0.04); transition: transform 0.2s, box-shadow 0.2s;
        position: relative; overflow: hidden; }
        .ladder-card:not(.locked) { cursor: pointer; justify-content: space-between; }
        .ladder-card:not(.locked):hover { transform: translateY(-3px); box-shadow: 0 6px 15px rgba(0,0,0,0.1); }
        .ladder-card.locked { align-items: center; cursor: not-allowed; }
        
        .card-header-title { color: #a90000; font-weight: 800; font-size: 16px; margin: 0; text-transform: uppercase; }
        
        .progress-track { width: 100%; height: 28px; border: 2px solid #8b0000; border-radius: 4px; background: #ffffff; display: flex; overflow: hidden; }
        .progress-fill { background: #a90000; height: 100%; display: flex; align-items: center; padding: 0 10px; color: #ffffff; font-weight: 700; font-size: 13px; transition: width 0.5s ease-in-out; }
        
        .lock-icon { color: #a90000; width: 32px; height: 32px; }

        /* ── CARD VERSÃO DOURADA (COMPLETADO) ── */
        .ladder-card.gold-complete {
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%);
          border: 2px solid #d97706;
          box-shadow: 0 4px 15px rgba(217, 119, 6, 0.15);
        }
        .ladder-card.gold-complete .card-header-title { color: #b45309; }
        .ladder-card.gold-complete .progress-track { border-color: #b45309; background: #fffdf5; }
        .ladder-card.gold-complete .progress-fill { background: linear-gradient(90deg, #d97706, #f59e0b); color: #fff; }
        .badge-gold { position: absolute; top: 12px; right: 15px; color: #d97706; }

        /* ── TELA DA TRILHA (DUOLINGO STYLE) ── */
        .path-view { display: flex; flex-direction: column; align-items: center; width: 100%; }
        
        .path-header { width: 100%; display: flex; align-items: center; justify-content: space-between; margin-bottom: 50px; padding-bottom: 20px; border-bottom: 1px solid #eee; }
        .btn-voltar { background: transparent; border: 2px solid #081724; color: #081724; padding: 8px 20px; border-radius: 4px; font-weight: 600; font-size: 13px; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: 0.2s; }
        .btn-voltar:hover { background: #081724; color: #ffffff; }
        .path-title { font-size: 20px; font-weight: 700; color: #081724; margin: 0; }
        
        .path-container { display: flex; flex-direction: column; align-items: center; width: 100%; max-width: 500px; position: relative; padding-bottom: 40px; }
        
        .path-node-wrapper { display: flex; flex-direction: column; align-items: center; margin-bottom: 35px; position: relative; z-index: 2; width: 100px; }
        
        .path-node-wrapper:nth-child(even) { transform: translateX(60px); }
        .path-node-wrapper:nth-child(odd) { transform: translateX(-60px); }
        .path-node-wrapper:first-child { transform: translateX(0px); }

        .path-node { width: 80px; height: 80px; border-radius: 50%; border: 5px solid; display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 8px 0 0; transition: all 0.1s; }
        
        .path-node:active:not(.locked) { transform: translateY(8px); box-shadow: 0 0 0 0 !important; }
        
        .node-completed { background: #facc15; border-color: #eab308; box-shadow: 0 8px 0 0 #ca8a04; }
        .node-current { background: #a90000; border-color: #8b0000; box-shadow: 0 8px 0 0 #5e0000; animation: bounce-slow 2s infinite; }
        .node-locked { background: #e5e7eb; border-color: #d1d5db; box-shadow: 0 8px 0 0 #9ca3af; cursor: not-allowed; }
        
        .node-label { margin-top: 15px; font-weight: 700; color: #555; font-size: 14px; text-align: center; white-space: nowrap; }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }

        /* ── MODAL DE ATIVIDADE (ESTILO SIMULADOS) ── */
        .modal-overlay { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; z-index: 1000; backdrop-filter: blur(2px); }
        
        .simulado-window { background: #ffffff; width: 90vw; max-width: 1100px; height: 80vh; border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,0.3); display: flex; flex-direction: column; overflow: hidden; animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .simulado-header-bar { padding: 20px 30px; border-bottom: 1px solid #e0e0e0; font-size: 14px; font-weight: 600; color: #4a4a4a; text-transform: uppercase; display: flex; justify-content: space-between; align-items: center; }
        .close-btn { background: none; border: none; font-size: 24px; font-weight: bold; cursor: pointer; color: #555; transition: 0.2s; }
        .close-btn:hover { color: #a90000; }

        .simulado-body { display: flex; flex: 1; overflow: hidden; }
        .simulado-sidebar { width: 260px; border-right: 1px solid #e0e0e0; padding: 20px; overflow-y: auto; background: #fafafa; }
        .question-item { display: flex; align-items: center; gap: 12px; padding: 12px 10px; border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; border-radius: 4px; }
        .question-item:hover, .question-item.active { background: #eef2f6; }
        
        .status-box { width: 20px; height: 20px; border-radius: 3px; border: 1px solid #ccc; flex-shrink: 0; transition: all 0.3s ease; }
        .status-correct { background: #1b633c; border-color: #1b633c; }
        .status-incorrect { background: #b01b1b; border-color: #b01b1b; }
        .status-pending { background: #ffffff; }
        
        .question-label { font-size: 13px; color: #444; font-weight: 600; }
        
        .simulado-content { flex: 1; padding: 40px 60px; display: flex; flex-direction: column; overflow-y: auto; }
        .question-title { font-size: 22px; font-weight: 800; color: #000; margin: 0 0 15px 0; }
        .question-text { font-size: 16px; color: #333; line-height: 1.6; margin-bottom: 30px; }
        
        .options-container { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; flex: 1; }
        .option-btn { background: #ffffff; border: 1px solid #dcdcdc; border-radius: 4px; padding: 16px 20px; text-align: left; font-family: inherit; font-size: 15px; color: #444; cursor: pointer; transition: all 0.2s; line-height: 1.5; }
        .option-btn:hover:not(.disabled) { border-color: #a90000; background: #fcf9f9; }
        .option-btn.selected { border-color: #a90000; background: #fff0f0; box-shadow: 0 0 0 1px #a90000; font-weight: 500; }
        .option-letter { font-weight: 800; margin-right: 10px; color: #a90000; }
        
        .btn-enviar-wrapper { display: flex; justify-content: flex-end; align-items: center; margin-top: 20px; padding-top: 20px; border-top: 1px solid #e0e0e0; }
        .feedback-msg { font-size: 14px; font-weight: 600; margin-right: 20px; animation: fadeIn 0.3s ease; }
        .feedback-success { color: #1b633c; }
        .feedback-error { color: #b01b1b; }
        @keyframes fadeIn { from { opacity: 0; transform: translateX(10px); } to { opacity: 1; transform: translateX(0); } }
        
        .btn-enviar { background: #081724; color: #ffffff; border: none; padding: 12px 35px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 2px; cursor: pointer; transition: background 0.2s; }
        .btn-enviar:hover:not(:disabled) { background: #1c2b44; }
        .btn-enviar:disabled { background: #a0a0a0; cursor: not-allowed; }

        /* ── POP-UP CUSTOMIZADO (ALERTA) ── */
        .custom-alert-box { background: #ffffff; width: 420px; max-width: 90%; border-radius: 8px; padding: 35px 30px; text-align: center; box-shadow: 0 15px 40px rgba(0,0,0,0.25); animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); display: flex; flex-direction: column; align-items: center; }
        .custom-alert-icon { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
        .custom-alert-icon.success { background: #e8f5e9; color: #1b633c; }
        .custom-alert-icon.gold-trophy { background: #fef3c7; color: #d97706; animation: pulse-gold 2s infinite; }
        .custom-alert-icon.info { background: #f3f4f6; color: #4b5563; }
        .custom-alert-title { font-size: 20px; font-weight: 800; color: #000; margin: 0 0 12px 0; }
        .custom-alert-msg { font-size: 15px; color: #555; line-height: 1.5; margin: 0 0 30px 0; }
        .btn-alert-ok { background: #081724; color: #ffffff; border: none; padding: 12px 40px; border-radius: 4px; font-size: 14px; font-weight: 600; letter-spacing: 1px; cursor: pointer; transition: background 0.2s; width: 100%; }
        .btn-alert-ok:hover { background: #1c2b44; }

        @keyframes pulse-gold {
          0%, 100% { box-shadow: 0 0 0 0 rgba(217, 119, 6, 0.4); }
          50% { box-shadow: 0 0 0 12px rgba(217, 119, 6, 0.0); }
        }
        @keyframes scaleIn { 0% { transform: scale(0.9); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
      `}</style>

      <div className="direiladder-page">
        <h1 className="page-title">DIRE<span className="title-accent">!</span>LADDER</h1>

        <div className="content-wrapper">
          <div className="main-board">
            
            {!activeCourse ? (
              
              /* ── VISÃO 1: GRID DE CARDS ── */
              <div className="ladder-grid">
                {courses.map((course) => (
                  <div
                    key={course.id}
                    onClick={() => handleCardClick(course)}
                    className={`ladder-card ${course.isLocked ? 'locked' : ''} ${course.isGold ? 'gold-complete' : ''}`}
                  >
                    {course.isLocked ? (
                      <>
                        <h2 className="card-header-title" style={{color: '#999'}}>{course.title}</h2>
                        <Lock className="lock-icon" style={{color: '#999', marginTop: '10px'}} />
                      </>
                    ) : (
                      <>
                        <h2 className="card-header-title">{course.title}</h2>
                        {course.isGold && <Trophy size={18} className="badge-gold" fill="currentColor" />}
                        <div className="progress-track">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${course.progress}%` }}
                          >
                            {course.progress}%
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

            ) : (

              /* ── VISÃO 2: TRILHA ESPECÍFICA DO CURSO SELECIONADO ── */
              <div className="path-view">
                <div className="path-header">
                  <button className="btn-voltar" onClick={() => setActiveCourse(null)}>
                    <ArrowLeft size={18} /> Voltar
                  </button>
                  <h2 className="path-title"> {activeCourse.title}</h2>
                  <div style={{ width: '100px' }}></div>
                </div>

                <div className="path-container">
                  {activeCourse.pathLevels?.map((level) => (
                    <div key={level.id} className="path-node-wrapper">
                      <button
                        onClick={() => handleStartActivity(level)}
                        className={`path-node node-${level.status} ${level.status === 'locked' ? 'locked' : ''}`}
                      >
                        {level.status === 'completed' && <Check size={36} color="white" strokeWidth={4} />}
                        {level.status === 'current' && <Star size={36} color="white" fill="white" />}
                        {level.status === 'locked' && <Play size={30} color="#9ca3af" fill="#9ca3af" style={{ marginLeft: '4px' }} />}
                      </button>
                      <span className="node-label">{level.label}</span>
                    </div>
                  ))}
                </div>
              </div>

            )}
          </div>
        </div>
      </div>

      {/* ── VISÃO 3: MODAL DE ATIVIDADE (ESTILO SIMULADOS) ── */}
      {activeActivity && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="simulado-window">
            
            <div className="simulado-header-bar">
              <span>TRILHA: {activeCourse?.title} | ETAPA: {activeActivity.label}</span>
              <button className="close-btn" onClick={closeActivity}>&times;</button>
            </div>
            
            <div className="simulado-body">
              {/* SIDEBAR DE QUESTÕES */}
              <div className="simulado-sidebar">
                {activeActivity.questions.map((q, index) => {
                  const status = answersLog[q.id] || q.status;
                  const isActive = index === activeQuestionIndex;
                  return (
                    <div 
                      key={q.id} 
                      className={`question-item ${isActive ? 'active' : ''}`}
                      onClick={() => handleQuestionChange(index)}
                    >
                      <div className={`status-box status-${status}`}></div>
                      <span className="question-label">{q.title}</span>
                    </div>
                  );
                })}
              </div>

              {/* CONTEÚDO DA QUESTÃO ATUAL */}
              <div className="simulado-content">
                {activeActivity.questions[activeQuestionIndex] && (
                  <>
                    <h2 className="question-title">
                      {activeActivity.questions[activeQuestionIndex].title}
                    </h2>
                    <p className="question-text">
                      {activeActivity.questions[activeQuestionIndex].text}
                    </p>

                    <div className="options-container">
                      {['A', 'B', 'C', 'D'].map((key) => {
                        const optionText = activeActivity.questions[activeQuestionIndex].options[key];
                        if (!optionText) return null;
                        return (
                          <button
                            key={key}
                            className={`option-btn ${selectedOption === key ? 'selected' : ''} ${feedback ? 'disabled' : ''}`}
                            onClick={() => !feedback && setSelectedOption(key)}
                            disabled={!!feedback}
                          >
                            <span className="option-letter">{key})</span> {optionText}
                          </button>
                        );
                      })}
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
                        disabled={!selectedOption || !!feedback}
                      >
                        ENVIAR
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── VISÃO 4: ALERTA CUSTOMIZADO (POPUPS BONITOS) ── */}
      {customAlert && (
        <div className="modal-overlay" style={{ zIndex: 2000 }}>
          <div className="custom-alert-box">
            <div className={`custom-alert-icon ${customAlert.isFinal ? 'gold-trophy' : customAlert.isSuccess ? 'success' : 'info'}`}>
              {customAlert.isFinal ? <Trophy size={32} fill="currentColor" /> : customAlert.isSuccess ? <Check size={32} strokeWidth={3} /> : <Check size={32} />}
            </div>
            <h3 className="custom-alert-title">{customAlert.title}</h3>
            <p className="custom-alert-msg">{customAlert.message}</p>
            <button className="btn-alert-ok" onClick={() => setCustomAlert(null)}>
              {customAlert.isFinal ? 'VOLTAR PROS MEUS ESTUDOS 🚀' : 'CONTINUAR'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}