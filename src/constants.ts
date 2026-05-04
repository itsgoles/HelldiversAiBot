
export const SHORT_QUESTIONS = [
  {
    id: "Q1",
    text: "Distanza preferita di ingaggio?",
    options: [
      { value: "corto", label: "Corto raggio (Sotto i 20 metri)" },
      { value: "medio", label: "Medio raggio (Controllo tattico)" },
      { value: "lungo", label: "Lungo raggio (Supporto a distanza)" }
    ]
  },
  {
    id: "Q2",
    text: "Approccio ai combattimenti?",
    options: [
      { value: "stealth", label: "Stealth / Raid rapidi" },
      { value: "aggressivo", label: "Aggressivo / Rush frontale" },
      { value: "metodico", label: "Controllo lento e metodico" }
    ]
  },
  {
    id: "Q3",
    text: "Focus principale in missione?",
    options: [
      { value: "obiettivi_principali", label: "Obiettivi principali" },
      { value: "obiettivi_secondari", label: "Obiettivi secondari / Nidi" },
      { value: "kill", label: "Farmare kill" },
      { value: "risorse", label: "Farmare campioni / Risorse" },
      { value: "major_orders", label: "Fare Major Orders" }
    ]
  },
  {
    id: "Q4",
    text: "Nemici preferiti o affrontati più spesso?",
    options: [
      { value: "terminidi", label: "Terminidi" },
      { value: "automaton", label: "Automaton" },
      { value: "illuminate", label: "Illuminate" },
      { value: "adattivo", label: "Mi adatto a ogni fronte" }
    ]
  },
  {
    id: "Q5",
    text: "Quale archetipo di ruolo ti rappresenta meglio?",
    options: [
      { value: "solitario", label: "Guerriero Fantasma (Solitario)" },
      { value: "entry", label: "Martello d'Acciaio (Entry-fragger)" },
      { value: "supporto", label: "Angelo Custode (Supporto/Utility)" },
      { value: "leader", label: "Voce del Comando (Shot caller/Leader)" }
    ]
  },
  {
    id: "Q6",
    text: "Tolleranza al rischio?",
    options: [
      { value: "prudente", label: "Preferisco non morire mai" },
      { value: "bilanciato", label: "Accetto qualche morte per il successo" },
      { value: "eroico", label: "Non mi importa di morire se faccio grandi giocate" }
    ]
  },
  {
    id: "Q7",
    text: "Livello di sfida?",
    options: [
      { value: "attuale", label: "Difficoltà media che gioco ora" },
      { value: "obiettivo", label: "Difficoltà a cui vorrei arrivare (Obiettivo)" }
    ]
  },
  {
    id: "Q8",
    text: "Tipo di squadra?",
    options: [
      { value: "random", label: "Matchmaking random" },
      { value: "amici", label: "Gruppo fisso con amici" },
      { value: "misto", label: "Misto" }
    ]
  }
];

