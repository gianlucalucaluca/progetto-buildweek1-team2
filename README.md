# progetto-buildweek1-team2
Main repo per la bw1 - unit1, Epicode benchmark.

# Lunedì 26/10
- Creazione del layout; 
- Creazione della repo progetto-buildweek1-team2;
- Connessione con Live Share e prova di scrittura insieme.

# Martedì 27/10
- Funzione che parte al caricamento della pagina; 
- Welcome con titolo, testo, lista e button (Inizia test); 
- CSS di tutto il progetto, con colori e nomi delle classi decisi una volta sola.

JAVASCRIPT

Render():
Abbiamo sfruttato la variabile currentScreen per modificare il contenuto del main in base alla schermata da visualizzare durante il quiz.
La funzione render() viene richiamata al caricamento della pagina tramite un event listener load sull'oggetto window.
Al suo interno, attraverso diverse condizioni if, verifichiamo il valore della variabile currentScreen per capire quale funzione richiamare e quale schermata mostrare.

renderWelcome():
Come mostrato nell'albero del DOM, utilizziamo createElement() per creare i vari elementi HTML necessari alla schermata iniziale.
Abbiamo utilizzato forEach() per scorrere l'array rulesText e creare un elemento li per ogni stringa presente, aggiungendolo alla ul precedentemente creata.
Infine, utilizziamo appendChild() per aggiungere gli elementi al rispettivo elemento genitore del DOM.

renderQuiz():
Anche in questa funzione utilizziamo createElement(), basandoci sempre all'albero del DOM, per creare gli elementi HTML necessari a mostrare la domanda e le relative risposte.
Scorriamo le risposte con forEach() per creare un pulsante per ciascuna di esse. Prima di mostrarle, le mescoliamo casualmente in modo che la risposta corretta non si trovi sempre nella stessa posizione.
Utilizziamo appendChild() per aggiungere gli elementi al DOM e, infine, richiamiamo la funzione startTimer() per avviare il conto alla rovescia della domanda corrente.

startTimer():
Questa funzione gestisce il timer per ogni domanda.
Utilizziamo la variabile timeLeft per memorizzare il tempo rimanente, inizializzandolo con il valore di TIMER_DURATION, impostato a 20 secondi.
Attraverso setInterval(), eseguiamo il codice ogni 1000 millisecondi (1 secondo), aggiornando il valore di timeLeft e mostrando il tempo rimanente nel DOM.
All'interno delle condizioni if, controlliamo il tempo rimanente: quando arriva a 5 secondi, aggiungiamo la classe CSS time-left tramite classList.add(), mentre quando raggiunge 0 fermiamo il timer e passiamo alla domanda successiva.

# Mercoledì 28/10 
- Al click su "Inizia test" compare una domanda alla volta, senza ripetizioni, con le risposte come button; 
- Risposta giusta in verde, sbagliata in rosso, esito a schermo per un secondo e mezzo, poi domanda successiva;
- Timer di 20 secondi che allo scadere mostra la risposta giusta e va avanti da solo; 
- contatore “domanda N di 10” in alto a sinistra.

# Giovedì 29/10
- Schermata finale: due versioni, superato e non superato, con icona e titolo; 
- Riquadro con percentuale, risposte corrette e sbagliate; 
- Grafico; 
- Button "Ricomincia test".

# Venerdì 30/10 
- Extra e ultime correzioni; 
- Controllo del sito online su GitHub Pages e dei requisiti; 
- Poi consegna dell’URL della repo entro le 16:30.
