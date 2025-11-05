# 📅 Verbale di Riunione – SLOT 5

## Progetto: “1942”

**Gruppo D – [05-11-2025]**
q

---

## 1. Partecipanti

- Avogadro Emanuele
- Dimofte Alexandru Mihai
- Ennassiri Soufian
- Esposito Andrea

Ruoli principali:

- **Capogruppo:** [Avogadro Emanuele]
- **Responsabile Tecnico:** [Esposito Andrea]
- **Responsabile Documentazione:** [Tutti i partecipanti]
- **Designer Grafico:** [Dimofte Alexandru Mihai]
- **Tester:** [Ennassiri Soufian]

---

## 2. Attività Svolte (Riepilogo Slot)

| Slot | Documento                          | Obiettivo Raggiunto                                   |
| ---- | ---------------------------------- | ----------------------------------------------------- |
| 1    | PRD – Product Requirement Document | Definiti obiettivi, target e requisiti base.          |
| 2    | Analisi Funzionale                 | Descritte logiche di gioco, flussi e interazioni.     |
| 3    | Analisi Tecnica                    | Scelte architetturali e stack tecnologico completati. |
| 4    | Guida AI Prompt & Disclaimer       | Create linee guida per uso AI nel progetto.           |

---

## 3. Decisioni Prese

- Stack tecnologico definitivo: **HTML5 + CSS3 + JavaScript**.
- Librerie approvate: **GSAP** (animazioni), **Howler.js** (audio).
- Architettura: **Entity-Component-System semplificato**.
- Sistema di versionamento: **GitHub con commit giornalieri e Pull Request**.
- Obiettivo MVP: movimento, sparo, nemici, collisioni, punteggio e fine partita.

---

## 4. Problemi Riscontrati e Soluzioni

| Problema                                  | Soluzione Adottata                                                        |
| ----------------------------------------- | ------------------------------------------------------------------------- |
| Lag nel rendering dei proiettili          | Applicato sistema di **object pooling** per ridurre il carico sul Canvas. |
| Difficoltà nella gestione audio su mobile | Integrato **Howler.js** con ritardo compensato per la riproduzione.       |

---

## 5. Action Items (Prossimi Passi)

| Assegnato a | Compito                               | Scadenza Simulata |
| ----------- | ------------------------------------- | ----------------- |
| [Nome 1]    | Implementare boss di fine livello     | [Data]            |
| [Nome 2]    | Ottimizzare gestione proiettili       | [Data]            |
| [Nome 3]    | Aggiornare documentazione tecnica     | [Data]            |
| [Nome 4]    | Creare animazioni esplosioni con GSAP | [Data]            |
| [Nome 5]    | Testare performance su mobile         | [Data]            |

---

## 6. Note di Revisione

- Migliorare leggibilità codice con commenti.
- Aggiungere logica di pausa in mobile.
- Verificare coerenza dei nomi file nel repository `/src/`.
- Revisionare interfaccia HUD (punteggio e vite).

---

## 7. Deliverable Slot 5

- File `docs/verbale-riunione.md` compilato e caricato.
- Repository aggiornato con commit coerenti alle attività.
- Registro problemi e soluzioni completato.
- Azioni assegnate e scadenze simulate definite.

---

## 8. Conclusione

Il gruppo D ha completato tutte le fasi previste nel ciclo di vita del progetto “1942”.  
Il documento riassume decisioni tecniche, risultati ottenuti e attività future per lo sviluppo completo del gioco.
