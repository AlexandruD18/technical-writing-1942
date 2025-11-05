# 🛠 Documento SLOT 3 – Analisi Tecnica

## Progetto: “1942”

---

## 1. Scopo del Documento

Descrivere le scelte tecniche, l’architettura del progetto e la struttura del codice necessarie per sviluppare il videogioco “1942”.  
Questo documento traduce le funzionalità definite nello Slot 2 in componenti tecnici chiari e implementabili.

---

## 2. Stack Tecnologico

### 2.1 Frontend

- **Linguaggi:** HTML5, CSS3, JavaScript.
- **Motore grafico:** Canvas API per il rendering 2D del gioco.
- **Librerie aggiuntive:** opzionale uso di `GSAP` per animazioni e `Howler.js` per la gestione audio.

### 2.2 Backend

- Non necessario per la versione base.
- Eventuale estensione futura con backend Node.js per classifiche online e salvataggio punteggi.

### 2.3 Strumenti di sviluppo

- **Editor:** Visual Studio Code.
- **Controllo versione:** Git + GitHub (repository `technical-writing-1942`).
- **Testing:** Browser Chrome e Firefox (desktop e mobile).

---

## 3. Architettura del Gioco

### 3.1 Struttura File

```
/technical-writing-1942
│
├── /docs/                     → Documentazione di progetto
├── /assets/                   → Immagini, sprite, suoni
├── /src/                      → Codice sorgente
│   ├── main.js                → Inizializzazione del gioco
│   ├── game.js                → Logica principale (loop, update, render)
│   ├── player.js              → Gestione dell’aereo del giocatore
│   ├── enemy.js               → Gestione dei nemici
│   ├── bullet.js              → Gestione proiettili
│   ├── powerup.js             → Gestione bonus
│   ├── ui.js                  → Gestione HUD e punteggi
│   └── collision.js           → Controllo collisioni
└── index.html                 → Schermata principale
```

### 3.2 Modello di Architettura

**Pattern:** “Entity-Component-System” semplificato.  
Ogni entità (giocatore, nemico, proiettile, power-up) è un oggetto con proprietà e metodi indipendenti.  
Un **Game Loop** centrale gestisce il ciclo `update()` e `render()` a ogni frame.

---

## 4. Strutture Dati Principali

### 4.1 Stato Globale

```js
const gameState = {
  player: { x: 200, y: 400, lives: 3, score: 0 },
  enemies: [],
  bullets: [],
  powerups: [],
  level: 1,
  isPaused: false,
};
```

### 4.2 Oggetto Giocatore

```js
class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 5;
    this.lives = 3;
    this.score = 0;
  }
  move(direction) {
    /* aggiorna posizione */
  }
  shoot() {
    /* genera un proiettile */
  }
}
```

### 4.3 Oggetto Nemico

```js
class Enemy {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.health = 1;
  }
  update() {
    /* movimento verticale */
  }
}
```

---

## 5. Logica di Gioco (Implementazione Tecnica)

### 5.1 Ciclo di Gioco

- **update():** aggiorna posizione degli oggetti, controlla collisioni, gestisce vite e punteggio.
- **render():** disegna su Canvas tutti gli elementi del frame.
- **requestAnimationFrame():** assicura fluidità (target 60 FPS).

### 5.2 Collisioni

Controllo con distanza euclidea semplificata:

```js
function checkCollision(a, b) {
  return Math.abs(a.x - b.x) < 20 && Math.abs(a.y - b.y) < 20;
}
```

### 5.3 Gestione Input

- Desktop → eventi `keydown` e `keyup`.
- Mobile → touch event (`touchstart`, `touchmove`).  
  Gli input vengono convertiti in azioni (muovi, spara, pausa).

### 5.4 Sistema di Punteggio

Incremento punteggio alla distruzione dei nemici.  
Visualizzazione dinamica nell’HUD con:

```js
document.getElementById("score").textContent = gameState.player.score;
```

---

## 6. Interfaccia e Rendering

### 6.1 Canvas

- Dimensione base: 480x640 px.
- Sfondo statico o scorrimento continuo (scroll background).
- Sprites per aereo, nemici e proiettili caricati con `Image()`.

### 6.2 HUD (Heads-Up Display)

- Mostra vite, livello e punteggio.
- Aggiornato in tempo reale a ogni frame.

### 6.3 Audio

- Effetti gestiti da `Howler.js` (spari, esplosioni, power-up).
- Musica in loop a basso volume, disattivabile dal menu.

---

## 7. Prestazioni e Ottimizzazione

- Limitare il numero di oggetti attivi nel frame.
- Riutilizzare proiettili e nemici con “object pooling”.
- Ridurre il numero di ridisegni sul Canvas.
- Mantenere frame rate minimo di 60 FPS.

---

## 8. Sicurezza e Manutenzione

- Validazione input da tastiera e touch per evitare bug.
- Codice organizzato in moduli e funzioni pure.
- Commenti JSDoc per ogni funzione principale.
- Controllo versioni tramite commit giornalieri con messaggi chiari.

---

## 9. Deliverable Slot 3

- Documento tecnico completo in Markdown.
- Diagramma logico delle classi e del flusso di gioco.
- Descrizione di stack, architettura e strutture dati.
- Linee guida per l’ottimizzazione e la manutenzione.

---

## 10. Conclusione

Lo **Slot 3** fornisce le basi tecniche per iniziare lo sviluppo concreto di “1942”.  
Tutti i componenti software sono ora definiti in modo chiaro e pronti per essere implementati nel codice sorgente.
