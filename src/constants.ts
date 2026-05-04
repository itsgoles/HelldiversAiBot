
export const SHORT_QUESTIONS = [
  {
    id: "Q1",
    text: "Preferisco ingaggiare i nemici da lunga distanza piuttosto che affrontarli corpo a corpo.",
    type: "likert",
    options: [
      { value: "1", label: "Totalmente in disaccordo" },
      { value: "2", label: "In disaccordo" },
      { value: "3", label: "Neutrale" },
      { value: "4", label: "D'accordo" },
      { value: "5", label: "Totalmente d'accordo" }
    ]
  },
  {
    id: "Q2",
    text: "Qual è la tua priorità assoluta quando la missione diventa critica?",
    type: "multi",
    options: [
      { value: "obj", label: "Completare l'obiettivo principale a ogni costo" },
      { value: "samples", label: "Mettere in salvo i campioni raccolti" },
      { value: "mates", label: "Coprire la ritirata dei miei compagni" },
      { value: "stats", label: "Assicurarmi di avere il numero di kill più alto" },
      { value: "extract", label: "Chiamare l'estrazione e andarmene subito" }
    ]
  },
  {
    id: "Q3",
    text: "In combattimento, la sopravvivenza del singolo è meno importante della gloria di Super Terra.",
    type: "boolean",
    options: [
      { value: "true", label: "Vero" },
      { value: "false", label: "Falso" }
    ]
  },
  {
    id: "Q4",
    text: "Davanti a un nido di Terminidi di massa colossale, la tua prima reazione è:",
    type: "multi",
    options: [
      { value: "orbital", label: "Lanciare un attacco orbitale 380mm e godermi lo spettacolo" },
      { value: "eagle", label: "Chiamare un attacco Eagle mirato sulle tane" },
      { value: "grenade", label: "Avvicinarmi furtivamente per lanciare granate manuali" },
      { value: "turret", label: "Piazzare una torretta sentinella come diversivo" },
      { value: "bypass", label: "Segnalarlo sulla mappa e aggirarlo per risparmiare tempo" }
    ]
  },
  {
    id: "Q5",
    text: "Mi sento più efficace quando agisco come supporto logistico invece che sul fronte d'attacco.",
    type: "likert",
    options: [
      { value: "1", label: "Totalmente in disaccordo" },
      { value: "2", label: "In disaccordo" },
      { value: "3", label: "Neutrale" },
      { value: "4", label: "D'accordo" },
      { value: "5", label: "Totalmente d'accordo" }
    ]
  },
  {
    id: "Q6",
    text: "Quale di questi 'strumenti di libertà' preferiresti avere sempre con te?",
    type: "multi",
    options: [
      { value: "shield", label: "Zaino Generatore di Scudi (Protezione)" },
      { value: "supply", label: "Zaino di Rifornimento (Logistica)" },
      { value: "autocannon", label: "Autocannone (Versatilità)" },
      { value: "jump", label: "Zaino Reattivo (Mobilità)" },
      { value: "rover", label: "Drone 'Guard Dog' (Supporto automatico)" }
    ]
  },
  {
    id: "Q7",
    text: "Il fuoco amico è un costo accettabile per il progresso della democrazia.",
    type: "boolean",
    options: [
      { value: "true", label: "Vero" },
      { value: "false", label: "Falso" }
    ]
  },
  {
    id: "Q8",
    text: "Come descriveresti il tuo stile di comunicazione in missione?",
    type: "multi",
    options: [
      { value: "voice", label: "Uso costante della chat vocale per coordinare tutto" },
      { value: "ping", label: "Uso ossessivo dei ping sulla mappa e sui nemici" },
      { value: "text", label: "Scrivo ordini veloci via chat testuale" },
      { value: "silent", label: "Resto in silenzio e agisco con efficienza" },
      { value: "emote", label: "Comunico tramite emote e gesti eroici" }
    ]
  }
];

