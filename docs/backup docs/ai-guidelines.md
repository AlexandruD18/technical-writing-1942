# Guida AI Prompt & Disclaimer – SLOT 4

## Progetto: “1942”

## 1. Scopo del Documento

Questo documento fornisce le linee guida su come utilizzare strumenti di intelligenza artificiale (AI) all’interno dello sviluppo del gioco “1942”.  
L’obiettivo è migliorare la produttività, garantire coerenza tecnica e stilistica, mantenere alta qualità e trasparenza.  
Gli strumenti AI possono supportare scrittura di codice, generazione di documentazione e automazione di task, ma ogni output va verificato e revisionato dal team.

## 2. Strumenti AI Autorizzati

- ChatGPT (o analoghi modelli linguistici) per generazione di documentazione tecnica, snippet di codice, spiegazioni concettuali.
- GitHub Copilot per completamenti inline in IDE (VS Code) e suggerimenti di codice.
- Qualsiasi altro tool AI approvato dal team (all’interno del repository) purché venga documentato l’uso e verificato manualmente.

## 3. Regole di Prompting Efficace

- Specifica sempre **cosa vuoi ottenere**, es. “Genera una funzione JavaScript che controlla la collisione tra proiettile e nemico nel gioco 1942”.
- Indica **linguaggio, tecnologia e contesto**: “Usa HTML5 Canvas, compatibilità mobile e desktop, target 60 FPS”.
- Definisci **output atteso e vincoli**: formato di funzione, commenti JSDoc, stile di codice (modulare, ES6).
- Includi sempre **controlli qualità**: “Assicurati che il codice sia testabile, commentato e segua l’architettura definita nello Slot 3”.
- Evita prompt vaghi o troppo generici: “Fammi il gioco completo” è da evitare.
- Mantieni un registro dei prompt usati: salva data, tool AI, prompt testuale, output generato.

## 4. Esempi Pratici

### 4.1 Prompt corretti

> “Scrivi in JavaScript una classe `PowerUp` che gestisca l’apparizione di bonus nel gioco “1942”, con proprietà tipo (`’velocità’`, `'fuoco’`), timer di durata e metodi `apply(player)` e `expire(player)`. Commenta con JSDoc, mantieni la compatibilità Canvas API.”

### 4.2 Prompt da evitare

> “Fammi tutto il codice del gioco ‘1942’, includendo grafica, suoni e backend.”  
> Questo tipo di prompt genera output troppo estesi, non specifici e difficili da revisionare.

## 5. Revisione e Controllo Qualità

- Ogni frammento di codice generato via AI **non va inserito direttamente** nel branch principale senza verifica.
- Il team deve destinare una sessione di revisione: test manuale, controllo del rispetto dell’architettura (Slot 3), verifica performance (60 FPS target) e compatibilità mobile/desktop.
- I commit devono documentare l’origine: es. “Funzione `checkCollision` generata con ChatGPT 2025-11-05, revisionata da [nome]”.
- Se l’output genera dipendenze esterne, librerie o stili non definiti nei requisiti (Slot 1 e Slot 2), il suggerimento va scartato o riscritto.

## 6. Disclaimer, Limiti e Responsabilità

- Gli strumenti AI forniscono **proposte**, non garanzie. Il team è responsabile del codice finale, della qualità e della coerenza con i requisiti tecnici.
- Non affidarti all’AI per componenti critici (es. logica collisioni, performance ottimizzate) senza revisione approfondita.
- Documenta sempre gli output AI: prompt usati, versione del modello, data, tool. Questa trasparenza aiuta in caso di bug o ristrutturazioni future.
- Non utilizzare l’AI per generare asset protetti da copyright o che non rispettino licenze open.
- Mantieni backup del repository senza output AI non verificato o instabile.

## 7. Deliverable Slot 4

- File `docs/ai-prompt-guidelines.md` contenente questa guida.
- Cartella `/docs/ai-prompts/` con esempi effettivi di prompt + output + revisione (prima versione).
- Registro commit nel repository che documenta utilizzo AI da questo punto in avanti.
