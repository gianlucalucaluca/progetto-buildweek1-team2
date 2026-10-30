# Quiz App – Build Week 1

Un quiz in stile esame Epicode: 10 domande sul mondo dell'informatica e del web, 20 secondi per rispondere a ognuna e un risultato finale che dice se l'esame è superato.

Progetto della Build Week 1 (Unit 1, settimana 4) del corso AI Full-Stack Developer di Epicode, realizzato dal Team 2.

**Sito online:**

## Come funziona

Tutto succede in una sola pagina: il JavaScript svuota il riquadro centrale e lo riempie con la schermata giusta.

1. **Benvenuto** – titolo, regole del quiz e bottone *Inizia il test*.
2. **Quiz** – una domanda alla volta, scelta a caso e mai ripetuta, con le risposte in ordine mescolato.
   - In alto il contatore *Domanda N di 10* e il timer da 20 secondi, che diventa rosso negli ultimi 5.
   - Al click la risposta giusta diventa verde, quella sbagliata rossa, e i bottoni si bloccano.
   - Dopo un secondo e mezzo si passa alla domanda successiva; se il tempo scade, viene mostrata la risposta giusta e si va avanti da soli.
3. **Risultati** – *Complimenti!* o *Peccato!* in base al punteggio (si passa con il 60%), due cerchi con la percentuale, e il bottone *Ricomincia*.

## Struttura dei file

index.html            la pagina
assets/css/style.css  lo stile delle tre schermate
assets/js/script.js   domande, logica del quiz e timer
assets/img/           logo, sfondo e foto della welcome

## Dettagli tecnici

### CSS

Le misure sono in `rem` e il `font-size` di `html` usa `min()` con `vw`/`vh`, così la pagina si adatta a ogni schermo. Il layout usa `inline-block`. Le risposte e il timer cambiano colore con le classi `.correct`, `.wrong` e `.urgent`. Nei risultati i cerchi delle percentuali sono fatti con `conic-gradient`.

### JavaScript

#### render()

In generale, abbiamo sfruttato tutte le variabili trovate nello start del file JS.
In particolare, abbiamo sfruttato la variabile `currentScreen` per modificare il contenuto del `main` in base alla schermata da visualizzare durante il quiz.

La funzione `render()` viene richiamata al caricamento della pagina tramite un event listener `load` sull'oggetto `window`.

**Come legge `currentScreen`** - Al suo interno, attraverso diverse condizioni `if` ed `else if`, verifichiamo il valore della variabile `currentScreen` per capire quale funzione richiamare e quale schermata mostrare tra `renderWelcome()`, `renderQuiz()` e `renderResults()`.

Prima di richiamare la funzione corrispondente, utilizziamo `MAIN_APP.textContent = ""` per svuotare il contenuto precedente del main.

#### renderWelcome()

Come mostrato nell'albero del DOM, utilizziamo `createElement()` per creare i vari elementi HTML necessari alla schermata iniziale, tra cui il titolo, il paragrafo introduttivo, la lista delle regole e il bottone "Inizia il test".

Il numero di domande da mostrare durante il quiz viene stabilito tramite la costante `NUM_QUESTIONS`, mentre `TOTAL_QUESTIONS` rappresenta il numero effettivo di domande che verranno estratte.

Per mostrare il numero totale di domande e il tempo a disposizione per ogni domanda, utilizziamo le costanti `TOTAL_QUESTIONS` e `TIMER_DURATION` all'interno del testo introduttivo.

Abbiamo utilizzato `forEach()` per scorrere l'array `rulesText` e creare un elemento `li` per ogni stringa presente, aggiungendolo alla `ul` precedentemente creata.

**Dove cambia il valore di `currentScreen`** - Al click del bottone "Inizia il test", cambiamo il valore di `currentScreen` in `"quiz"`, rimuoviamo la classe `"welcome"` dal main e richiamiamo la funzione `render()` per mostrare la schermata del quiz.

#### renderQuiz()

Anche in questa funzione utilizziamo `createElement()`, basandoci sempre sull'albero del DOM, per creare gli elementi HTML necessari a mostrare la domanda, il contatore delle domande, il timer e le relative risposte.

Per estrarre le domande in maniera casuale utilizziamo la variabile `randomIndex`, inizializzata con `Math.floor()` e `Math.random()`.

