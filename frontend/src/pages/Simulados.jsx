import React, { useState } from 'react';

// â”€â”€ Dados simulados dos Simulados (Mock) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const simuladosData = [
  { 
    id: 1, type: "Simulado Prova", date: "13/03", subject: "CiÃªncia Politica",
    questions: [
      { id: 1, title: "QUESTÃƒO 1", status: "pending", correctAnswer: "A", text: "Quais sÃ£o os trÃªs elementos fundamentais que constituem o Estado moderno?", options: { A: "TerritÃ³rio, Povo e Soberania.", B: "Governo, ExÃ©rcito e Leis.", C: "NaÃ§Ã£o, Cultura e ReligiÃ£o.", D: "Poder Legislativo, Executivo e JudiciÃ¡rio." } },
      { id: 2, title: "QUESTÃƒO 2", status: "pending", correctAnswer: "B", text: "No sistema Parlamentarista, como se divide a chefia do Poder Executivo?", options: { A: "O Presidente detÃ©m todo o poder.", B: "Chefia de Estado (Presidente/Monarca) e Chefia de Governo (Primeiro-Ministro).", C: "O JudiciÃ¡rio assume funÃ§Ãµes executivas.", D: "NÃ£o hÃ¡ divisÃ£o." } },
      { id: 3, title: "QUESTÃƒO 3", status: "pending", correctAnswer: "C", text: "Quem Ã© o autor da obra 'O EspÃ­rito das Leis' (1748), que consolidou a teoria da separaÃ§Ã£o dos poderes?", options: { A: "Thomas Hobbes.", B: "John Locke.", C: "BarÃ£o de Montesquieu.", D: "Jean-Jacques Rousseau." } },
      { id: 4, title: "QUESTÃƒO 4", status: "pending", correctAnswer: "B", text: "O conceito de 'Poliarquia', desenvolvido por Robert Dahl, caracteriza-se por:", options: { A: "ConcentraÃ§Ã£o total de poder.", B: "CombinaÃ§Ã£o de alta participaÃ§Ã£o polÃ­tica com alta competiÃ§Ã£o eleitoral.", C: "Governo dos aristocratas.", D: "AusÃªncia de instituiÃ§Ãµes estatais." } },
      { id: 5, title: "QUESTÃƒO 5", status: "pending", correctAnswer: "C", text: "Segundo a teoria aristotÃ©lica, qual Ã© a forma degenerada (corrompida) da Monarquia?", options: { A: "Democracia.", B: "Oligarquia.", C: "Tirania.", D: "Aristocracia." } },
      { id: 6, title: "QUESTÃƒO 6", status: "pending", correctAnswer: "A", text: "O 'Estado de Natureza' como uma 'guerra de todos contra todos' Ã© uma concepÃ§Ã£o atribuÃ­da a:", options: { A: "Thomas Hobbes.", B: "Karl Marx.", C: "Immanuel Kant.", D: "Max Weber." } },
      { id: 7, title: "QUESTÃƒO 7", status: "pending", correctAnswer: "B", text: "O sistema de 'Checks and Balances' (Freios e Contrapesos) serve primordialmente para:", options: { A: "Aumentar a arrecadaÃ§Ã£o.", B: "Garantir que nenhum poder se torne absoluto, mantendo limitaÃ§Ã£o mÃºtua.", C: "Dissolver o Congresso.", D: "Substituir a ConstituiÃ§Ã£o." } },
      { id: 8, title: "QUESTÃƒO 8", status: "pending", correctAnswer: "B", text: "Qual o principal marco teÃ³rico de Hans Kelsen para a CiÃªncia PolÃ­tica e o Direito?", options: { A: "O contrato social.", B: "A Teoria Pura do Direito e a hierarquia das normas.", C: "A luta de classes.", D: "A dominaÃ§Ã£o carismÃ¡tica." } },
      { id: 9, title: "QUESTÃƒO 9", status: "pending", correctAnswer: "B", text: "O que define um 'Estado DemocrÃ¡tico de Direito'?", options: { A: "Vontade da maioria sobre a lei.", B: "SubmissÃ£o Ã  ConstituiÃ§Ã£o e respeito aos direitos fundamentais.", C: "Governo militar.", D: "Leis criadas sÃ³ pelo Executivo." } },
      { id: 10, title: "QUESTÃƒO 10", status: "pending", correctAnswer: "B", text: "A soberania, elemento essencial do Estado, significa que:", options: { A: "O Estado depende de outros paÃ­ses.", B: "O poder estatal Ã© supremo na ordem interna e independente na ordem externa.", C: "O poder Ã© dividido com empresas.", D: "As leis nÃ£o se aplicam a estrangeiros." } }
    ]
  },
  { 
    id: 2, type: "Simulado Prova", date: "04/05", subject: "CiÃªncia Politica", 
    questions: [
      { id: 11, title: "QUESTÃƒO 1", status: "pending", correctAnswer: "B", text: "Na classificaÃ§Ã£o de Maquiavel, quais sÃ£o as duas formas fundamentais de governo?", options: { A: "Democracia e Aristocracia.", B: "Monarquia e RepÃºblica.", C: "Tirania e Oligarquia.", D: "Parlamentarismo e Presidencialismo." } },
      { id: 12, title: "QUESTÃƒO 2", status: "pending", correctAnswer: "C", text: "A forma de Estado na qual existe uma pluralidade de centros de poder polÃ­tico autÃ´nomos, unidos por uma ConstituiÃ§Ã£o rÃ­gida, denomina-se:", options: { A: "Estado UnitÃ¡rio.", B: "ConfederaÃ§Ã£o.", C: "Estado Federal.", D: "ImpÃ©rio." } },
      { id: 13, title: "QUESTÃƒO 3", status: "pending", correctAnswer: "A", text: "Em qual sistema de governo o Presidente da RepÃºblica acumula as funÃ§Ãµes tÃ­picas de Chefe de Estado e Chefe de Governo?", options: { A: "Presidencialismo.", B: "Parlamentarismo.", C: "Monarquia Constitucional.", D: "Diretorial." } },
      { id: 14, title: "QUESTÃƒO 4", status: "pending", correctAnswer: "C", text: "Para Jean-Jacques Rousseau, a soberania reside fundamentalmente e inalienavelmente:", options: { A: "No monarca.", B: "No parlamento.", C: "No povo (vontade geral).", D: "Na aristocracia dominante." } },
      { id: 15, title: "QUESTÃƒO 5", status: "pending", correctAnswer: "C", text: "Qual dos seguintes pensadores Ã© considerado o pai do liberalismo polÃ­tico, defendendo que os direitos Ã  vida, Ã  liberdade e Ã  propriedade sÃ£o direitos naturais?", options: { A: "Thomas Hobbes.", B: "Karl Marx.", C: "John Locke.", D: "Nicolau Maquiavel." } },
      { id: 16, title: "QUESTÃƒO 6", status: "pending", correctAnswer: "B", text: "Como o sociÃ³logo Max Weber define o Estado Moderno em sua teoria?", options: { A: "Uma associaÃ§Ã£o de classe voltada para a exploraÃ§Ã£o econÃ´mica.", B: "A comunidade humana que reivindica, com Ãªxito, o monopÃ³lio do uso legÃ­timo da forÃ§a fÃ­sica em um dado territÃ³rio.", C: "Um contrato social voltado exclusivamente Ã  proteÃ§Ã£o da propriedade privada.", D: "Uma instituiÃ§Ã£o puramente divina e irrefutÃ¡vel." } },
      { id: 17, title: "QUESTÃƒO 7", status: "pending", correctAnswer: "B", text: "No sistema eleitoral proporcional, frequentemente utilizado para eleiÃ§Ãµes legislativas (como para deputados e vereadores no Brasil), o objetivo principal Ã©:", options: { A: "Garantir que apenas o candidato mais votado tenha assento no parlamento.", B: "Refletir a pluralidade de votos e correntes de opiniÃ£o na distribuiÃ§Ã£o das cadeiras legislativas.", C: "Eliminar a influÃªncia de partidos polÃ­ticos minoritÃ¡rios.", D: "Escolher diretamente o Chefe do Poder Executivo." } },
      { id: 18, title: "QUESTÃƒO 8", status: "pending", correctAnswer: "B", text: "Segundo a doutrina moderna da separaÃ§Ã£o de poderes (inspirada em Montesquieu), uma funÃ§Ã£o ATÃPICA do Poder Legislativo Ã©:", options: { A: "A criaÃ§Ã£o ordinÃ¡ria de leis.", B: "O julgamento em casos especÃ­ficos (como em processos de impeachment).", C: "O veto parcial ou total de projetos de lei.", D: "O comando supremo das forÃ§as armadas." } },
      { id: 19, title: "QUESTÃƒO 9", status: "pending", correctAnswer: "C", text: "A transiÃ§Ã£o do Estado Liberal clÃ¡ssico para o Estado Social (Welfare State) no decorrer do sÃ©culo XX foi caracterizada pela:", options: { A: "AbstenÃ§Ã£o total do Estado nas relaÃ§Ãµes econÃ´micas e trabalhistas.", B: "EliminaÃ§Ã£o total da propriedade privada dos meios de produÃ§Ã£o.", C: "IntervenÃ§Ã£o ativa do Estado para garantir direitos sociais, econÃ´micos e trabalhistas essenciais.", D: "ConcentraÃ§Ã£o absoluta do poder polÃ­tico e econÃ´mico nas mÃ£os de um dÃ©spota." } },
      { id: 20, title: "QUESTÃƒO 10", status: "pending", correctAnswer: "A", text: "No contexto da Teoria Geral do Estado, a 'Soberania' Ã© classicamente caracterizada como um poder:", options: { A: "Uno, indivisÃ­vel, inalienÃ¡vel e imprescritÃ­vel.", B: "Dividido, alienÃ¡vel e de vigÃªncia temporÃ¡ria.", C: "Subordinado de forma absoluta Ã s leis e tratados internacionais sem direito de recusa.", D: "Exclusivo do Poder JudiciÃ¡rio, nÃ£o afetando os demais poderes." } }
    ]
  },
  { 
    id: 3, type: "QUIZ AULA", date: "04/05", subject: "CiÃªncia Politica", 
    questions: [
      { id: 21, title: "QUESTÃƒO 1", status: "pending", correctAnswer: "B", text: "Para Thomas Hobbes, a saÃ­da do caÃ³tico estado de natureza se dÃ¡ atravÃ©s da celebraÃ§Ã£o de um pacto que estabelece um soberano com poder absoluto. Qual o nome da obra mÃ¡xima onde ele expÃµe essa ideia?", options: { A: "O PrÃ­ncipe.", B: "O LeviatÃ£.", C: "O Contrato Social.", D: "Segundo Tratado sobre o Governo Civil." } },
      { id: 22, title: "QUESTÃƒO 2", status: "pending", correctAnswer: "C", text: "Na ciÃªncia polÃ­tica, como se diferencia o conceito de 'Estado' do conceito de 'NaÃ§Ã£o'?", options: { A: "SÃ£o sinÃ´nimos exatos utilizados para a mesma finalidade jurÃ­dica.", B: "NaÃ§Ã£o refere-se ao aparato jurÃ­dico-polÃ­tico e geogrÃ¡fico, e Estado apenas Ã  comunidade de indivÃ­duos.", C: "Estado Ã© a entidade jurÃ­dico-polÃ­tica (aparato de poder e territÃ³rio), enquanto NaÃ§Ã£o envolve identidade cultural, histÃ³rica e laÃ§os de pertencimento.", D: "O Estado nÃ£o possui territÃ³rio definido, enquanto a NaÃ§Ã£o obrigatoriamente sim." } },
      { id: 23, title: "QUESTÃƒO 3", status: "pending", correctAnswer: "A", text: "Qual a diferenÃ§a central e estrutural entre Democracia Direta e Democracia Representativa?", options: { A: "Na direta, o povo toma as decisÃµes polÃ­ticas sem intermediÃ¡rios; na representativa, elege mandatÃ¡rios para fazÃª-lo em seu nome.", B: "Apenas a democracia representativa Ã© legÃ­tima e permite o sufrÃ¡gio universal.", C: "A direta sÃ³ ocorre no sistema parlamentarista.", D: "NÃ£o hÃ¡ diferenÃ§a prÃ¡tica, pois as leis votadas sÃ£o idÃªnticas." } },
      { id: 24, title: "QUESTÃƒO 4", status: "pending", correctAnswer: "A", text: "No estudo das Formas de Estado, o que diferencia basicamente uma ConfederaÃ§Ã£o de uma FederaÃ§Ã£o?", options: { A: "Na ConfederaÃ§Ã£o, os Estados-membros mantÃªm sua soberania plena e o direito de secessÃ£o (separaÃ§Ã£o).", B: "Na FederaÃ§Ã£o nÃ£o hÃ¡ um documento constitucional, apenas tratados internacionais.", C: "ConfederaÃ§Ã£o Ã© o termo histÃ³rico para Estado UnitÃ¡rio Descentralizado.", D: "Na ConfederaÃ§Ã£o hÃ¡ um forte poder central irrevogÃ¡vel que submete os entes locais." } },
      { id: 25, title: "QUESTÃƒO 5", status: "pending", correctAnswer: "D", text: "A quem pertence juridicamente e politicamente a titularidade do 'Poder Constituinte OriginÃ¡rio', responsÃ¡vel por instituir uma nova ConstituiÃ§Ã£o em um Estado DemocrÃ¡tico?", options: { A: "Ao Congresso Nacional ou Parlamento em exercÃ­cio.", B: "Ã€s ForÃ§as Armadas da respectiva naÃ§Ã£o.", C: "Ao Chefe do Poder Executivo em exercÃ­cio.", D: "Ao Povo." } }
    ]
  },
  { 
    id: 4, type: "QUIZ AULA", date: "20/05", subject: "CiÃªncia Politica", 
    questions: [
      { id: 26, title: "QUESTÃƒO 1", status: "pending", correctAnswer: "A", text: "O que caracteriza o modelo de 'voto censitÃ¡rio', adotado nas primeiras constituiÃ§Ãµes liberais (como a do Brasil ImpÃ©rio em 1824)?", options: { A: "O direito ao voto era restrito apenas Ã queles que comprovassem um nÃ­vel mÃ­nimo de renda ou patrimÃ´nio.", B: "O voto era obrigatÃ³rio e universal para todas as pessoas maiores de 18 anos.", C: "O voto era baseado na escolaridade, restrito aos alfabetizados.", D: "Era o sistema em que o voto pertencia exclusivamente aos clÃ©rigos e militares." } },
      { id: 27, title: "QUESTÃƒO 2", status: "pending", correctAnswer: "B", text: "Segundo a taxonomia clÃ¡ssica aristotÃ©lica, a Oligarquia Ã© considerada o governo corrompido ou degenerado de qual das opÃ§Ãµes abaixo?", options: { A: "De um sÃ³ (degeneraÃ§Ã£o da Monarquia).", B: "De poucos (degeneraÃ§Ã£o da Aristocracia, visando ao interesse dos ricos).", C: "De muitos (degeneraÃ§Ã£o da Politeia, visando apenas Ã  maioria pobre).", D: "Dos militares (degeneraÃ§Ã£o do governo civil)." } },
      { id: 28, title: "QUESTÃƒO 3", status: "pending", correctAnswer: "D", text: "Embora facÃ§Ãµes existissem desde a antiguidade, o conceito estrutural de 'Partidos PolÃ­ticos' de massa ganhou forÃ§a fundamentalmente durante qual momento histÃ³rico?", options: { A: "Durante a RepÃºblica Romana e o Senado.", B: "Ao longo de toda a Idade MÃ©dia, com a disputa entre Reinos.", C: "No Renascimento, nas cidades-estado italianas.", D: "A partir do SÃ©culo XIX, com a expansÃ£o do sufrÃ¡gio e a solidificaÃ§Ã£o dos parlamentos modernos." } },
      { id: 29, title: "QUESTÃƒO 4", status: "pending", correctAnswer: "B", text: "Em um Estado DemocrÃ¡tico de Direito pautado na separaÃ§Ã£o dos poderes, Ã© correto afirmar que o Poder JudiciÃ¡rio deve ser institucionalmente:", options: { A: "Subordinado funcionalmente Ã s diretrizes e ordens do Presidente da RepÃºblica.", B: "Independente e imparcial, exercendo a funÃ§Ã£o jurisdicional sob o impÃ©rio da ConstituiÃ§Ã£o e da lei.", C: "Composto por magistrados eleitos pelo voto direto e secreto a cada dois anos.", D: "O principal responsÃ¡vel pela formulaÃ§Ã£o e execuÃ§Ã£o orÃ§amentÃ¡ria de polÃ­ticas pÃºblicas." } },
      { id: 30, title: "QUESTÃƒO 5", status: "pending", correctAnswer: "B", text: "Na dualidade das Formas de Governo, a caracterÃ­stica principal da RepÃºblica, em nÃ­tida oposiÃ§Ã£o ao modelo tradicional da Monarquia, Ã©:", options: { A: "A vitaliciedade, hereditariedade e irresponsabilidade polÃ­tica do Chefe de Estado.", B: "A eletividade, a temporariedade do mandato e a responsabilidade polÃ­tica do governante perante os governados.", C: "A ausÃªncia total de processos eleitorais regulares e pluripartidarismo.", D: "O fato de que o poder fica concentrado em um Primeiro-Ministro vitalÃ­cio." } }
    ]
  },
];

