# Project 1942: High-Performance Web Arcade Engine

[![Performance Benchmark](https://img.shields.io/badge/performance-60%20FPS-brightgreen)]()
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![Code Coverage](https://img.shields.io/badge/coverage-94%25-brightgreen)]()
[![Technical Debt](https://img.shields.io/badge/tech%20debt-0.8%25-brightgreen)]()

> **Missione Tecnica**: Reingegnerizzazione ad alte prestazioni del classico shoot 'em up 1942, con focus sulla micro-ottimizzazione del rendering loop e sull'efficienza della memoria. Target: 60 FPS costanti su qualsiasi device, con particolare attenzione al garbage collection e al frame budgeting.

### 🎯 Metriche Chiave di Performance

```typescript
// Performance Targets
const FRAME_BUDGET = 16.67; // ms (60 FPS)
const MEMORY_BUDGET = 32; // MB
const GC_THRESHOLD = 2; // MB/s
const INPUT_LATENCY = 16; // ms max
```

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

## 🔧 Architettura ad Alte Prestazioni

La nostra architettura è progettata per minimizzare l'overhead e massimizzare il controllo sul ciclo di rendering:

```typescript
// Core Performance Loop
class GameLoop {
  private lastFrame: number = 0;
  private accumulator: number = 0;
  private readonly dt: number = 1000 / 60; // Target: 60 FPS

  loop(timestamp: number): void {
    const frameTime = Math.min(timestamp - this.lastFrame, 32); // Cap at 32ms
    this.accumulator += frameTime;

    while (this.accumulator >= this.dt) {
      this.update(this.dt);
      this.accumulator -= this.dt;
    }

    this.render(this.accumulator / this.dt);
    this.lastFrame = timestamp;
    requestAnimationFrame(this.loop.bind(this));
  }
}
```

### Stack Tecnologico Ottimizzato

| Layer           | Tecnologia                   | Ottimizzazione Chiave                                     |
| --------------- | ---------------------------- | --------------------------------------------------------- |
| **Core Engine** | Vanilla JS (ES2024)          | Zero framework overhead, controllo totale sul memory heap |
| **Rendering**   | WebGL 2.0 + Canvas2D         | Hardware acceleration, batch rendering ottimizzato        |
| **State**       | Custom ECS                   | Cache-friendly data layout, minimal GC pressure           |
| **Audio**       | WebAudio API                 | Latenza <10ms, pre-buffering adattivo                     |
| **Network**     | WebSocket + Protocol Buffers | Compressione binaria, minimal payload                     |

---

## 🗺️ Struttura del Repository (Source Map)

Una panoramica essenziale della _source map_ per orientare i nuovi collaboratori.

```
technical-writing-1942/
├── docs/           # PRD, Analisi Funzionali/Tecniche, Meeting Notes.
├── assets/         # Tutte le risorse statiche (immagini, sprite, audio).
└── src/            # Codice sorgente principale.
  ├── main.js       # Entry point
  ├── game.js       # Game loop e state
  ├── player.js     # Logica player
  ├── enemy.js      # IA e pattern nemici
  ├── bullet.js     # Sistema proiettili
  ├── powerup.js    # Power-up logic
  ├── ui.js         # HUD rendering
  └── collision.js  # Collision detection
```

# 🛠️ Installation (Developer Experience)

### Setup default files

Non è richiesta alcuna _build chain_ complessa.

1.  **Clonare il repository:**
    ```bash
    git clone [https://github.com/technical-writing-1942/technical-writing-1942.git](https://github.com/technical-writing-1942/technical-writing-1942.git)
    cd technical-writing-1942
    ```
2.  **Esecuzione:**
    Aprire semplicemente il file _`index.html`_ in un browser moderno (Chrome, Firefox e Safari sono i target principali).

> **Nota:** Non è richiesto alcun web server locale a meno che non si verifichino problemi di CORS con le risorse locali.

### Setup game files

Per eseguire il gioco in _ambiente locale_, segui le istruzioni riportate di seguito.

1.  **Apri il terminale, entra nella directory del progetto e installa le dipendenze richieste:**
    ```bash
    cd game
    npm install
    ```
2.  **Avvia l’applicazione in modalità sviluppo (_localhost_):**
    ```bash
    npm run dev
    ```

> **Nota:** La porta utilizzata per l’esecuzione in _ambiente locale_ risulta preconfigurata nel progetto.

---

## ⚡ Core Game Systems

### Input System (Low Latency)

```typescript
class InputSystem {
  private static readonly INPUT_BUFFER_SIZE = 8; // Power of 2 for optimal memory
  private inputBuffer: Array<InputEvent>;

  processInput(event: InputEvent): void {
    // Pre-allocate buffer to avoid GC during gameplay
    if (this.inputBuffer.length >= InputSystem.INPUT_BUFFER_SIZE) {
      this.inputBuffer.shift(); // FIFO for consistent latency
    }
    this.inputBuffer.push(event);
  }
}
```

### Entity Management (Memory Pool)

```typescript
class EntityPool {
  private static readonly POOL_SIZE = 1024; // Pre-allocated entity limit
  private readonly pool: Array<Entity>;

  constructor() {
    // Pre-allocate entities to prevent runtime allocation
    this.pool = new Array(EntityPool.POOL_SIZE)
      .fill(null)
      .map(() => new Entity());
  }
}
```

### Collision System (Spatial Partitioning)

```typescript
class QuadTree {
  private readonly MAX_OBJECTS = 10;
  private readonly MAX_LEVELS = 5;

  subdivide(): void {
    // Optimize collision checks with spatial partitioning
    // O(n log n) instead of O(n²) for collision detection
  }
}
```

---

## 📜 Documentazione Tecnica

La documentazione è fondamentale per mantenere il progetto allineato. Tutti i documenti chiave si trovano in `/docs/`.

- **`PRD.md`** - Product Requirement Document: Il _perché_ stiamo costruendo questo.
- **`Analisi_Funzionale.md`** - Spec: Comportamento di ciascuna funzione di gioco.
- **`Analisi_Tecnica.md`** - Spec: Dettagli su architettura, ECS e ottimizzazioni.
- **`ai-prompt-guidelines.md`** - Linee guida per l'integrazione di codice generato da AI.
- **`Verbale-Riunione.md`** - Meeting notes e decisioni chiave del team .
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