**Domande estratte** - Per evitare di ripetere le domande già estratte, utilizziamo l'array `USED_QUESTIONS`, inizialmente vuoto, che memorizza il testo delle domande già mostrate. Attraverso un ciclo `do...while`, generiamo un nuovo indice casuale finché la domanda selezionata non è ancora presente nell'array. Successivamente, aggiungiamo la domanda estratta a `USED_QUESTIONS` tramite `push()`. Il quiz termina quando viene raggiunto il numero di domande stabilito dalla costante `TOTAL_QUESTIONS`, a prescindere quindi dal numero di domande presenti nell'array `QUESTIONS`.

Creiamo un array `totalAnswer`, nel quale uniamo le risposte corrette e quelle sbagliate utilizzando lo spread operator (`...`) per copiare gli elementi di `incorrect_answers` e aggiungendo `correct_answer`. In questo modo otteniamo un unico array contenente tutte le risposte da mostrare nei bottoni.

Utilizziamo un ciclo `for` per randomizzare l'ordine delle risposte. A ogni iterazione generiamo un indice casuale con `Math.floor()` e `Math.random()` e scambiamo gli elementi dell'array utilizzando la variabile temporanea `temp`.

Successivamente, utilizziamo `forEach()` per scorrere `totalAnswer` e creare un bottone per ogni risposta, inserendo il testo tramite `textContent` e aggiungendo la classe `"answer"`.

Al click di uno dei bottoni, selezioniamo tutti i bottoni delle risposte tramite `newAnswerDiv.querySelectorAll("button")` e li disabilitiamo con `disabled = true`, impedendo all'utente di selezionare altre risposte per la stessa domanda.

Fermiamo il timer utilizzando `clearInterval(timerId)`.

Per verificare se la risposta selezionata è corretta o sbagliata, utilizziamo una condizione `if` che confronta il `textContent` del bottone cliccato con la proprietà `correct_answer` dell'oggetto corrispondente nell'array `QUESTIONS`.

Se la risposta è corretta, incrementiamo `score` di 1 e aggiungiamo al bottone la classe `"correct"`.

Altrimenti, aggiungiamo al bottone la classe `"wrong"` e utilizziamo `forEach()` su tutti i bottoni per individuare la risposta corretta e aggiungere anche a essa la classe `"correct"`. In questo modo, anche quando l'utente sbaglia, viene mostrata la risposta esatta.

Utilizziamo `setTimeout()` con la costante `FEEDBACK_DELAY`, impostata a 1500 millisecondi, per attendere 1,5 secondi prima di passare alla domanda successiva.

**Risposta selezionata** - All'interno del `setTimeout()`, incrementiamo `currentQuestion` di 1. Se `currentQuestion` è minore di `TOTAL_QUESTIONS`, richiamiamo `renderQuiz()` per mostrare un'altra domanda. Altrimenti, impostiamo `currentScreen` su `"results"` e richiamiamo `render()` per visualizzare la schermata finale. Ha un delay di 1,5 secondi, come impostato nella variabile `FEEDBACK_DELAY`.

Al termine della funzione richiamiamo `startTimer()` per avviare il conto alla rovescia della nuova domanda.

#### startTimer()

Questa funzione gestisce il timer per ogni domanda.

Utilizziamo `clearInterval(timerId)` per interrompere un eventuale timer precedente prima di avviarne uno nuovo.

Creiamo la variabile `timeLeft`, inizializzandola con `TIMER_DURATION - 1`, in modo da visualizzare correttamente il tempo rimanente durante il conto alla rovescia.

Selezioniamo lo `span` del timer tramite `document.querySelector("#timer")`.

Attraverso `setInterval()`, eseguiamo il codice ogni secondo (1000 millisecondi), aggiornando il testo del timer tramite `textContent`.

Quando `timeLeft` raggiunge 0, fermiamo il timer con `clearInterval(timerId)` e richiamiamo la funzione `showCorrectMessage(QUESTIONS)` per disabilitare i bottoni delle risposte e mostrare quella corretta.

Successivamente, incrementiamo `currentQuestion` e utilizziamo `setTimeout()` con `FEEDBACK_DELAY` per attendere 1,5 secondi prima di passare alla domanda successiva oppure alla schermata dei risultati, verificando se sono state mostrate tutte le domande.

Infine, attraverso una condizione `if`, controlliamo se `timeLeft` è minore o uguale a 5. In questo caso aggiungiamo la classe CSS `"urgent"` al timer tramite `classList.add()`, permettendo di evidenziare visivamente gli ultimi secondi disponibili.

A ogni iterazione decrementiamo `timeLeft` di 1.

#### renderResults()