export const EXTENDED_QUESTIONS = [
  // ⚔️ ISTINTO DI COMBATTIMENTO (1-7)
  { id: "EQ1", section: "combat", text: "Vedi una pattuglia nemica: cosa fai?", options: [{value: "aggro", label: "Fuoco a volontà!"}, {value: "wait", label: "Attendo l'attimo"}, {value: "bypass", label: "Giro al largo"}] },
  { id: "EQ2", section: "combat", text: "Un Charger ti corre incontro:", options: [{value: "dodge", label: "Salto laterale dinamico"}, {value: "stand", label: "Tengo la posizione e sparo"}, {value: "impact", label: "Granata a impatto istantanea"}] },
  { id: "EQ3", section: "combat", text: "Frequenza di uso dell'arma secondaria:", options: [{value: "high", label: "Sempre pronta all'uso"}, {value: "low", label: "Solo quando finisco il caricatore"}, {value: "utility", label: "Per situazioni specifiche"}] },
  { id: "EQ4", section: "combat", text: "Gestione del fuoco di soppressione:", options: [{value: "active", label: "Sparo per tenere i nemici giù"}, {value: "aimed", label: "Solo colpi mirati"}, {value: "none", label: "Preferisco pormi al riparo"}] },
  { id: "EQ5", section: "combat", text: "Reazione al segnale d'allarme nemico:", options: [{value: "push", label: "Attacco il nido/fabbrica subito"}, {value: "hold", label: "Difendo la posizione"}, {value: "retreat", label: "Mi sgancio e riposiziono"}] },
  { id: "EQ6", section: "combat", text: "Quanto ti affidi al corpo a corpo?", options: [{value: "desperate", label: "Solo se circondato"}, {value: "tactical", label: "Per liberare spazio"}, {value: "never", label: "Mantengo sempre la distanza"}] },
  { id: "EQ7", section: "combat", text: "Preferenza esplosivi:", options: [{value: "impact", label: "Esplosione immediata"}, {value: "timer", label: "Controllo del tempo"}, {value: "stun", label: "Blocco tattico"}] },
  // 🗺️ GESTIONE DELLA MAPPA (8-13)
  { id: "EQ8", section: "map", text: "Quanto guardi la mini-mappa?", options: [{value: "constant", label: "Ogni 5 secondi"}, {value: "frequent", label: "Spesso durante il viaggio"}, {value: "rare", label: "Solo se perso"}] },
  { id: "EQ9", section: "map", text: "Segnali i campioni agli altri?", options: [{value: "always", label: "Sempre, priorità assoluta"}, {value: "sometimes", label: "Se sono vicini"}, {value: "pick", label: "Li prendo e basta"}] },
  { id: "EQ10", section: "map", text: "Atterraggio ideale:", options: [{value: "hot", label: "Centro della mischia"}, {value: "safe", label: "Bordo mappa tranquillo"}, {value: "obj", label: "Direttamente sull'obiettivo"}] },
  { id: "EQ11", section: "map", text: "Radar/Torre radio trovata:", options: [{value: "rush", label: "La attivo subito"}, {value: "team", label: "Aspetto i compagni"}, {value: "bypass", label: "Vado oltre"}] },
  { id: "EQ12", section: "map", text: "Uso del ping strategico:", options: [{value: "obsessive", label: "Segnalo tutto"}, {value: "enemy", label: "Solo nemici grandi"}, {value: "none", label: "Uso la voce/chat"}] },
  { id: "EQ13", section: "map", text: "Se vedi un punto d'interesse lontano:", options: [{value: "go", label: "Deviazione immediata"}, {value: "ignore", label: "Dritto all'obiettivo"}, {value: "mark", label: "Segnalo e lo faremo dopo"}] },
  // 🛡️ STILE DI SOPRAVVIVENZA (14-20)
  { id: "EQ14", section: "survival", text: "Quando usi uno stimolante?", options: [{value: "small", label: "Al primo graffio per la stamina"}, {value: "mid", label: "Sotto il 50% HP"}, {value: "late", label: "Quasi morto"}] },
  { id: "EQ15", section: "survival", text: "Uso della copertura ambientale:", options: [{value: "max", label: "Resta sempre dietro rocce/muri"}, {value: "mobile", label: "Mi muovo tra le coperture"}, {value: "none", label: "La mia armatura è la copertura"}] },
  { id: "EQ16", section: "survival", text: "Reazione al veleno/rallentamento:", options: [{value: "stim", label: "Stim immediato"}, {value: "dive", label: "Tuffo e riposizionamento"}, {value: "panic", label: "Sparo frenetico"}] },
  { id: "EQ17", section: "survival", text: "Preferenza armatura:", options: [{value: "light", label: "Velocità è vita"}, {value: "medium", label: "Bilanciamento perfetto"}, {value: "heavy", label: "Carro armato umano"}] },
  { id: "EQ18", section: "survival", text: "Quante volte ti tuffi?", options: [{value: "alot", label: "Sono sempre a terra"}, {value: "tactical", label: "Per spegnere fiamme/evitare laser"}, {value: "rare", label: "Solo se necessario"}] },
  { id: "EQ19", section: "survival", text: "Gestione delle ferite agli arti:", options: [{value: "fix", label: "Curo subito"}, {value: "carryon", label: "Continuo finché posso mirare"}, {value: "ignore", label: "Non bado al dolore"}] },
  { id: "EQ20", section: "survival", text: "Difesa di un punto d'estrazione:", options: [{value: "prone", label: "Nascosto e prono"}, {value: "perimeter", label: "Piazzando torrette ovunque"}, {value: "aggro", label: "Correndo incontro ai nemici"}] },
  // 🔫 FILOSOFIA DELLE ARMI (21-27)
  { id: "EQ21", section: "weapons", text: "Arma primaria preferita:", options: [{value: "ar", label: "Fucile d'assalto"}, {value: "shotgun", label: "Fucile a pompa"}, {value: "energy", label: "Arma a energia"}] },
  { id: "EQ22", section: "weapons", text: "Rapporto con gli stratagemmi:", options: [{value: "god", label: "Amo i grandi botti"}, {value: "tool", label: "Utility per i problemi"}, {value: "last", label: "Uso prima il mio fucile"}] },
  { id: "EQ23", section: "weapons", text: "Cadenza di ricarica:", options: [{value: "obsessive", label: "Ricarico dopo ogni colpo"}, {value: "half", label: "A metà caricatore"}, {value: "empty", label: "Solo se a secco"}] },
  { id: "EQ24", section: "weapons", text: "Preferenza penetrazione armatura:", options: [{value: "high", label: "Deve bucare tutto"}, {value: "med", label: "Versatilità"}, {value: "low", label: "Punto ai punti deboli"}] },
  { id: "EQ25", section: "weapons", text: "Uso delle armi di supporto:", options: [{value: "high", label: "È la mia arma principale"}, {value: "med", label: "Per nemici specifici"}, {value: "low", label: "Raramente la chiamo"}] },
  { id: "EQ26", section: "weapons", text: "Preferenza cadenza di fuoco:", options: [{value: "auto", label: "Pioggia di piombo"}, {value: "semi", label: "Precisione chirurgica"}, {value: "burst", label: "Controllo del ritmo"}] },
  { id: "EQ27", section: "weapons", text: "Gestione munizioni:", options: [{value: "scavanger", label: "Prendo tutto ciò che trovo"}, {value: "resupply", label: "Chiamo rifornimenti spesso"}, {value: "saver", label: "Sparo solo se necessario"}] },
  // 🤝 DINAMICHE DI SQUADRA (28-32)
  { id: "EQ28", section: "team", text: "Un compagno cade:", options: [{value: "instareinforce", label: "Rinforzo immediato"}, {value: "saferheinforce", label: "Pulisco l'area e poi rinforzo"}, {value: "wait", label: "Aspetto che qualcun altro lo faccia"}] },
  { id: "EQ29", section: "team", text: "Uso del fuoco amico accidentalmente:", options: [{value: "sorry", label: "Scuse immediate via chat/voce"}, {value: "nothing", label: "È la guerra"}, {value: "blame", label: "Si è messo sulla traiettoria"}] },
  { id: "EQ30", section: "team", text: "Condivisione armi di supporto:", options: [{value: "give", label: "Ne chiamo una per il compagno"}, {value: "mine", label: "Solo se mi viene chiesto"}, {value: "never", label: "È il mio equipaggiamento"}] },
  { id: "EQ31", section: "team", text: "Coordini gli attacchi orbitali?", options: [{value: "yes", label: "Avviso sempre prima di lanciare"}, {value: "ping", label: "Metto solo un segnale"}, {value: "no", label: "Dovrebbero guardare il cielo"}] },
  { id: "EQ32", section: "team", text: "Stili di leadership:", options: [{value: "follow", label: "Seguo il gruppo"}, {value: "lead", label: "Prendo l'iniziativa"}, {value: "independent", label: "Faccio la mia parte da solo"}] },
  // 🧠 MENTALITÀ E APPRENDIMENTO (33-38)
  { id: "EQ33", section: "mind", text: "Analisi di fine missione:", options: [{value: "stats", label: "Guardo attentamente i numeri"}, {value: "experience", label: "Rifletto su cosa è andato storto"}, {value: "next", label: "Prossima missione subito"}] },
  { id: "EQ34", section: "mind", text: "Nuovo stratagemma sbloccato:", options: [{value: "test", label: "Lo provo subito in una missione facile"}, {value: "read", label: "Leggo forum/wiki prima"}, {value: "wait", label: "Lo ignoro finché non è 'meta'"}] },
  { id: "EQ35", section: "mind", text: "Reazione al fallimento di una missione:", options: [{value: "analyze", label: "Cambio build subito"}, {value: "retry", label: "Riprovo con più grinta"}, {value: "quit", label: "Passo a un altro pianeta"}] },
  { id: "EQ36", section: "mind", text: "Quanto segui il 'Meta'?", options: [{value: "full", label: "Solo le build migliori"}, {value: "hybrid", label: "Personalizzo le idee famose"}, {value: "fun", label: "Uso quello che mi diverte"}] },
  { id: "EQ37", section: "mind", text: "Conoscenza dei punti deboli nemici:", options: [{value: "expert", label: "Li conosco a memoria"}, {value: "learning", label: "Imparo col tempo"}, {value: "brute", label: "Sparo finché non muoiono"}] },
  { id: "EQ38", section: "mind", text: "Uso del tutorial/campo addestramento:", options: [{value: "master", label: "Ritorno per perfezionare i tasti"}, {value: "once", label: "Fatto solo all'inizio"}, {value: "never", label: "Imparo sul campo"}] },
  // 🎭 IDENTITÀ DA HELLDIVER (39-45)
  { id: "EQ39", section: "identity", text: "Cos'è per te la Democrazia?", options: [{value: "everything", label: "La mia vita per Super Terra"}, {value: "job", label: "Un dovere necessario"}, {value: "chaos", label: "L'occasione per far esplodere cose"}] },
  { id: "EQ40", section: "identity", text: "Eroe o Superstite?", options: [{value: "hero", label: "Schianto il nido anche se muoio"}, {value: "survivor", label: "Meglio scappare e riprovare"}, {value: "hybrid", label: "Eroe calcolato"}] },
  { id: "EQ41", section: "identity", text: "Insegna di guerra preferita:", options: [{value: "bold", label: "Colori sgargianti"}, {value: "dark", label: "Nero e mimetico"}, {value: "classic", label: "Giallo Super Terra"}] },
  { id: "EQ42", section: "identity", text: "Rapporto con le Emote:", options: [{value: "always", label: "Saluto sopra ogni cadavere"}, {value: "rare", label: "Solo all'estrazione"}, {value: "never", label: "Tempo sprecato"}] },
  { id: "EQ43", section: "identity", text: "Titolo desiderato:", options: [{value: "admiral", label: "Ammiraglio della flotta"}, {value: "death", label: "Comandante di Morte"}, {value: "cadet", label: "Cadetto per sempre"}] },
  { id: "EQ44", section: "identity", text: "Perché combatti?", options: [{value: "glory", label: "Per la gloria eterna"}, {value: "peace", label: "Per portare la pace"}, {value: "fun", label: "Per lo sballo del combattimento"}] },
  { id: "EQ45", section: "identity", text: "Pronto a rifarlo?", options: [{value: "ready", label: "Sempre pronto!"}, {value: "rest", label: "Ho bisogno di un break"}, {value: "never", label: "Forse basta così"}] },
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