// â”€â”€ Banco de Dados Expandido do DicionÃ¡rio (4 Categorias x 10 Palavras) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const dicionarioData = [
  // LATIM
  { id: 1, term: "Habeas corpus", category: "latim", definition: "AÃ§Ã£o que protege a liberdade de locomoÃ§Ã£o de alguÃ©m que sofre ou Ã© ameaÃ§ada de prisÃ£o ilegal." },
  { id: 2, term: "A priori", category: "latim", definition: "Algo estabelecido por deduÃ§Ã£o ou suposiÃ§Ã£o antes da observaÃ§Ã£o ou experiÃªncia." },
  { id: 3, term: "Ad hoc", category: "latim", definition: "Criado ou nomeado especificamente para uma finalidade ou problema particular." },
  { id: 4, term: "Erga omnes", category: "latim", definition: "Significa 'contra todos'. Uma decisÃ£o ou lei que afeta e vale para todos os indivÃ­duos, nÃ£o apenas para as partes de um processo." },
  { id: 5, term: "QuÃ³rum", category: "latim", definition: "NÃºmero mÃ­nimo de pessoas exigido para que uma assembleia possa tomar decisÃµes vÃ¡lidas." },
  { id: 6, term: "Fumus boni iuris", category: "latim", definition: "A 'fumaÃ§a do bom direito'. Indica a probabilidade de que o direito alegado por alguÃ©m realmente exista, requisito para liminares." },
  { id: 7, term: "Ex tunc / Ex nunc", category: "latim", definition: "Ex tunc: Retroage, tem efeito desde a origem. Ex nunc: NÃ£o retroage, tem efeito apenas a partir da decisÃ£o para frente." },
  { id: 8, term: "Sine qua non", category: "latim", definition: "Uma condiÃ§Ã£o indispensÃ¡vel ou essencial para que algo aconteÃ§a." },
  { id: 9, term: "Ipso facto", category: "latim", definition: "Significa 'pelo prÃ³prio fato'. Algo que Ã© consequÃªncia direta e inevitÃ¡vel de um evento." },
  { id: 10, term: "Modus operandi", category: "latim", definition: "O mÃ©todo ou a maneira habitual como uma pessoa ou um grupo age para realizar algo." },

  // TERMOS JURÃDICOS (Gerais/Processuais)
  { id: 11, term: "JurisprudÃªncia", category: "juridico", definition: "O conjunto de decisÃµes e interpretaÃ§Ãµes adotadas repetidamente pelos juÃ­zes e tribunais." },
  { id: 12, term: "TrÃ¢nsito em julgado", category: "juridico", definition: "Quando uma decisÃ£o judicial se torna definitiva e nÃ£o aceita mais nenhum recurso." },
  { id: 13, term: "Medida Liminar", category: "juridico", definition: "Ordem provisÃ³ria e urgente do juiz para evitar danos irreparÃ¡veis antes do fim do processo." },
  { id: 14, term: "ApelaÃ§Ã£o", category: "juridico", definition: "O recurso usado para pedir que um tribunal superior revise a sentenÃ§a de um juiz de primeiro grau." },
  { id: 15, term: "ContraditÃ³rio", category: "juridico", definition: "PrincÃ­pio que garante Ã s partes o direito de responder e se defender de tudo o que for alegado contra elas no processo." },
  { id: 16, term: "SucumbÃªncia", category: "juridico", definition: "Quando a parte que perde o processo Ã© obrigada a pagar as custas processuais e os honorÃ¡rios do advogado da parte vencedora." },
  { id: 17, term: "Agravo de Instrumento", category: "juridico", definition: "Recurso contra decisÃµes urgentes do juiz no meio do processo (decisÃµes interlocutÃ³rias), antes da sentenÃ§a final." },
  { id: 18, term: "IntimaÃ§Ã£o / CitaÃ§Ã£o", category: "juridico", definition: "CitaÃ§Ã£o Ã© o ato de chamar alguÃ©m para se defender no processo pela primeira vez. IntimaÃ§Ã£o Ã© o aviso de atos seguintes do processo." },
  { id: 19, term: "PrecatÃ³rio", category: "juridico", definition: "Uma requisiÃ§Ã£o formal de pagamento que a JustiÃ§a faz para que o Governo pague uma dÃ­vida acima de um certo valor." },
  { id: 20, term: "PetiÃ§Ã£o Inicial", category: "juridico", definition: "O documento que dÃ¡ inÃ­cio a um processo, onde o autor apresenta seus fatos, fundamentos e pedidos ao juiz." },

  // DIREITO CIVIL
  { id: 21, term: "UsucapiÃ£o", category: "civil", definition: "A aquisiÃ§Ã£o da propriedade de um bem (mÃ³vel ou imÃ³vel) pelo fato de o indivÃ­duo ter a posse pacÃ­fica e contÃ­nua por um tempo estabelecido em lei." },
  { id: 22, term: "Dano Moral", category: "civil", definition: "A lesÃ£o aos direitos da personalidade de alguÃ©m (honra, imagem, intimidade) que gera o dever de indenizaÃ§Ã£o pecuniÃ¡ria." },
  { id: 23, term: "EvicÃ§Ã£o", category: "civil", definition: "Perda da posse ou propriedade de um bem adquirido legalmente, em virtude de uma decisÃ£o judicial que reconhece o direito anterior de outra pessoa." },
  { id: 24, term: "EspÃ³lio", category: "civil", definition: "O conjunto de bens, direitos e obrigaÃ§Ãµes (dÃ­vidas) deixados por uma pessoa falecida atÃ© que seja feita a partilha." },
  { id: 25, term: "ComoriÃªncia", category: "civil", definition: "A presunÃ§Ã£o jurÃ­dica de que duas pessoas morreram exatamente no mesmo instante, usada quando nÃ£o se sabe quem faleceu primeiro (importante para heranÃ§a)." },
  { id: 26, term: "Lucros Cessantes", category: "civil", definition: "Aquilo que a pessoa razoavelmente deixou de ganhar ou lucrar devido a um ato ilÃ­cito ou descumprimento de contrato por outra pessoa." },
  { id: 27, term: "Penhor", category: "civil", definition: "Dar um bem mÃ³vel (como joias) como garantia de pagamento de uma dÃ­vida. NÃ£o confundir com 'penhora', que Ã© apreensÃ£o judicial." },
  { id: 28, term: "MÃºtuo", category: "civil", definition: "Contrato de emprÃ©stimo de coisas que podem ser consumidas e substituÃ­das (ex: dinheiro), onde o recebedor deve devolver algo da mesma espÃ©cie e quantidade." },
  { id: 29, term: "Curatela / Tutela", category: "civil", definition: "Tutela Ã© para proteger e administrar bens de menores de idade. Curatela Ã© para maiores de idade incapacitados de reger a prÃ³pria vida (ex: por doenÃ§a grave)." },
  { id: 30, term: "Testamento Cerrado", category: "civil", definition: "Documento escrito em segredo pelo testador e entregue fechado a um tabeliÃ£o na presenÃ§a de testemunhas, sÃ³ sendo aberto apÃ³s a morte." },

  // DIREITO PENAL
  { id: 31, term: "Dolo e Culpa", category: "penal", definition: "Dolo: intenÃ§Ã£o consciente de cometer o crime. Culpa: nÃ£o hÃ¡ intenÃ§Ã£o de cometer o crime, mas ele ocorre por imprudÃªncia, negligÃªncia ou imperÃ­cia." },
  { id: 32, term: "Peculato", category: "penal", definition: "Crime no qual um funcionÃ¡rio pÃºblico se apropria ou desvia dinheiro, valor ou bem mÃ³vel (pÃºblico ou particular) do qual tem posse em razÃ£o do seu cargo." },
  { id: 33, term: "CorrupÃ§Ã£o Passiva / Ativa", category: "penal", definition: "Passiva: o funcionÃ¡rio pÃºblico solicita ou recebe vantagem indevida. Ativa: o cidadÃ£o comum oferece ou promete a vantagem ao funcionÃ¡rio pÃºblico." },
  { id: 34, term: "PrevaricaÃ§Ã£o", category: "penal", definition: "Crime em que o funcionÃ¡rio pÃºblico atrasa, deixa de fazer ou faz algo contra a lei para satisfazer um interesse ou sentimento pessoal." },
  { id: 35, term: "Excludente de Ilicitude", category: "penal", definition: "SituaÃ§Ãµes previstas em lei em que um ato que normalmente seria crime deixa de ser (ex: LegÃ­tima defesa e Estado de necessidade)." },
  { id: 36, term: "Estelionato", category: "penal", definition: "Obter vantagem ilÃ­cita para si ou para outro, causando prejuÃ­zo a alguÃ©m, atravÃ©s de engano, fraude ou 'golpe'." },
  { id: 37, term: "ReincidÃªncia", category: "penal", definition: "Quando um indivÃ­duo comete um novo crime depois de jÃ¡ ter uma condenaÃ§Ã£o com trÃ¢nsito em julgado por um crime anterior. Agrava a pena." },
  { id: 38, term: "CalÃºnia, DifamaÃ§Ã£o e InjÃºria", category: "penal", definition: "CalÃºnia: Acusar falsamente de um crime. DifamaÃ§Ã£o: Espalhar fato que ofende a reputaÃ§Ã£o. InjÃºria: Xingar ou ofender a dignidade da pessoa diretamente." },
  { id: 39, term: "Crime Hediondo", category: "penal", definition: "Crimes considerados de extrema gravidade (ex: latrocÃ­nio, estupro, homicÃ­dio qualificado). NÃ£o tÃªm direito a fianÃ§a, anistia ou graÃ§a." },
  { id: 40, term: "ConcussÃ£o", category: "penal", definition: "Crime em que o funcionÃ¡rio pÃºblico exige, para si ou para outro, vantagem indevida, valendo-se do seu cargo (espÃ©cie de extorsÃ£o estatal)." }
];

