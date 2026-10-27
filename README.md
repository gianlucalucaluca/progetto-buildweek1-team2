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

# APPUNTI COLORI - QUIZ APP
COLORI EPICODE
viola              #8c4dff                          -> viola
rosa               #e03c95                          -> rosa acceso
viola scuro        #6a2fe0                          -> viola scuro
magenta scuro      #c42a86                          -> rosa scuro
blu notte          #0b0d38                          -> blu quasi nero

SFONDO E CARD
sfondo pagina      #1b1535                          -> viola molto scuro
testo              #ffffff                          -> bianco
card (sfumatura)   #1e1458 -> #100b3a               -> viola scuro che diventa quasi nero
bordo card         rgba(185, 150, 255, 0.32)        -> lilla trasparente
ombra card         rgba(0, 0, 0, 0.45)              -> nero trasparente

BENVENUTO
testo elenco       #cfd5ea                          -> grigio chiaro azzurrino
bottone Inizia     #6a2fe0 -> #c42a86               -> da viola a rosa scuro
titolo "esame"     #8c4dff -> #e03c95               -> da viola a rosa

DOMANDA
numero domanda     #bdb6ea                          -> lilla chiaro
timer              rgba(255, 255, 255, 0.15)        -> bianco trasparente
timer ultimi 5s    sfondo #fde3e6, testo #c0303d    -> rosa pallido con testo rosso
bordo risposta     rgba(195, 175, 255, 0.55)        -> lilla trasparente
risposta hover     rgba(255, 255, 255, 0.14)        -> bianco trasparente
risposta GIUSTA    #43995a                          -> verde
risposta SBAGLIATA #b0343c                          -> rosso

RISULTATI - PASSATO
testo e spunta     #62d896                          -> verde chiaro
bordo cerchio      #4fe0a0                          -> verde acqua
sfondo cerchio     rgba(40, 150, 100, 0.18)         -> verde trasparente

RISULTATI - NON PASSATO
testo e croce      #ff6b78                          -> rosso chiaro 
bordo cerchio      #ff5c6c                          -> rosso acceso
sfondo cerchio     rgba(200, 50, 70, 0.18)          -> rosso trasparente

CERCHI E BOTTONE
riquadro cerchi    sfondo #120c40                   -> viola quasi nero
bordo rgba(160, 110, 255, 0.75)                     -> viola trasparente
etichette          #d3cdf2                          -> lilla molto chiaro
"Soglia: 60%"      #aaa3d6                          -> lilla grigio
cerchio %          #8c4dff -> #e03c95               -> da viola a rosa
parte vuota        #2b2468                          -> viola scuro
cerchio giuste     #43a864                          -> verde
cerchio sbagliate  #c93b45                          -> rosso
bottone RICOMINCIA #46ad6b -> #2f9158               -> da verde chiaro a verde scuro

DA RICORDARE
- sfumatura: linear-gradient(90deg, colore1, colore2)
- trasparenza: rgba(rosso, verde, blu, da 0 a 1)
- i cerchi con le percentuali facciamole con (conic-gradient), il resto lo mettiamo nel CSS