export const EXTENDED_QUESTIONS = [
  // ⚔️ ISTINTO DI COMBATTIMENTO
  { id: "EQ1", section: "combat", text: "Vedi una pattuglia nemica ignara della tua presenza:", type: "multi", options: [{value: "aggro", label: "Fuoco a volontà!"}, {value: "wait", label: "Attendo l'attimo"}, {value: "bypass", label: "Giro al largo"}, {value: "mark", label: "Segnalo ai compagni"}, {value: "strat", label: "Uso uno stratagemma"}] },
  { id: "EQ2", section: "combat", text: "Un Charger ti corre incontro:", type: "multi", options: [{value: "dodge", label: "Salto laterale dinamico"}, {value: "stand", label: "Tengo la posizione e sparo"}, {value: "impact", label: "Granata a impatto istantanea"}, {value: "rail", label: "Railgun sulla zampa"}, {value: "dive", label: "Tuffo disperato"}] },
  { id: "EQ3", section: "combat", text: "Il mio istinto mi porta sempre verso il centro della mischia.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ4", section: "combat", text: "Uso regolarmente il fuoco di soppressione per aiutare la squadra.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ5", section: "combat", text: "Reazione al segnale d'allarme nemico:", type: "multi", options: [{value: "push", label: "Attacco il nido/fabbrica subito"}, {value: "hold", label: "Difendo la posizione"}, {value: "retreat", label: "Mi sgancio e riposiziono"}, {value: "panic", label: "Sparo a caso"}, {value: "wait", label: "Nascondo e attendo"}] },
  { id: "EQ6", section: "combat", text: "Il corpo a corpo è una risorsa valida nel mio stile di gioco.", type: "likert", options: [{value: "1", label: "Fortemente contrario"}, {value: "2", label: "Poco convinto"}, {value: "3", label: "Neutrale"}, {value: "4", label: "Poco d'accordo"}, {value: "5", label: "Pienamente d'accordo"}] },
  { id: "EQ7", section: "combat", text: "Preferisco le granate a frammentazione rispetto a quelle tattiche.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  
  // 🗺️ GESTIONE DELLA MAPPA
  { id: "EQ8", section: "map", text: "Guardo la mini-mappa costantemente per tracciare i nemici.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ9", section: "map", text: "Segnali i campioni agli altri?", type: "multi", options: [{value: "always", label: "Sempre, priorità assoluta"}, {value: "sometimes", label: "Se sono vicini"}, {value: "pick", label: "Li prendo e basta"}, {value: "rare", label: "Raramente"}, {value: "never", label: "Ognuno per sé"}] },
  { id: "EQ10", section: "map", text: "Atterraggio ideale:", type: "multi", options: [{value: "hot", label: "Centro della mischia"}, {value: "safe", label: "Bordo mappa tranquillo"}, {value: "obj", label: "Direttamente sull'obiettivo"}, {value: "med", label: "Zona a rischio medio"}, {value: "high", label: "Punto elevato"}] },
  { id: "EQ11", section: "map", text: "Riesco a orientarmi facilmente anche senza l'HUD.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ12", section: "map", text: "Quanto è importante deviare per un punto d'interesse?", type: "likert", options: [{value: "1", label: "Inutile"}, {value: "2", label: "Poco importante"}, {value: "3", label: "Neutrale"}, {value: "4", label: "Molto importante"}, {value: "5", label: "Fondamentale"}] },
  { id: "EQ13", section: "map", text: "Se vedi un punto d'interesse lontano:", type: "multi", options: [{value: "go", label: "Deviazione immediata"}, {value: "ignore", label: "Dritto all'obiettivo"}, {value: "mark", label: "Segnalo e lo faremo dopo"}, {value: "team", label: "Chiedo alla squadra"}, {value: "solo", label: "Ci vado da solo"}] },
  
  // 🛡️ STILE DI SOPRAVVIVENZA
  { id: "EQ14", section: "survival", text: "Quando usi uno stimolante?", type: "multi", options: [{value: "small", label: "Al primo graffio per la stamina"}, {value: "mid", label: "Sotto il 50% HP"}, {value: "late", label: "Quasi morto"}, {value: "regen", label: "Solo per rigenerare stamina"}, {value: "fear", label: "Appena sento dolore"}] },
  { id: "EQ15", section: "survival", text: "Cerco sempre una copertura prima di sparare.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ16", section: "survival", text: "Il tuffo è la mia manovra difensiva principale.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ17", section: "survival", text: "Preferenza armatura:", type: "multi", options: [{value: "light", label: "Velocità è vita"}, {value: "medium", label: "Bilanciamento perfetto"}, {value: "heavy", label: "Carro armato umano"}, {value: "padded", label: "Imbottita per esplosioni"}, {value: "medic", label: "Kit medico per stim"}] },
  { id: "EQ18", section: "survival", text: "Preferisco morire pur di completare una task rischiosa.", type: "likert", options: [{value: "1", label: "Assolutamente no"}, {value: "2", label: "Probabilmente no"}, {value: "3", label: "Forse"}, {value: "4", label: "Sì"}, {value: "5", label: "Senza dubbio"}] },
  { id: "EQ19", section: "survival", text: "Gestione delle ferite agli arti:", type: "multi", options: [{value: "fix", label: "Curo subito"}, {value: "carryon", label: "Continuo finché posso mirare"}, {value: "ignore", label: "Non bado al dolore"}, {value: "panic", label: "Vado nel panico"}, {value: "help", label: "Chiedo aiuto"}] },
  { id: "EQ20", section: "survival", text: "So esattamente quanti danni posso subire prima di morire.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },

  // 🔫 FILOSOFIA DELLE ARMI
  { id: "EQ21", section: "weapons", text: "Arma primaria preferita:", type: "multi", options: [{value: "ar", label: "Fucile d'assalto"}, {value: "shotgun", label: "Fucile a pompa"}, {value: "energy", label: "Arma a energia"}, {value: "marksman", label: "Precisione"}, {value: "explosive", label: "Esplosiva"}] },
  { id: "EQ22", section: "weapons", text: "Rapporto con gli stratagemmi:", type: "multi", options: [{value: "god", label: "Amo i grandi botti"}, {value: "tool", label: "Utility per i problemi"}, {value: "last", label: "Uso prima il mio fucile"}, {value: "coop", label: "Solo se aiutano il team"}, {value: "meta", label: "Solo i più forti"}] },
  { id: "EQ23", section: "weapons", text: "Sostituisco spesso l'arma primaria con quelle trovate a terra.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ24", section: "weapons", text: "Conosco i tempi di ricarica di ogni mia arma a memoria.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ25", section: "weapons", text: "Uso delle armi di supporto:", type: "multi", options: [{value: "high", label: "È la mia arma principale"}, {value: "med", label: "Per nemici specifici"}, {value: "low", label: "Raramente la chiamo"}, {value: "ammo", label: "Solo se ho munizioni"}, {value: "rare", label: "Quasi mai"}] },
  { id: "EQ26", section: "weapons", text: "La precisione è più importante del volume di fuoco.", type: "likert", options: [{value: "1", label: "Falso, serve piombo"}, {value: "2", label: "Poco d'accordo"}, {value: "3", label: "Neutrale"}, {value: "4", label: "D'accordo"}, {value: "5", label: "Fondamentale"}] },
  { id: "EQ27", section: "weapons", text: "Preferisco armi con munizioni infinite (calore).", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },

  // 🤝 DINAMICHE DI SQUADRA
  { id: "EQ28", section: "team", text: "Un compagno cade:", type: "multi", options: [{value: "instareinforce", label: "Rinforzo immediato"}, {value: "saferheinforce", label: "Pulisco l'area e poi rinforzo"}, {value: "wait", label: "Aspetto che qualcun altro lo faccia"}, {value: "far", label: "Lo lancio verso l'obiettivo"}, {value: "equip", label: "Lo lancio sui suoi vecchi drop"}] },
  { id: "EQ29", section: "team", text: "Il lavoro di squadra è l'unica via per la vittoria alle alte difficoltà.", type: "likert", options: [{value: "1", label: "Disaccordo totale"}, {value: "2", label: "Poco d'accordo"}, {value: "3", label: "Neutrale"}, {value: "4", label: "D'accordo"}, {value: "5", label: "Pienamente d'accordo"}] },
  { id: "EQ30", section: "team", text: "Condivido volentieri i miei zaini con i compagni.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ31", section: "team", text: "Coordini gli attacchi orbitali?", type: "multi", options: [{value: "yes", label: "Avviso sempre prima di lanciare"}, {value: "ping", label: "Metto solo un segnale"}, {value: "no", label: "Dovrebbero guardare il cielo"}, {value: "chat", label: "Uso la chat vocale"}, {value: "voice", label: "Solo se serve"}] },
  { id: "EQ32", section: "team", text: "Seguo sempre il leader del team senza pormi domande.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "Spesso"}, {value: "4", label: "Sì"}, {value: "5", label: "Ciecamente"}] },
  
  // 🧠 MENTALITÀ E APPRENDIMENTO
  { id: "EQ33", section: "mind", text: "Analisi di fine missione:", type: "multi", options: [{value: "stats", label: "Guardo attentamente i numeri"}, {value: "experience", label: "Rifletto su cosa è andato storto"}, {value: "next", label: "Prossima missione subito"}, {value: "fun", label: "Mi godo i momenti epici"}, {value: "rank", label: "Guardo solo XP/Livelli"}] },
  { id: "EQ34", section: "mind", text: "Dedico tempo a studiare i punti deboli dei nuovi nemici.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ35", section: "mind", text: "Accetto il fallimento come parte del processo di addestramento.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ36", section: "mind", text: "Quanto segui il 'Meta'?", type: "multi", options: [{value: "full", label: "Solo le build migliori"}, {value: "hybrid", label: "Personalizzo le idee famose"}, {value: "fun", label: "Uso quello che mi diverte"}, {value: "random", label: "Vado a caso"}, {value: "role", label: "Seguo il mio ruolo"}] },
  { id: "EQ37", section: "mind", text: "Sperimento regolarmente nuove combinazioni di stratagemmi.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Raramente"}, {value: "3", label: "A volte"}, {value: "4", label: "Spesso"}, {value: "5", label: "Sempre"}] },
  { id: "EQ38", section: "mind", text: "Preferisco missioni corte a quelle lunghe e complesse.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },

  // 🎭 IDENTITÀ DA HELLDIVER
  { id: "EQ39", section: "identity", text: "Cos'è per te la Democrazia?", type: "multi", options: [{value: "everything", label: "La mia vita per Super Terra"}, {value: "job", label: "Un dovere necessario"}, {value: "chaos", label: "L'occasione per far esplodere cose"}, {value: "right", label: "Un diritto inalienabile"}, {value: "joke", label: "Una bella scusa per sparare"}] },
  { id: "EQ40", section: "identity", text: "Il mio nome sarà ricordato negli annali della storia galattica.", type: "likert", options: [{value: "1", label: "Assolutamente no"}, {value: "2", label: "Probabilmente no"}, {value: "3", label: "Forse"}, {value: "4", label: "Sì"}, {value: "5", label: "Certamente"}] },
  { id: "EQ41", section: "identity", text: "Uso sempre lo stesso set estetico (mantello/elmo) per identità.", type: "boolean", options: [{value: "true", label: "Vero"}, {value: "false", label: "Falso"}] },
  { id: "EQ42", section: "identity", text: "Rapporto con le Emote:", type: "multi", options: [{value: "always", label: "Saluto sopra ogni cadavere"}, {value: "rare", label: "Solo all'estrazione"}, {value: "never", label: "Tempo sprecato"}, {value: "fire", label: "Abbraccio nel fuoco"}, {value: "victory", label: "Gesto di vittoria"}] },
  { id: "EQ43", section: "identity", text: "Sacrificherei volentieri un compagno per il bene della missione.", type: "likert", options: [{value: "1", label: "Mai"}, {value: "2", label: "Difficilmente"}, {value: "3", label: "Forse"}, {value: "4", label: "Probabilmente"}, {value: "5", label: "Se necessario"}] },
  { id: "EQ44", section: "identity", text: "Perché combatti?", type: "multi", options: [{value: "glory", label: "Per la gloria eterna"}, {value: "peace", label: "Per portare la pace"}, {value: "fun", label: "Per lo sballo del combattimento"}, {value: "vengeance", label: "Per vendicare i caduti"}, {value: "coins", label: "Per i crediti super"}] },
  { id: "EQ45", section: "identity", text: "Sei pronto a versare di nuovo il tuo sangue per Super Terra?", type: "boolean", options: [{value: "true", label: "Sì, sempre!"}, {value: "false", label: "Ho già dato troppo"}] },
];

export const ARCHETYPES = [
  {
    id: "stealth",
    name: "Guerriero Fantasma",
    description: "Un'ombra sul campo. Usa armature leggere con il perk 'Scout' per ridurre il raggio di rilevamento nemico. Colpisce obiettivi chiave come i Radio Jammer o i Tactical Objectives e svanisce prima che scatti l'allarme.",
    icon: "Ghost",
    strengths: ["Infiltrazione solitaria", "Risparmio di munizioni", "Focus obiettivi tattici"],
    weaknesses: ["Scontri frontali", "Difese statiche", "Fiamme/Gas"]
  },
  {
    id: "tank",
    name: "Martello d'Acciaio",
    description: "Il bastione della democrazia. Equipaggia armature pesanti con 'Fortified' per resistere alle esplosioni. Avanza frontalmente verso i Devastator e i Charger, attirando il fuoco mentre la squadra manovra.",
    icon: "Hammer",
    strengths: ["Resistenza esplosiva", "Controllo della folla", "Leadership d'assalto"],
    weaknesses: ["Mobilità ridotta", "Consumo rapido di stimolanti"]
  },
  {
    id: "sniper",
    name: "Angelo Custode",
    description: "Precisione chirurgica da distanze siderali. Utilizza il fucile AMR o il Railgun per eliminare Berserker e Hulk prima che raggiungano la squadra. Fondamentale per abbattere le navette di trasporto Automaton.",
    icon: "Eye",
    strengths: ["Precisione letale", "Rimozione bersagli prioritari", "Supporto a lungo raggio"],
    weaknesses: ["Vulnerabilità ravvicinata", "Velocità di puntamento"]
  },
  {
    id: "support",
    name: "Pillar Galattico",
    description: "Il cuore logistico. Porta lo zaino di rifornimenti e lo scudo balistico. Garantisce che le 'Support Weapons' dei compagni siano sempre cariche e che la squadra possa resistere a assedi prolungati.",
    icon: "LifeBuoy",
    strengths: ["Logistica vitale", "Coordinamento squadra", "Gestione munizioni"],
    weaknesses: ["Dipendenza dai compagni", "Potenza d'attacco individuale"]
  },
  {
    id: "leader",
    name: "Voce del Comando",
    description: "Stratega calmo. Coordina l'uso degli stratagemmi 'Eagle' e 'Orbital' per massimizzare l'efficacia senza sprecare cooldown. Legge la mappa per anticipare i movimenti dei gruppi di pattuglia.",
    icon: "Mic2",
    strengths: ["Ottimizzazione stratagemmi", "Visione globale", "Efficacia tattica"],
    weaknesses: ["Esposizione durante l'uso mappa", "Focus prioritario nemico"]
  },
  {
    id: "pyro",
    name: "Piromane della Giustizia",
    description: "Specialista nel controllo delle masse Terminidi. Usa il lanciafiamme 'Incinerator' per negare varchi e bruciare sciami di Hunters. Purifica il terreno in nome della libertà.",
    icon: "Flame",
    strengths: ["Danno ad area costante", "Controllo dei varchi", "Efficacia anti-Terminide"],
    weaknesses: ["Pericolo fuoco amico", "Inefficace contro Automaton pesanti"]
  },
  {
    id: "demolition",
    name: "Specialista Demolizioni",
    description: "Se ha una corazza, lui ha il calibro giusto. Equipaggia EAT-17 o Spear per abbattere Titan e Drop Ships. Distrugge fabbriche e nidi con precisione esplosiva.",
    icon: "Bomb",
    strengths: ["Danno anti-tank massiccio", "Distruzione strutture", "Affidabilità"],
    weaknesses: ["Tempi di ricarica/armamento", "Poca mobilità durante il fuoco"]
  }
];

export const STRATEGIES = [
  {
    target: "Terminidi (Insetti)",
    tips: [
      "Concentra il fuoco sulle zampe dei Charger per rompere la corazza.",
      "Usa armi con danno da fuoco o gas per gestire le ondate di Scavengers e Hunters.",
      "Mantieni sempre la distanza dai Bile Titans; usa attacchi orbitali pesanti sopra la loro testa."
    ]
  },
  {
    target: "Automaton (Robot)",
    tips: [
      "Le armi a energia o con penetrazione media sono essenziali contro i Devastator.",
      "Mira ai dissipatori di calore rossi sul retro di Hulk e carri armati.",
      "Cerca sempre copertura solida; i proiettili sparati dai robot non si fermano con la sola agilità."
    ]
  },
  {
    target: "Illuminate (Alieni)",
    tips: [
      "Usa scudi energetici personali per contrastare le manipolazioni psioniche.",
      "Le armi ad arco o elettroniche sovraccaricano efficacemente i loro sistemi di difesa.",
      "Identifica e distruggi i generatori di portali non appena appaiono sulla mappa."
    ]
  },
  {
    target: "Gestione Globale",
    tips: [
      "La comunicazione è l'arma più potente. Usa il ping per segnalare campioni e minacce pesanti.",
      "Non ingaggiare ogni pattuglia che vedi; il silenzio spesso salva più vite dei proiettili.",
      "L'evacuazione è il premio, non il cuore della missione. Completa gli obiettivi e raccogli i campioni prima di tutto."
    ]
  }
];

export type Build = {
  name: string;
  primary: string;
  secondary: string;
  grenade: string;
  armorType: string;
  armorReason: string;
  stratagems: string[];
  booster: string;
  situation: string;
  gamePlan: string;
};

export const BUILDS: Record<string, Build[]> = {
  stealth: [
    {
      name: "Predatore Silenzioso",
      primary: "R-36 Eruptor o SG-8S Punisher Plasma",
      secondary: "P-19 Redeemer",
      grenade: "Stordente (G-23)",
      armorType: "Leggera (con perk Scout)",
      armorReason: "Massima velocità e riduzione del raggio di rilevamento nemico.",
      stratagems: ["Laser Orbitale", "Scudo a Zaino", "Cannone a Rotaia", "Attacco di Precisione Orbitale"],
      booster: "Ottimizzazione Spazio Stamina",
      situation: "Ottima per infiltrazioni solitarie contro Automaton o colpi chirurgici contro Terminidi.",
      gamePlan: "Usa i radar per evitare pattuglie. Distruggi gli obiettivi da lontano e usa lo scudo per evacuare in sicurezza se rilevato."
    }
  ],
  tank: [
    {
      name: "Baluardo della Democrazia",
      primary: "SG-225 Breaker o Breaker Incendiario",
      secondary: "P-4 Senator",
      grenade: "Incendiaria (G-10)",
      armorType: "Pesante (con perk Imbottitura Extra)",
      armorReason: "Massima resistenza ai danni fisici ed esplosioni.",
      stratagems: ["Autocannone", "Torretta Gatling", "Sbarramento 380mm", "Zaino con Generatore di Scudi"],
      booster: "Potenziamento Salute",
      situation: "Ideale per missioni di difesa o per reggere il fronte contro ondate Terminidi.",
      gamePlan: "Posizionati in punti elevati. Piazza le torrette e attira il fuoco nemico mentre la squadra completa gli obiettivi."
    }
  ],
  support: [
    {
      name: "Quartiermastro di Super Terra",
      primary: "AR-23P Liberator Penetrator",
      secondary: "P-2 Peacemaker",
      grenade: "Fumogena (G-3)",
      armorType: "Media (con perk Kit Medico)",
      armorReason: "Consente di trasportare più stimolanti per curare se stessi e i compagni.",
      stratagems: ["Zaino di Rifornimento", "Lancia-granate", "Sbarramento E.M.S. Orbitale", "Torretta Lanciarazzi"],
      booster: "Ottimizzazione Spazio Rifornimenti",
      situation: "Fondamentale in squadre coordinate a difficoltà alta.",
      gamePlan: "Resta nelle retrovie. Fornisci munizioni costanti e usa l'E.M.S. per rallentare le cariche nemiche più pesanti."
    }
  ],
  sniper: [
    {
      name: "Cecchino Galattico",
      primary: "R-63 Diligence Counter Sniper",
      secondary: "P-19 Redeemer",
      grenade: "Impatto (G-16)",
      armorType: "Leggera (con perk Servo-Assistito)",
      armorReason: "Lancio stratagemmi a distanza e alta velocità di fuga.",
      stratagems: ["Fucile d'Precisione (Supporto)", "Attaco Orbitale 120mm", "Torretta Mortaio E.M.S.", "Drone Rover"],
      booster: "Radar Migliorato",
      situation: "Perfetto per eliminare Devastator e comandanti Terminidi da distanza di sicurezza.",
      gamePlan: "Trova una posizione sopraelevata. Prioritizza bersagli medi. Usa il mortaio per il crowd control."
    }
  ],
  illuminate: [
    {
      name: "Epuratore Psionico",
      primary: "LAS-16 Sickle o PLAS-1 Scorchery",
      secondary: "LAS-7 Dagger",
      grenade: "Stordente (G-23)",
      armorType: "Media (con perk Resistenza Elettrica)",
      armorReason: "Protezione contro le armi ad arco e le interferenze energetiche aliene.",
      stratagems: ["Cannone a Quasar", "Torretta Tesla", "Scudo d'Energia", "Sbarramento E.M.S. Orbitale"],
      booster: "Ottimizzazione Rifornimenti",
      situation: "Ottimizzata per contrastare le barriere ed i trucchi mentali degli Illuminate.",
      gamePlan: "Mantieni la calma sotto fuoco psichico. Usa la Tesla per proteggere il perimetro e il Quasar per abbattere gli scudi pesanti."
    }
  ]
};