const monthNames = ["JANEIRO", "FEVEREIRO", "MARÃ‡O", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];

export default function SimuladosPage({ setActiveNav }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDictionaryOpen, setIsDictionaryOpen] = useState(false); 
  const [activeSimulado, setActiveSimulado] = useState(null);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); 
  const [selectedOption, setSelectedOption] = useState(null); 
  
  const [answersLog, setAnswersLog] = useState({}); 
  const [feedback, setFeedback] = useState(null);
  const [completedSimulados, setCompletedSimulados] = useState({}); 

  // â”€â”€ ESTADOS DO DICIONÃRIO JURÃDICO â”€â”€
  const [dictSearch, setDictSearch] = useState("");
  const [dictCategory, setDictCategory] = useState("latim"); 
  const [selectedTerm, setSelectedTerm] = useState(null);

  // â”€â”€ ESTADOS DO CALENDÃRIO / AGENDAMENTO â”€â”€
  const [currentDateView, setCurrentDateView] = useState(new Date(2026, 4, 1)); 
  const [provas, setProvas] = useState([
    { id: 1, subject: "CiÃªncia Politica", date: "04/05/26" },
    { id: 2, subject: "CiÃªncia Politica", date: "13/03/26" }
  ]);
  const [isAddingProva, setIsAddingProva] = useState(false);
  const [editingProvaId, setEditingProvaId] = useState(null);
  const [provaForm, setProvaForm] = useState({ subject: 'CiÃªncia Politica', date: '' });

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      setIsCalendarOpen(false);
      setIsDictionaryOpen(false);
      setActiveSimulado(null);
      setSelectedOption(null);
      setFeedback(null);
      setActiveQuestionIndex(0);
      setAnswersLog({});
      setSelectedTerm(null);
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
      message: isCorrect ? 'Resposta Correta! ðŸ‘' : 'Resposta Incorreta. ðŸ˜•',
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

  // â”€â”€ LÃ“GICA DO CALENDÃRIO & CRUD DE PROVAS â”€â”€
  const nextMonth = () => setCurrentDateView(new Date(currentDateView.getFullYear(), currentDateView.getMonth() + 1, 1));
  const prevMonth = () => setCurrentDateView(new Date(currentDateView.getFullYear(), currentDateView.getMonth() - 1, 1));

  const handleAddClick = () => {
    setIsAddingProva(true);
    setEditingProvaId(null);
    setProvaForm({ subject: 'CiÃªncia Politica', date: '' });
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

  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ''); 
    if (value.length > 6) {
      value = value.slice(0, 6); 
    }
    if (value.length >= 5) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}/${value.slice(4, 6)}`;
    } else if (value.length >= 3) {
      value = `${value.slice(0, 2)}/${value.slice(2, 4)}`;
    }
    setProvaForm({ ...provaForm, date: value });
  };

  // Filtragem dos termos do DicionÃ¡rio JurÃ­dico
  const filteredTerms = dicionarioData.filter(t => {
    const matchCategory = t.category === dictCategory;
    const matchSearch = t.term.toLowerCase().includes(dictSearch.toLowerCase());
    return matchCategory && matchSearch;
  });

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
            {isSimulado && simuladosDoDia.map(simulado => (
              <div key={`simulado-${simulado.id}`} className="tooltip-container">
                <span className="tag-simulado">SIMULADO</span>
                <span className="tooltip-text">{simulado.subject}</span>
              </div>
            ))}
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
        .simulados-page { box-sizing: border-box; padding: 40px 60px; height: 100%; display: flex; flex-direction: column; font-family: "Montserrat", Arial, sans-serif; background-color: #f8f9fa; position: relative; }
        .content-wrapper { max-width: 1200px; width: 100%; margin: 0 auto; display: flex; flex-direction: column; height: 100%; }
        .header-section { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; }
        .title-group { display: flex; align-items: center; gap: 30px; }
        .page-title { font-size: 24px; font-weight: 700; letter-spacing: 4px; color: #000000; margin: 0 0 25px 0; text-transform: uppercase; }
        .title-accent { color: #d90000; }
        
        /* BotÃµes perfeitamente alinhados na mesma linha */
        .nav-buttons-right { display: flex; align-items: center; gap: 15px; margin: 0; padding: 0; }
        .btn-header { box-sizing: border-box; background: #ffffff; font-family: inherit; font-size: 12px; font-weight: 600; letter-spacing: 1px; text-transform: uppercase; cursor: pointer; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center; height: 40px; margin: 0; transition: all 0.2s; vertical-align: middle; }
        .btn-agendar { border: 2px solid #1c2b44; color: #1c2b44; padding: 0 20px 0 15px; gap: 10px; width: 160px; }
        .btn-agendar:hover { background: #f0f2f5; }
        .btn-dicionario { border: 2px solid #1c2b44; color: #1c2b44; padding: 0 25px; }
        .btn-dicionario:hover { background: #f0f2f5; }
        .btn-aprendizado { border: 2px solid #1c2b44; color: #1c2b44; padding: 0 25px; }
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

        /* â”€â”€ MODAL DE AGENDAMENTO â”€â”€ */
        .agenda-modal { background: #ffffff; width: 950px; max-width: 95vw; height: 500px; border-radius: 6px; box-shadow: 0 15px 50px rgba(0,0,0,0.3); display: flex; overflow: hidden; font-family: "Montserrat", Arial, sans-serif; }
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
        .tag-simulado, .tag-prova { background: #a90000; color: white; font-size: 7px; padding: 3px 8px; border-radius: 3px; font-weight: 700; letter-spacing: 1px; width: fit-content; }
        .tag-prova-sub { background: #081724; width: 24px; height: 5px; border-radius: 3px; margin-top: 1px; }
        .tooltip-container { position: relative; display: flex; flex-direction: column; align-items: center; cursor: pointer; }
        .tooltip-text { visibility: hidden; background-color: #081724; color: #ffffff; text-align: center; border-radius: 4px; padding: 6px 10px; font-size: 9px; font-weight: 600; letter-spacing: 1px; position: absolute; z-index: 10; bottom: 110%; left: 50%; transform: translateX(-50%); white-space: nowrap; opacity: 0; transition: all 0.2s ease-in-out; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
        .tooltip-text::after { content: ""; position: absolute; top: 100%; left: 50%; margin-left: -4px; border-width: 4px; border-style: solid; border-color: #081724 transparent transparent transparent; }
        .tooltip-container:hover .tooltip-text { visibility: visible; opacity: 1; bottom: 130%; }

        /* â”€â”€ MODAL DICIONÃRIO JURÃDICO ATUALIZADO â”€â”€ */
        .dict-window { background: #ffffff; width: 1100px; max-width: 95vw; height: 600px; border-radius: 8px; border: 1px solid #b5b5b5; box-shadow: 0 10px 40px rgba(0,0,0,0.15); display: flex; padding: 40px; gap: 40px; position: relative; box-sizing: border-box; }
        
        .dict-left-panel { width: 300px; display: flex; flex-direction: column; box-sizing: border-box; }
        .dict-search-input { width: 100%; border: 1px solid #b5b5b5; border-radius: 6px; padding: 14px 16px; font-size: 14px; font-family: inherit; letter-spacing: 1px; color: #222; outline: none; box-sizing: border-box; margin-bottom: 20px; }
        .dict-search-input:focus { border-color: #1c2b44; }
        .dict-search-input::placeholder { color: #999; text-transform: uppercase; }
        
        /* Nova Coluna Flex para empilhar os botÃµes na esquerda */
        .dict-categories-flex { display: flex; flex-direction: column; gap: 10px; }
        .btn-dict-category { font-family: inherit; font-size: 13px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; border-radius: 6px; cursor: pointer; transition: all 0.2s; box-sizing: border-box; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 1.4; padding: 12px 10px; width: 100%; }
        .btn-dict-category.active { background: #081724; color: #ffffff; border: 2px solid #081724; box-shadow: 0 4px 10px rgba(8, 23, 36, 0.2); }
        .btn-dict-category.inactive { background: #ffffff; color: #081724; border: 2px solid #1c2b44; }
        .btn-dict-category.inactive:hover { background: #f0f4f8; }
        
        /* Painel Direito (Com position relative para o popup nascer SÃ“ AQUI) */
        .dict-right-panel { flex: 1; border: 1px solid #b5b5b5; border-radius: 6px; padding: 30px; overflow-y: auto; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; align-content: start; background: #ffffff; position: relative; box-sizing: border-box; }
        .dict-term-btn { background: #ffffff; border: 2px solid #1c2b44; color: #1c2b44; border-radius: 5px; font-family: inherit; font-size: 13px; font-weight: 600; text-align: center; padding: 15px 10px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; justify-content: center; min-height: 55px; box-sizing: border-box; }
        .dict-term-btn:hover { background: #1c2b44; color: #ffffff; }
        
        /* Pop-up fechado apenas no Card Direito */
        .explanation-box { position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255, 255, 255, 0.98); display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; animation: fadeIn 0.2s ease-out; border-radius: 5px; z-index: 10; box-sizing: border-box; }
        .explanation-term { font-size: 26px; font-weight: 800; color: #a90000; margin: 0 0 20px 0; letter-spacing: 1px; text-transform: uppercase; }
        .explanation-desc { font-size: 17px; color: #333; line-height: 1.6; max-width: 90%; margin-bottom: 30px; font-weight: 500; }
        .btn-close-explanation { background: #081724; color: #ffffff; border: none; font-family: inherit; font-size: 13px; font-weight: 600; letter-spacing: 2px; padding: 15px 40px; border-radius: 4px; cursor: pointer; transition: background 0.2s; }
        .btn-close-explanation:hover { background: #1c2b44; }

        @media (max-width: 1024px) {
  .simulados-page { padding: 30px 40px; }
  .main-board { grid-template-columns: repeat(2, 1fr); padding: 20px; }
  .simulado-body { flex-direction: column; }
  .simulado-sidebar { width: 100%; border-right: none; border-bottom: 1px solid #e0e0e0; display: flex; flex-direction: row; overflow-x: auto; padding: 15px; gap: 10px; }
  .question-item { padding: 8px 16px; border-bottom: none; border: 1px solid #e0e0e0; border-radius: 20px; white-space: nowrap; }
  .simulado-content { padding: 30px; }
  .agenda-modal { flex-direction: column; height: 85vh; overflow-y: auto; }
  .agenda-left { width: 100%; border-right: none; border-bottom: 1px solid #f0f0f0; padding: 25px; overflow-y: visible; }
  
  /* â”€â”€ RESPONSIVIDADE DO DICIONÃRIO (TABLET) â”€â”€ */
  /* MantÃ©m lado a lado de forma compacta para aproveitar o espaÃ§o horizontal */
  .dict-window { flex-direction: row; height: 85vh; padding: 25px; gap: 25px; }
  .dict-left-panel { width: 240px; height: 100%; border-right: 1px solid #e0e0e0; padding-right: 15px; }
  .dict-categories-flex { flex-direction: column; gap: 10px; }
  .btn-dict-category { width: 100%; text-align: left; }
  .dict-right-panel { grid-template-columns: repeat(2, 1fr); flex: 1; overflow-y: auto; }
}

@media (max-width: 768px) {
  .simulados-page { padding: 20px; }
  .header-section { flex-direction: column; gap: 15px; align-items: stretch; }
  .title-group { flex-direction: column; gap: 5px; align-items: center; }
  .page-title { margin-bottom: 10px; text-align: center; font-size: 20px; }
  .nav-buttons-right { flex-direction: column; width: 100%; gap: 10px; }
  .btn-header { width: 100% !important; }
  .main-board { grid-template-columns: 1fr; gap: 15px; padding: 15px; }
  .simulado-card, .placeholder-card { height: 150px; }
  .simulado-window { width: 95vw; height: 90vh; }
  .simulado-content { padding: 20px 15px; }
  .question-title { font-size: 18px; }
  .question-text { font-size: 15px; margin-bottom: 20px; }
  .option-btn { padding: 12px 15px; font-size: 14px; }
  .btn-enviar-wrapper { flex-direction: column; gap: 15px; align-items: center; }
  .btn-enviar { width: 100%; }
  .feedback-msg { margin-right: 0; text-align: center; }
  .cal-day-num { font-size: 11px; }
  .tag-simulado, .tag-prova { font-size: 8px; padding: 1px 3px; }
  
  /* â”€â”€ RESPONSIVIDADE DO DICIONÃRIO (MOBILE) â”€â”€ */
  /* Passa a ser coluna, mas com rolagem horizontal nas categorias para poupar tela */
  .dict-window { flex-direction: column; height: 90vh; width: 95vw; padding: 15px; gap: 15px; }
  .dict-left-panel { width: 100%; height: auto; border-right: none; border-bottom: 1px solid #e0e0e0; padding-bottom: 12px; }
  
  /* Cria uma trilha horizontal de pÃ­lulas deslizÃ¡veis por toque */
  .dict-categories-flex { 
    flex-direction: row !important; 
    overflow-x: auto; 
    white-space: nowrap; 
    padding-bottom: 4px;
    gap: 8px;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Oculta barra no Firefox */
  }
  .dict-categories-flex::-webkit-scrollbar { display: none; } /* Oculta barra no Chrome/Safari */
  
  .btn-dict-category { 
    width: auto !important; 
    flex: 0 0 auto !important; /* Impede que o botÃ£o encolha ou deforme */
    padding: 8px 16px; 
    border-radius: 20px; 
    font-size: 13px;
  }
  
  .dict-right-panel { 
    grid-template-columns: 1fr; 
    flex: 1; 
    overflow-y: auto; 
    padding-top: 5px;
  }
}
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

            {/* Grupo Alinhado Perfeitamente */}
            <div className="nav-buttons-right">
              <button 
                className="btn-header btn-dicionario"
                onClick={() => setIsDictionaryOpen(true)}
              >
                DICIONÃRIO JURÃDICO
              </button>
              <button 
                className="btn-header btn-aprendizado"
                onClick={() => setActiveNav(2)}
              >
                MEU APRENDIZADO
              </button>
            </div>
          </div>

          <div className="main-board">
            {simuladosData.map((item) => (
              <div key={item.id} className="simulado-card">
                <div className="card-header">
                  <p className="card-title">{item.type} - {item.date}</p>
                  <p className="card-subject">{item.subject}</p>
                  {completedSimulados[item.id] && (
                    <span className="card-performance">
                      {completedSimulados[item.id].correct}/{completedSimulados[item.id].total} Acertos
                    </span>
                  )}
                </div>
                <button
                  className="btn-iniciar"
                  onClick={() => {
                    setActiveSimulado(item);
                    setActiveQuestionIndex(0);
                    setSelectedOption(null);
                    setFeedback(null);
                    setAnswersLog({});
                  }}
                >
                  {completedSimulados[item.id] ? "REFAZER" : "INICIAR"}
                </button>
              </div>
            ))}

            {Array.from({ length: 4 }).map((_, index) => (
              <div key={`placeholder-${index}`} className="placeholder-card">
                <svg width="34" height="42" viewBox="0 0 24 30" fill="none">
                  <rect x="5" y="13" width="14" height="12" rx="2" fill="#eeeeee" />
                  <path d="M8 13V9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9V13" stroke="#eeeeee" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="18" r="1.5" fill="#bfbfbf" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {activeSimulado && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="simulado-window" onClick={(e) => e.stopPropagation()}>
            <div className="simulado-header-bar">
              {activeSimulado.type} - {activeSimulado.subject}
            </div>
            <div className="simulado-body">
              <aside className="simulado-sidebar">
                {activeSimulado.questions.map((question, index) => (
                  <div
                    key={question.id}
                    className={`question-item ${index === activeQuestionIndex ? 'active' : ''}`}
                    onClick={() => handleQuestionChange(index)}
                  >
                    <span className={`status-box status-${answersLog[question.id] || 'pending'}`}></span>
                    <span className="question-label">{question.title}</span>
                  </div>
                ))}
              </aside>

              <section className="simulado-content">
                <h2 className="question-title">{activeSimulado.questions[activeQuestionIndex].title}</h2>
                <p className="question-text">{activeSimulado.questions[activeQuestionIndex].text}</p>

                <div className="options-container">
                  {Object.entries(activeSimulado.questions[activeQuestionIndex].options).map(([letter, text]) => (
                    <button
                      key={letter}
                      className={`option-btn ${selectedOption === letter ? 'selected' : ''}`}
                      onClick={() => !feedback && setSelectedOption(letter)}
                      disabled={Boolean(feedback)}
                    >
                      <span className="option-letter">{letter}</span>
                      {text}
                    </button>
                  ))}
                </div>

                <div className="btn-enviar-wrapper">
                  {feedback && (
                    <span className={`feedback-msg ${feedback.isCorrect ? 'feedback-success' : 'feedback-error'}`}>
                      {feedback.message}
                    </span>
                  )}
                  <button className="btn-enviar" onClick={handleEnviar} disabled={!selectedOption || Boolean(feedback)}>
                    ENVIAR
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      )}

      {isCalendarOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="agenda-modal" onClick={(e) => e.stopPropagation()}>
            <aside className="agenda-left">
              <div className="agenda-title-wrapper">
                <h2 className="agenda-title">AGENDAR PROVA</h2>
              </div>

              <button className="btn-add-prova" onClick={handleAddClick}>+</button>

              {isAddingProva && (
                <div className="prova-form-card">
                  <div className="form-row-top">
                    <select
                      className="form-select"
                      value={provaForm.subject}
                      onChange={(e) => setProvaForm({ ...provaForm, subject: e.target.value })}
                    >
                      <option>Ciência Politica</option>
                      <option>Direito Constitucional</option>
                      <option>Teoria Geral do Processo</option>
                      <option>Filosofia do Direito</option>
                    </select>
                    <input
                      className="form-input"
                      placeholder="DD/MM/AA"
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
                    <button className="action-btn" onClick={() => handleEditClick(prova)}>Editar</button>
                    <button className="action-btn" onClick={() => handleDeleteClick(prova.id)}>Excluir</button>
                  </div>
                </div>
              ))}
            </aside>

            <section className="agenda-right">
              <div className="cal-header-bar">
                <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
                <div className="cal-title-block">
                  <h2 className="cal-month">{monthNames[currentDateView.getMonth()]}</h2>
                  <div className="cal-year">{currentDateView.getFullYear()}</div>
                </div>
                <button className="cal-nav-btn" onClick={nextMonth}>›</button>
              </div>

              <div className="cal-grid-headers">
                {['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'].map((day) => (
                  <span key={day} className="cal-header-day">{day}</span>
                ))}
              </div>
              <div className="cal-grid">{renderDays()}</div>
            </section>
          </div>
        </div>
      )}

      {isDictionaryOpen && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="dict-window" onClick={(e) => e.stopPropagation()}>
            <aside className="dict-left-panel">
              <input
                className="dict-search-input"
                placeholder="Pesquisar termo"
                value={dictSearch}
                onChange={(e) => setDictSearch(e.target.value)}
              />

              <div className="dict-categories-flex">
                {[
                  ['latim', 'Latim'],
                  ['juridico', 'Jurídico'],
                  ['civil', 'Direito Civil'],
                  ['penal', 'Direito Penal']
                ].map(([value, label]) => (
                  <button
                    key={value}
                    className={`btn-dict-category ${dictCategory === value ? 'active' : 'inactive'}`}
                    onClick={() => {
                      setDictCategory(value);
                      setSelectedTerm(null);
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </aside>

            <section className="dict-right-panel">
              {filteredTerms.map((term) => (
                <button key={term.id} className="dict-term-btn" onClick={() => setSelectedTerm(term)}>
                  {term.term}
                </button>
              ))}

              {selectedTerm && (
                <div className="explanation-box">
                  <h3 className="explanation-term">{selectedTerm.term}</h3>
                  <p className="explanation-desc">{selectedTerm.definition}</p>
                  <button className="btn-close-explanation" onClick={() => setSelectedTerm(null)}>
                    VOLTAR
                  </button>
                </div>
              )}
            </section>
          </div>
        </div>
      )}
    </>
  );
}
