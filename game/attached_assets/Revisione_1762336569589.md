# 📝 Documento SLOT 6 – Revisione Critica e Quality Assurance (QA)

## Progetto: “1942” – Stato Documentazione (Slot 1-5)

**Ruolo:** Esperto di Quality Assurance (QA)
**Data Revisione:** 05 Novembre 2025

---

## 1. Scorecard di Valutazione e Giudizio QA

Il gruppo ha prodotto una documentazione ben formattata in Markdown (**Chiarezza Eccellente**). Tuttavia, sono state rilevate gravi **lacune di completezza** e **incoerenze di tracciamento** (violazione dei Criteri 1 e 3) che avrebbero reso impossibile l'avvio della fase di implementazione (Slot 7).

Le seguenti correzioni (Modifiche Opportune) sono state **applicate** ai file per sanare queste criticità.

| Criterio di Valutazione (Rif. Esercitazione) | Giudizio Iniziale | Azione di QA Applicata                                                        |
| :------------------------------------------- | :---------------- | :---------------------------------------------------------------------------- |
| **Aderenza al Ciclo di Vita**                | Discreto          | **Corretta:** Allineamento del PRD e tracciamento del _major change_ tecnico. |
| **Chiarezza e Semplicità**                   | Eccellente        | **Approvato:** Linguaggio pulito e formattazione coerente.                    |
| **Completezza e Utilità**                    | Insufficiente     | **Corretta:** Aggiunte specifiche cruciali (Logica e Struttura Dati).         |

---

## 2. Dettaglio Criticità Rilevate e Modifiche Opportune Applicate

### 2.1 Criticità 1: Incoerenza Tecnica (Mancata Tracciabilità del Cambiamento)

**Problema:**
Il **PRD.md** (Slot 1) specificava inizialmente requisiti tecnici (`Unity` / `1942x1080`) in conflitto con la scelta finale adottata nell'**Analisi Tecnica** (`Canvas API/JavaScript` / `480x640`). Il cambio di stack non era stato giustificato o tracciato.

**Modifica Oportuna Applicata (`PRD.md` revisionato):**

- **Motore di sviluppo:** `Canvas API (JavaScript)`
- **Risoluzione base:** `480x640 px`
- _(Nota Aggiunta: Il Verbale di Riunione è stato integrato con la giustificazione di migrazione per maggiore controllo e leggerezza su mobile)._

### 2.2 Criticità 2: Carenza di Dettagli Funzionali (Logica di Gioco)

**Problema:**
L'**Analisi Funzionale** menzionava _Power-up_ e _Nemici_ senza fornire le **specifiche logiche** (es. durata dei bonus, pattern di movimento, punti vita dei nemici) essenziali per la programmazione.

**Modifica Oportuna Applicata (`Analisi_Funzionale.md` integrato):**

| Meccanica    | Dettaglio Logico Aggiunto                                                                                                                         |
| :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Power-Up** | 1. **Potenziamento di Fuoco:** Tripla il proiettile. Durata: 15 secondi o fino a 3 colpi subiti. 2. **Scudo:** Immunità ai danni per 10 secondi.  |
| **Nemici**   | 1. **Caccia Base:** 1 HP, sparo singolo. Pattern: Movimento verticale. 2. **Bombardiere:** 3 HP, sparo a ventaglio. Pattern: Movimento diagonale. |

### 2.3 Criticità 3: Assenza di Struttura Dati per l'Implementazione

**Problema:**
L'**Analisi Tecnica** (Slot 3) non includeva la sezione fondamentale sulla **Struttura Dati** interna (le Classi/Oggetti del gioco con le loro proprietà chiave: `health`, `speed`, `hitbox`, ecc.). Questa omissione impediva l'avvio della codifica.

**Modifica Oportuna Applicata (`Analisi_Tecnica.md` integrato):**

| Classe/Oggetto | Proprietà Chiave (Aggiunte)                                  | Metodi Chiave (Aggiunti)                                 |
| :------------- | :----------------------------------------------------------- | :------------------------------------------------------- |
| **Player**     | `x`, `y`, `health (3)`, `speed (5)`, `isPoweredUp`           | `move(dir)`, `shoot()`, `takeDamage()`, `applyPowerUp()` |
| **Enemy**      | `x`, `y`, `health`, `speed`, `scoreValue`, `movementPattern` | `move()`, `shoot()`, `checkCollision(obj)`               |
| **Projectile** | `x`, `y`, `damage`, `owner (Player/Enemy)`                   | `update()`, `isOffScreen()`                              |

### 2.4 Criticità 4: Incompletezza Tracciabilità (Action Items)

**Problema:**
Gli _Action Items_ nel `Verbale-Riunione.md` (Slot 5) erano privi di assegnatari e scadenze specifiche (`[Nome 1]`, `[Data]`), violando la tracciabilità delle responsabilità.

**Modifica Oportuna Applicata (`Verbale-Riunione.md` corretto):**

- Le voci sono state popolate con assegnazioni e scadenze simulate (es. `Andrea / 05-11-2025`).
