# 🎮 Documento SLOT 2 – Analisi Funzionale

## Progetto: “1942”

---

## 1. Scopo del Documento

Definire in modo chiaro le **funzionalità di gioco**, i **comportamenti dell’utente** e le **interazioni principali** tra giocatore, interfaccia e ambiente.  
Questo documento traduce gli obiettivi del PRD in logiche operative e flussi di gioco.

---

## 2. Visione Generale

“1942” è uno sparatutto a scorrimento verticale in cui il giocatore pilota un aereo da caccia impegnato in battaglie aeree contro flotte nemiche.  
Ogni azione è immediata e il sistema di gioco si basa su controllo, riflessi e progressione del punteggio.

---

## 3. Flusso di Gioco

### 3.1 Sequenza Base

1. **Schermata iniziale:** mostra titolo, logo e pulsante “Start”.
2. **Fase di gioco:** inizia lo scorrimento verticale, il giocatore controlla il proprio aereo.
3. **Sistema di punteggio:** ogni nemico abbattuto assegna un valore in punti.
4. **Power-up:** occasionalmente compaiono bonus che aumentano velocità o potenza di fuoco.
5. **Boss finale di livello:** dopo un certo numero di nemici, appare un nemico più grande con più punti vita.
6. **Game over:** il gioco termina se il giocatore perde tutte le vite.
7. **Classifica:** mostra il punteggio e consente di ricominciare.

---

## 4. Comportamento del Giocatore

### 4.1 Controlli

- **Tastiera:**

  - Frecce direzionali → Movimento dell’aereo.
  - Spazio → Sparo.
  - Invio → Pausa.

- **Touchscreen:**
  - Trascinamento → Movimento.
  - Tap → Sparo.
  - Pulsante virtuale → Pausa.

### 4.2 Obiettivi del Giocatore

- Sopravvivere il più a lungo possibile.
- Abbattere il maggior numero di nemici.
- Raccogliere power-up per migliorare l’efficacia di fuoco.
- Ottenere un punteggio alto nella classifica finale.

---

## 5. Logiche di Gioco

### 5.1 Movimento

L’aereo del giocatore si muove all’interno dei confini dello schermo.  
La velocità aumenta leggermente ad ogni livello completato.

### 5.2 Nemici

- Appaiono dall’alto dello schermo.
- Seguono traiettorie predefinite o casuali.
- Possono sparare colpi diretti verso il giocatore.
- Alla distruzione, assegnano punti proporzionali alla difficoltà.

### 5.3 Collisioni

- Collisione tra proiettile e nemico → il nemico viene distrutto, +100 punti.
- Collisione tra aereo del giocatore e nemico/proiettile → perdita di una vita.
- Collisione con power-up → potenziamento attivo (velocità o fuoco).

### 5.4 Punteggio e Livelli

- Ogni nemico abbattuto assegna un punteggio.
- A determinati punteggi, il giocatore ottiene una vita extra.
- Dopo un numero definito di ondate, si passa al livello successivo.
- Ogni livello aumenta la velocità di movimento dei nemici e la frequenza dei colpi.

---

## 6. Interfaccia Utente (UI)

### 6.1 Elementi Principali

- **Score:** mostra il punteggio attuale.
- **Lives:** indica il numero di vite rimaste.
- **Level:** visualizza il livello in corso.
- **Pause/Menu:** pulsante per mettere in pausa o tornare al menu principale.

### 6.2 Feedback Visivo

- Esplosioni al contatto dei proiettili.
- Flash dell’aereo quando viene colpito.
- Effetto lampeggiante per power-up raccolto.

### 6.3 Feedback Sonoro

- Suono di sparo.
- Suono di esplosione.
- Jingle di vittoria o di game over.

---

## 7. Requisiti di Giocabilità

- Il frame rate deve restare stabile (minimo 60 FPS).
- Il tempo di risposta ai comandi deve essere inferiore a 0,1 secondi.
- La difficoltà deve crescere in modo progressivo.
- I controlli devono essere coerenti tra desktop e mobile.

---

## 8. Requisiti di Accessibilità

- Possibilità di regolare il volume e la luminosità.
- Testi e pulsanti leggibili anche su schermi piccoli.
- Contrasto elevato tra elementi di gioco e sfondo.

---

## 9. Deliverable Slot 2

- Documento di Analisi Funzionale completo.
- Definizione dei comportamenti di gioco e delle interazioni utente.
- Descrizione delle logiche principali (movimento, collisioni, punteggi).
- Specifica dell’interfaccia e dei feedback visivi/sonori.

---

## 10. Conclusione

Lo **Slot 2** traduce la visione generale del progetto in una struttura funzionale precisa.  
Tutti i membri del gruppo possono ora riferirsi a questo documento per la fase successiva di **Analisi Tecnica**, garantendo coerenza tra design e sviluppo.
