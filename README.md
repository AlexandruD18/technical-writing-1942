## 🚀 1942: RIVISITAZIONE WEB ARCADE - PROJECT `ACME`

> **Progetto:** `1942-web-arcade` - Sviluppo di un _shmup_ (Shoot 'Em Up) verticale, fedele all'originale e ottimizzato per il browser moderno. L'obiettivo primario è la **Performance (60 FPS)** e la **Fedeltà al Gameplay**.

| Status & Release                                   | Build Health                                                                                                                                                | Versione                                                                                                                    |
| :------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| **Stato Progetto:** `MVP Defined`                  | [![GitHub Issues](https://img.shields.io/github/issues/AlexandruD18/technical-writing-1942)](https://github.com/AlexandruD18/technical-writing-1942/issues) | [![Tag](https://img.shields.io/badge/version-v1.0.0-blue)](https://github.com/AlexandruD18/technical-writing-1942/releases) |
| **Focus Attuale (Slot 6):** `QA & Critical Review` |                                                                                                                                                             | **Ultimo Update:** `2025-11-05`                                                                                             |

---

## 🧭 Sommario (Quick Navigation)

- [**Architettura Core**](#-architettura-core-stack-tecnologico)
- [**Struttura Repository**](#-struttura-del-repository-source-map)
- [**Installation & Setup**](#-installation-e-setup-developer-experience)
- [**Logiche di Gioco**](#-logiche-di-gioco-game-mechanics)
- [**Documentazione Tecnica**](#-documentazione-tecnica)
- [**Contribuire (Guidelines)**](#-contribuire-contribution-guidelines)
- [**Team**](#-team-di-sviluppo-core-contributors)

---

## 🏗️ Architettura Core (Stack Tecnologico)

Questo progetto è basato su un'architettura **Vanilla Frontend** leggera, pensata per il massimo controllo sulla performance e sul _game loop_.

| Categoria          | Tecnologia (Rationale)               | Funzione Chiave                                                                                                  |
| :----------------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------- |
| **Core**           | `HTML5`, `CSS3`, `JavaScript (ES6+)` | Base del progetto. **Zero Framework Overhead**.                                                                  |
| **Rendering**      | **Canvas API** (Native)              | Gestione di tutta la grafica 2D per il _game loop_ a **60 FPS**.                                                 |
| **Animazione**     | `GSAP` (GreenSock)                   | Micro-animazioni fluide e _tweening_ per UI/effetti speciali.                                                    |
| **Audio Engine**   | `Howler.js`                          | Gestione cross-browser di effetti sonori e musica di sottofondo.                                                 |
| **Design Pattern** | **Entity-Component-System (ECS)**    | Architettura scalabile e disaccoppiata per la gestione degli _asset_ di gioco. _Cruciale per la manutenibilità_. |

---

## 🗺️ Struttura del Repository (Source Map)

Una panoramica essenziale della _source map_ per orientare i nuovi collaboratori.

```
technical-writing-1942/
├── docs/           # PRD, Analisi Funzionali/Tecniche, Meeting Notes.
├── assets/         # Tutte le risorse statiche (immagini, sprite, audio).
└── src/            # Codice sorgente principale.
  ├── main.js      # Entry point
  ├── game.js      # Game loop e state
  ├── player.js    # Logica player
  ├── enemy.js     # IA e pattern nemici
  ├── bullet.js    # Sistema proiettili
  ├── powerup.js   # Power-up logic
  ├── ui.js        # HUD rendering
  └── collision.js # Collision detection
```

## 🛠️ Installation e Setup (Developer Experience)

Non è richiesta alcuna _build chain_ complessa.

1.  **Clonare il repository:**
    ```bash
    git clone [https://github.com/technical-writing-1942/technical-writing-1942.git](https://github.com/technical-writing-1942/technical-writing-1942.git)
    cd technical-writing-1942
    ```
2.  **Esecuzione:**
    _Aprire semplicemente il file `index.html`_ in un browser moderno (Chrome, Firefox e Safari sono i target principali).

> **Nota:** Non è richiesto alcun web server locale a meno che non si verifichino problemi di CORS con le risorse locali.

---

## 🎮 Logiche di Gioco (Game Mechanics)

Dettaglio delle interazioni utente e delle meccaniche centrali.

### Sistema di Controllo (Input)

| Piattaforma   | Funzione             | Input (Desktop)          | Input (Mobile/Touch)     |
| :------------ | :------------------- | :----------------------- | :----------------------- |
| **Movimento** | Spostamento velivolo | `WASD` / `Tasti Freccia` | Drag & Touch Move        |
| **Sparo**     | Fuoco primario       | `Spazio`                 | Single Tap sullo schermo |
| **Pausa**     | Game State: Paused   | `Invio` / `P`            | Pulsante UI dedicato     |

### Core Mechanics

- **Game Loop:** Interazione basata su `requestAnimationFrame()`, target **60 FPS** costanti.
- **Nemici (Entities):**
  - **Caccia Base:** _Enemy Type 1_ (1 HP). Pattern: Verticale _fixed-path_.
  - **Bombardiere:** _Enemy Type 2_ (3 HP). Pattern: Diagonale, richiede un _tracking_ più dinamico.
- **Power-Ups (Components):**
  - **🔥 Potenziamento Fuoco:** `Duration: 15s`. Aumenta il rateo di fuoco o il numero di proiettili.
  - **🛡️ Scudo:** `Duration: 10s`. Immunità temporanea ai danni.

---

## 📜 Documentazione Tecnica

La documentazione è fondamentale per mantenere il progetto allineato. Tutti i documenti chiave si trovano in `/docs/`.

- **`PRD.md`** - Product Requirement Document: Il _perché_ stiamo costruendo questo.
- **`Analisi_Funzionale.md`** - Spec: Comportamento di ciascuna funzione di gioco.
- **`Analisi_Tecnica.md`** - Spec: Dettagli su architettura, ECS e ottimizzazioni.
- **`ai-prompt-guidelines.md`** - Linee guida per l'integrazione di codice generato da AI.
- **`Verbale-Riunione.md`** - Meeting notes e decisioni chiave del team.
- **`Revisione.md`** - QA Report e Bug Tracking formale.

---

## 🤝 Contribuire (Contribution Guidelines)

Se desideri contribuire al progetto, segui queste linee guida per garantire la qualità del codice:

- **Code Standard:** Aderire strettamente allo standard **ES6+**. Utilizzare variabili `const`/`let` e funzioni _arrow_ quando appropriato.
- **Git Flow:** Utilizzare un flusso di lavoro basato su _feature branches_ e `Pull Requests`.
- **Commit Message:** I messaggi di commit devono essere **descrittivi** e seguire il pattern `[FEAT/FIX/DOCS]: Breve descrizione dell'impatto`.
- **AI Code:** Il codice generato tramite tool AI deve essere **sempre** revisionato e convalidato dal Tech Lead o da un altro contributor.

---

## 👥 Team di Sviluppo (Core Contributors)

| Ruolo               | Nome e Cognome          | Responsabilità Principale                           |
| :------------------ | :---------------------- | :-------------------------------------------------- |
| **Project Manager** | Avogadro Emanuele       | Roadmap, Scheduling, Risk Management.               |
| **Tech Lead**       | Esposito Andrea         | Architettura, Performance Tuning, Code Review.      |
| **UI/UX Designer**  | Dimofte Alexandru Mihai | Design (Pixel Art), Esperienza Utente, Interfaccia. |
| **QA Engineer**     | Ennassiri Soufian       | Test E2E, Bug Hunting, QA Reporting.                |

---

_Questo documento è soggetto a revisione continua. Ultimo aggiornamento: 2025-11-05._