In questa funzione utilizziamo `createElement()` per creare tutti gli elementi HTML necessari alla schermata finale, basandoci sulla struttura dell'albero del DOM.

Creiamo una section principale contenente l'heading con l'icona, il titolo e i due div principali che contengono la parte dedicata alle statistiche.

Utilizziamo una condizione `if` per verificare se l'utente ha superato l'esame. Per stabilirlo, confrontiamo la variabile `percentuage` con la costante `PASS_THRESHOLD`, che rappresenta la percentuale minima necessaria per superare il quiz, ovvero 60. Se la percentuale raggiunta è maggiore o uguale alla soglia minima, mostriamo il messaggio "Complimenti!" e la scritta "Hai superato l'esame!". Altrimenti, mostriamo "Peccato!" e la scritta "Non hai superato l'esame!".

In base al risultato, aggiungiamo le classi CSS `"passed"` oppure `"failed"` agli elementi interessati, così da distinguere visivamente il superamento e il mancato superamento del quiz.

Per calcolare la percentuale di risposte corrette, utilizziamo la variabile `percentuage`, ottenuta dividendo `score` per `TOTAL_QUESTIONS` e moltiplicando il risultato per 100. Utilizziamo `Math.round()` per arrotondare il risultato all'intero più vicino.

La percentuale viene mostrata all'interno di un cerchio grafico, creato tramite elementi `div`. Utilizziamo `style.setProperty("--perc", ...)` per impostare la variabile CSS `--perc`, che permette di rappresentare graficamente la percentuale ottenuta.

Nella sezione delle statistiche mostriamo la percentuale raggiunta, la soglia minima stabilita tramite `PASS_THRESHOLD`, il numero di risposte corrette e il numero di risposte sbagliate. Le risposte sbagliate vengono calcolate sottraendo `score` da `TOTAL_QUESTIONS`.

Per creare la parte delle statistiche utilizziamo diversi elementi `div` e `span`, inserendo i testi e i valori tramite `textContent` e collegando gli elementi tra loro con `appendChild()`.

**Pulsante Ricomincia** - Infine, creiamo il bottone "RICOMINCIA". Al suo click, utilizziamo `window.location.reload()` per ricaricare la pagina e riportare il quiz allo stato iniziale, azzerando il punteggio e ripristinando le variabili utilizzate durante lo svolgimento.

#### showCorrectMessage()

Questa funzione viene richiamata quando scade il tempo a disposizione per rispondere a una domanda.

Riceve come parametro l'array `QUESTIONS` e seleziona tutti i bottoni presenti nel main tramite `MAIN_APP.querySelectorAll("button")`.

Utilizziamo `forEach()` per disabilitare tutti i bottoni tramite `disabled = true`, impedendo all'utente di selezionare una risposta dopo la scadenza del timer.

Successivamente, utilizziamo un secondo `forEach()` per confrontare il `textContent` di ogni bottone con la proprietà `correct_answer` della domanda corrente, individuata tramite `randomIndex`.

Quando troviamo il bottone che contiene la risposta corretta, gli aggiungiamo la classe CSS `"correct"`, così da mostrare all'utente la soluzione esatta anche quando non ha risposto in tempo.

## Come abbiamo lavorato

- Prima abbiamo progettato: layout delle tre schermate, albero del DOM e nomi delle classi, poi il programma della settimana giorno per giorno.
- Abbiamo scritto il codice tutti insieme in diretta con **Live Share** di VS Code, su un'unica repo.
- Ogni schermata è stata prima descritta passo per passo in italiano (nei commenti del codice) e poi tradotta in JavaScript.
- Problemi risolti lungo la strada: i percorsi delle immagini dopo aver riorganizzato le cartelle, un conflitto su GitHub (da lì la regola "Sync prima di iniziare"), il ritardo del timer e le classi con nomi diversi tra CSS e JS.

## Squadra

- Gianluca Fatigati ([gianlucalucaluca](https://github.com/gianlucalucaluca)) – Git e README
- Vincenzo Dell'Aversana ([VincenzoDV27](https://github.com/VincenzoDV27)) – JS
- Giovanbattista Repoli ([gb996](https://github.com/gb996)) – CSS/JS
- Kledjan Lleshi ([Kledjan00](https://github.com/Kledjan00)) – CSS
- Francesca Alesi ([FrancescaAlesi](https://github.com/FrancescaAlesi)) – Team Leader
- Federico Semeraro ([FedericoSemeraro](https://github.com/federicosemeraro16-eng)) – CSS/JS
