/*
  REGOLE
  - Codice in JavaScript moderno: solo const/let, mai var.
  - DOM: usa querySelector / querySelectorAll.
  - Eventi: usa addEventListener (mai onclick inline nell'HTML).
  - Pattern: stato → render → eventi.
*/

/*
  Array di domande.
  Ogni question è un object con:
   - question: testo della domanda
   - correct_answer: la risposta corretta (string)
   - incorrect_answers: array di risposte sbagliate (string[])
*/
const QUESTIONS = [
  {
    question: "Cosa significa l'acronimo CPU?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    question:
      "In Java, quale keyword si usa per impedire che una variabile venga modificata?",
    correct_answer: "final",
    incorrect_answers: ["static", "private", "public"],
  },
  {
    question: "Il logo di Snapchat è una campana.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "I puntatori sono stati introdotti in C++ e non c'erano nel linguaggio C originale.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Qual è il formato immagine più usato per i loghi nel database di Wikimedia?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    question: "Cosa significa l'acronimo CSS?",
    correct_answer: "Cascading Style Sheets",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheets",
      "Computer Style Sheets",
    ],
  },
  {
    question: "Qual è il nome in codice del sistema operativo Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    question: "Qual era il limite originale di caratteri di un Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    question: "Linux è stato creato come alternativa a Windows XP.",
    correct_answer: "Falso",
    incorrect_answers: ["Vero"],
  },
  {
    question:
      "Quale linguaggio di programmazione condivide il nome con un'isola dell'Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

/* Costanti del quiz */
const TOTAL_QUESTIONS = QUESTIONS.length;
const PASS_THRESHOLD = 60; // percentuale minima per "Promosso"
const FEEDBACK_DELAY = 1500; // ms di attesa dopo risposta prima di avanzare
const TIMER_DURATION = 20; // secondi per ogni domanda
const MAIN_APP = document.querySelector("#app"); // prende il main con id app

/* Stato globale */
let currentScreen = "welcome"; // "welcome" | "quiz" | "results"
let currentQuestion = 0;
let score = 0;
let timerId = null;

/* SCRIVI QUI LE TUE FUNZIONI:
   - render() che chiama renderWelcome / renderQuiz / renderResults in base a currentScreen
   - renderWelcome() per la schermata iniziale con button Inizia
   - renderQuiz() per la domanda corrente con i button risposta + counter + timer
   - renderResults() per la schermata finale con percentuale + barre + verdetto
   - startTimer() / stopTimer() per il countdown
   - handleAnswer(button, answer) per il click su una risposta
   - handleTimeUp() per il tempo scaduto
   - advance() per andare alla domanda successiva o ai risultati
*/

// FUNZIONE RENDER CHE VARIA IN BASE A currentScreen

window.addEventListener("load", () => {
  render();
});

function render() {
  MAIN_APP.textContent = ""; //svuota il main, in base al current screen viene riempito dalle 3 funzioni "welcome" | "quiz" | "results"

  if (currentScreen === "welcome") {
    renderWelcome();
  } else if (currentScreen === "quiz") {
    renderQuiz();
  } else if (currentScreen === "results") {
    renderResults();
  }
}


/*----Pagina Benvenuto----*/
function renderWelcome() {
  const section = document.createElement("section");
  section.classList.add("welcome-text");

  const h1 = document.createElement("h1");
  h1.classList.add("welcome-title");
  h1.textContent = "Benvenuto al tuo ";

  const span = document.createElement("span");
  span.textContent = "esame";
  span.classList.add("welcome-accent");
  h1.appendChild(span);

  const p = document.createElement("p");
  p.classList.add("welcome-intro");
  p.textContent = `Una serie di ${TOTAL_QUESTIONS} domande sul mondo dell'informatica e del web. Per ogni domanda hai ${TIMER_DURATION} secondi di tempo.`;

  MAIN_APP.classList.add("welcome"); // aggiunta classe .welcome al main

  const ul = document.createElement("ul");

  const rulesText = [
    "Ogni domanda è a tempo e può ricevere una sola risposta.",
    "Una volta cliccata una risposta, la domanda è chiusa.",
    "Il quiz dura circa 3 minuti.",
  ];

  rulesText.forEach((e) => {
    const li = document.createElement("li");
    li.textContent = e;
    li.classList.add("welcome-list");
    ul.appendChild(li);
  });

  // pulsante "Inizia il test"
  const button = document.createElement("button");
  button.textContent = "Inizia il test ";
  button.classList.add("start-btn");

  // al suo click, currentScreen diventa quiz e richiama la funzione render
  button.addEventListener("click", () => {
    currentScreen = "quiz";
    MAIN_APP.classList.remove("welcome");
    render();
  });

  section.appendChild(h1);
  section.appendChild(p);
  section.appendChild(ul);
  section.appendChild(button);

  MAIN_APP.append(section);
}



/*----Pagina Quiz----*/

// inizializzo una costante randomIndex con math.floor e math.random
let randomIndex = Math.floor(Math.random() * QUESTIONS.length);

// creo un array vuoto usedQuestions
const USED_QUESTIONS = [];

// Apro la funzione renderQuiz
function renderQuiz() {
  MAIN_APP.textContent = "";


  // if (USED_QUESTIONS.includes(QUESTIONS[randomIndex].question)) {
  //   return renderQuiz();
  // }

do {
  randomIndex = Math.floor(Math.random() * QUESTIONS.length);
} while (USED_QUESTIONS.includes(QUESTIONS[randomIndex].question));

  USED_QUESTIONS.push(QUESTIONS[randomIndex].question);

  // -creo una section e ci do una classe quiz
  const newSection = document.createElement("section");
  newSection.classList.add("quiz");

  // -creo un div
  const newQuizDiv = document.createElement("div");

  // -ci do la classe .quiz top
  newQuizDiv.classList.add("quiz-top");

  // -appendo il div alla section
  newSection.appendChild(newQuizDiv);

  // -creo uno span
  const newSpan = document.createElement("span");

  // -inserisco testo "domanda indicerandomico di questions.length"
  newSpan.textContent = `Domanda ${USED_QUESTIONS.length} di ${QUESTIONS.length}`;

  // -aggiungo classe quiz-counter
  newSpan.classList.add("quiz-counter");

  // -appendo lo span alla sectionquiz
  newQuizDiv.appendChild(newSpan);

  // -creo un altro span
  const newTimerSpan = document.createElement("span");

  // - devo mostrare il timer che va in live
  newTimerSpan.textContent = `${TIMER_DURATION}s`;

  // -ci do una classe quiz-timer-box e ne .quiz-timer
  newTimerSpan.classList.add("quiz-timer-box", "quiz-timer");

  // dare id timer
  newTimerSpan.setAttribute("id", "timer");

  // -appendo il secondo span alla section .main
  newQuizDiv.appendChild(newTimerSpan);

  // creo un h2
  const newQuiz = document.createElement("h2");

  // h2 text content QUESTIONS[randomIndex].question
  newQuiz.textContent = QUESTIONS[randomIndex].question;

  // dare una classe .quiz-question
  newQuiz.classList.add("quiz-question");

  // appendo l'h2 alla section
  newSection.appendChild(newQuiz);

  // creo un div
  const newAnswerDiv = document.createElement("div");

  // creo array totalanswer = [correct_answer,...incorrect_answer]
  const totalAnswer = [
    ...QUESTIONS[randomIndex].incorrect_answers,
    QUESTIONS[randomIndex].correct_answer,
  ];

  // for per randomizzare l'ordine delle risposte, con il math random randomizzo gli indici
  for (let i = totalAnswer.length - 1; i > 0; i--) {
    const randomAnswerIndex = Math.floor(Math.random() * (i+1));
    const temp = totalAnswer[i];
    totalAnswer[i] = totalAnswer[randomAnswerIndex];
    totalAnswer[randomAnswerIndex] = temp;
  }

  // creo un for each per total answer
  totalAnswer.forEach((answer) => {

    // creo un button per ognuno
    const buttonAnswer = document.createElement("button");
    buttonAnswer.textContent = answer;

    // ci do la classe .answer
    buttonAnswer.classList.add("answer");

    //addEventlistener per i bottoni delle risposte
    buttonAnswer.addEventListener("click", () => {

      // prendo tutti i bottoni del div newAnswerDiv con const allButtons usando querySelectorAll("button")
      const allButtons = newAnswerDiv.querySelectorAll("button");

      //forEach di allButtons e con btn.disabled = true disabilito i bottoni
      allButtons.forEach((btn) => {
        btn.disabled = true;
      });

      // ferma il timer una volta cliccata la risposta
      clearInterval(timerId);

      // if (buttonAnswer.textContent === QUESTIONS[randomIndex].correct_answer) se la risposta è esatta aumenta lo score e si assegna la classe .correct
      if (buttonAnswer.textContent === QUESTIONS[randomIndex].correct_answer) {
        score++;
        buttonAnswer.classList.add("correct");
      } // se è sbagliata si assegna la classe .wrong alla risposta cliccata e si assegna quella correct a quella effettivamente giusta cercandola con il forEach
      else {
        buttonAnswer.classList.add("wrong");
        allButtons.forEach((buttonAnswer) => {
          if (
            buttonAnswer.textContent === QUESTIONS[randomIndex].correct_answer
          ) {
            buttonAnswer.classList.add("correct");
          }
        });
      }

      //setTimeout per passare alla domanda successiva dopo    1,5 secondi
      setTimeout(() => {

        // scala il currentQuestion++ per la prossima domanda
        currentQuestion++;

        // se currentQuestion.lenght è < di QUESTIONS.lenght richiamo la funzione renderQuiz() per far scorrere le ulteriori domande
        if (currentQuestion < QUESTIONS.length) {
          renderQuiz();
        } //con else, ovvero se currentQuestion.lengh è > di QUESTIONS.lenght, cambio il currentScreen in results e richiamo la funzione render ()
        else {
          currentScreen = "results";
          render();
        }
      }, FEEDBACK_DELAY);
    });

    //appendo i bottoni al div
    newAnswerDiv.appendChild(buttonAnswer);
  });
  newSection.appendChild(newAnswerDiv);
  MAIN_APP.append(newSection);
  startTimer();
}

function startTimer() {
  // pulire il timer precedente
  clearInterval(timerId);

  // mettere variabile tempo rimanente pari al tempo a disposizione
  let timeLeft = TIMER_DURATION - 1;

  const timerSpan = document.querySelector("#timer");

  timerId = setInterval(() => {
    timerSpan.textContent =  `${timeLeft}s`;

    if (timeLeft === 0) {
      clearInterval(timerId);
      showCorrectMessage(QUESTIONS);//disabilitare le risposte quando scade il tempo
      
      // currentQuestion++;

      setTimeout(()=>{
        if(currentQuestion < QUESTIONS.length){
        renderQuiz();
        } else {
          currentScreen = "results";
          render();
        }
      }, FEEDBACK_DELAY);
      return; 
    }

    if (timeLeft <= 5) {
      timerSpan.classList.add("urgent"); // dovrebbe essere solo urgent come classe per fare cambiare il colore a 5 secondi
    }
    timeLeft--;
  }, 1000);
}


/*----Pagina Finale----*/
function renderResults() {
  MAIN_APP.textContent = "";

  // section di results
  const newSection = document.createElement("section");

  // classe per la section generale
  newSection.classList.add("results");

  // div del results-heading
  const newDivResults = document.createElement("div");

  // classe per div result-header
  newDivResults.classList.add("result-header");

  // div del result-icon
  const newDivIcon = document.createElement("div");

  // classe per div result-icon
  newDivIcon.classList.add("result-icon");

  // div del results-text
  const newDivText = document.createElement("div");

  // classe per il div results-text
  newDivText.classList.add("results-text");

  // h2 del results-title
  const newTitleResult = document.createElement("h2");
  newTitleResult.classList.add("result-title");

  // span per titolo COMPLIMENTI/PECCATO
  const newSpanTitleResult = document.createElement("span");

  // condizione if per h2
  if (score >= 6) {
    newTitleResult.textContent = " Hai superato l'esame!";
    newSpanTitleResult.textContent = "Complimenti!";
    newSpanTitleResult.classList.add("passed");
    newTitleResult.classList.add("result-title");
    newDivIcon.classList.add("passed");
  } else {
    newTitleResult.textContent = " Non hai superato l'esame!";
    newSpanTitleResult.textContent = "Peccato!";
    newSpanTitleResult.classList.add("failed");
    newTitleResult.classList.add("result-title");
    newDivIcon.classList.add("failed");
  }

  // div di tutta la parte statistiche
  const statsDiv = document.createElement("div");
  statsDiv.classList.add("stats");

  // div del CONTENUTO delle statistiche sia a sinistra che a destra
  const statDiv = document.createElement("div");
  statDiv.classList.add("stat");

  // div per il cerchio della percentuale
  const percentuage = (score * 100) / QUESTIONS.length;
  const circleDiv = document.createElement("div");
  circleDiv.classList.add("circle");
  circleDiv.style.setProperty("--perc", `${percentuage}%`);
  
  // div che contiente la percentuale dentro il cerchio
  const circleInDiv = document.createElement("div");
  circleInDiv.classList.add("circle-in");
  circleInDiv.textContent = `${percentuage} %`;


  // div che contiente tutte le info delle statistiche in %
  const statInfoDiv = document.createElement("div");
  statInfoDiv.classList.add("stat-info");

  // div che contiene la scritta "percentuale"
  const statHeadingDiv = document.createElement("div");
  statHeadingDiv.classList.add("stat-heading");
  statHeadingDiv.textContent = "Percentuale";

  // div che contiente il value della percentuale
  const statValueDiv = document.createElement("div");
  statValueDiv.classList.add("stat-value");
  statValueDiv.textContent = `${percentuage} %`;

  // div che contiente la soglia della percentuale
  const statNoteDiv = document.createElement("div");
  statNoteDiv.classList.add("stat-note");
  statNoteDiv.textContent = `Soglia minima : 60 %`;

  // div a destra dove contiente le statistiche in decimale
  const statRightDiv = document.createElement("div");
  statRightDiv.classList.add("stat", "stat-right");

  // div per il cerchio delle statistiche
  const circleRightDiv = document.createElement("div");
  circleRightDiv.classList.add("circle");
  circleRightDiv.style.setProperty("--perc", `${percentuage}%`);

  // div per la scritta delle statistiche dentro il cerchio
  const circleRightInDiv = document.createElement("div");
  circleRightInDiv.classList.add("circle-in");
  circleRightInDiv.textContent = `${score}/${QUESTIONS.length}`;

  // div per le info delle varie statistiche
  const statRightInfoDiv = document.createElement("div");
  statRightInfoDiv.classList.add("stat-info");

  // div che contiente la sritta "risposte"
  const statRightHeadingDiv = document.createElement("div");
  statRightHeadingDiv.classList.add("stat-heading");
  statRightHeadingDiv.textContent = "Risposte";

  // div che contiente lo span testo e numero delle risposte corrette
  const legendCorrectDiv = document.createElement("div");
  legendCorrectDiv.classList.add("legend");
  const spanDotGood = document.createElement("span");
  spanDotGood.classList.add("dot", "good");
  const textCorrect = document.createElement("span");
  textCorrect.textContent = "Corrette";
  const bGood = document.createElement("b");
  bGood.textContent = `${score}`;

  // div che contiente lo span testo e numero delle risposte sbagliate
  const legendBadDiv = document.createElement("div");
  legendBadDiv.classList.add("legend");
  const spanDotBad = document.createElement("span");
  spanDotBad.classList.add("dot", "bad");
  const textBad = document.createElement("span");
  textBad.textContent = "Sbagliate";
  const bBad = document.createElement("b");
  bBad.textContent = `${QUESTIONS.length - score}`;

  //bottone per restart
  const button = document.createElement("button");
  button.textContent = " RICOMINCIA";
  button.classList.add("restart-btn");
  button.addEventListener("click", () => {
    window.location.reload();
  });

  //PARTE HEADING - SECTION RESULTS
  // appendo l'h2 dentro results-text
  newDivText.appendChild(newTitleResult);
  newDivText.insertBefore(newSpanTitleResult, newTitleResult);

  // appendo i div dentro results-heading
  newDivResults.appendChild(newDivIcon);
  newDivResults.appendChild(newDivText);

  // appendo i results-heading dentro section
  newSection.appendChild(newDivResults);

  // PARTE PERCENTUALE - STATISTICHE
  // appendo le due parti di destra e sinistra nel div tutta la parte statistiche
  statsDiv.appendChild(statDiv);

  // parte sinistra
  statDiv.appendChild(circleDiv);
  circleDiv.appendChild(circleInDiv);
  statDiv.appendChild(statInfoDiv);
  statInfoDiv.appendChild(statHeadingDiv);
  statInfoDiv.appendChild(statValueDiv);
  statInfoDiv.appendChild(statNoteDiv);

  // parte destra
  statsDiv.appendChild(statRightDiv);
  statRightDiv.appendChild(circleRightDiv);
  circleRightDiv.appendChild(circleRightInDiv);
  statRightDiv.appendChild(statRightInfoDiv);
  statRightInfoDiv.appendChild(statRightHeadingDiv);
  statRightInfoDiv.appendChild(legendCorrectDiv);
  legendCorrectDiv.appendChild(spanDotGood);
  legendCorrectDiv.appendChild(textCorrect);
  legendCorrectDiv.appendChild(bGood);
  legendBadDiv.appendChild(spanDotBad);
  legendBadDiv.appendChild(textBad);
  legendBadDiv.appendChild(bBad);
  statRightInfoDiv.appendChild(legendBadDiv);

  // bottone ricomincia
  newSection.appendChild(statsDiv);
  newSection.appendChild(button);

  MAIN_APP.append(newSection);
}

// funzione per far apparire la risposta esatta allo scadere del timer 
//apro una funzione che riceve un array come parametro
function showCorrectMessage(QUESTIONS){
//seleziono i bottoni con classe answer
const buttons = MAIN_APP.querySelectorAll("button");
//mettere un forEach
buttons.forEach((btn) =>{
  if(btn.textContent===QUESTIONS[randomIndex].correct_answer){
  btn.classList.add('correct')
  }})}