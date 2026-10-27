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
MAIN_APP.classList.add("welcome"); // aggiunta classe .welcome al main

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

  const button = document.createElement("button");
  button.textContent = "Inizia il test ";
  button.classList.add("start-btn");
  
  button.addEventListener("click", () => {
    currentScreen = "quiz";
    render();
  })

  section.appendChild(h1);
  section.appendChild(p);
  section.appendChild(ul);
  section.appendChild(button);

  MAIN_APP.append(section);
}

function renderQuiz(){
  const section = document.createElement("section");
  const p = document.createElement("p");
  const span = document.createElement("span");
  const h2 = document.createElement("h2");

    QUESTIONS.forEach((question) =>{
      currentQuestion++;
      p.textContent = `Domanda ${currentQuestion} di ${QUESTIONS.length}`;
      // p che si attacca alla section
      // span.textContent = startTimer(TIMER_DURATION)
    })

    section.appendChild(h2);
    section.appendChild(p);
    section.appendChild(span);

    MAIN_APP.append(section);

    startTimer();
}

function startTimer () {
  const timeLeft = TIMER_DURATION; 
  const timerSpan = document.querySelector("#timer");
  const intervalId = setInterval(() => {
    timerSpan.textContent = timeLeft;
    timeLeft--;

    if (timeLeft <= 5){
      span.classList.add("time-left");
    }

    if (timeLeft = 0) {
      clearInterval(intervalId);
      console.log("Tempo scaduto");
      currentQuestion++;
      renderQuiz();
    }
  }, 1000);
}



// 6.creare foreach su array questions
// 7.creare un p dove viene scritto Domanda[i] di questions.length
// 8. creare uno span  per il timer testo da costante TIMER_DURATION questo va attaccato alla section quiz
// 9. creare un h2 per la QUESTIONS[i].question e l h2 attaccato alla section quiz
// 10. chiudere il primo for each
// 11. creare un div 
// 12. creare un nuovo array  con nome costante totalAnswers [QUESTIONS.correct_answer,...incorrect_answers]
// 13.fare un foreach per l'array questions per stamparlo nel dom
// 14.creaiamo un button per ogni risposta 
// 15. inserire testo di ogni risposta nei button con text content  

