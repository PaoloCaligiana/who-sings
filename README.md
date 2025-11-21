# 🎵 Who Sings — Musixmatch React Engineering Test

### A Music Quiz Game Powered by Musixmatch API

**Who Sings?** è un quiz game interattivo costruito con **React 18**, **TypeScript**, **Tailwind CSS v4** e una architettura basata su hook custom, caching intelligente e localStorage.  
L’obiettivo: indovinare quale artista canta una _specifica riga di testo_ presa da canzoni reali, utilizzando le **Musixmatch API**.
Il gioco assegna punti e medaglie, mostra le statistiche e le ultime partite di sessione, e registra i migliori player del dispositivo in una classifica globale, assegnando titoli in base ai generi delle canzoni piu' azzeccate.
Disponibili due modalita' di quiz **Normal** e **Endless Mode**, in cui vengono selezionate automaticamente le tracce piu' popolari del Paese corrispondente alla lingua scelta dal giocatore:

lingua EN → chart UK/US
lingua IT → chart Italia
lingua ES → chart Spagna

Questo consente di generare quiz più rilevanti, familiari e contestualizzati per ogni utente.

---

## 🚀 Demo

👉 _**https://who-sings-ef1e8.web.app/**_

---

## 🛠️ Tech Stack & Architecture

### **Frontend**

- **React 18 + TypeScript**
- **Vite** (dev server + optimized build)
- **Tailwind CSS v4** (tema personalizzato + approccio utility-first)
- **React Router** (navigazione client-side)
- **Context API** per gestione lingua (i18n)
- **Firebase Hosting** (deploy demo production-ready)

---

### **Architecture**

- **Functional Components + Custom Hooks**
- **Separation of Concerns**: UI / quiz engine / storage / services
- **Factory Pattern** per storage riutilizzabile
- **Service Layer** (leaderboard, scoring, Musixmatch fetcher)
- **Caching intelligente** (chart tracks cache con TTL 24h)
- **Responsive Design System** integrato con Tailwind

---

### **Storage & Persistence**

- **localStorage**
  - Global leaderboard (ultime 500 partite)
  - Storico personali (ultime 500 partite)
  - Cache tracce musicali (TTL 24h)
- **sessionStorage**
  - Stato sessione in Endless Mode
  - Modalità quiz selezionata

---

## 🎮 Modalità di Gioco

### 🧩 Gameplay

- Visualizzazione di **una linea di lyrics**
- Scelta tra **3 artisti** (1 corretta + 2 random)
- Gestione punteggio
- Passaggio automatico alla domanda successiva
- Fine partita dopo **N domande**
- Si considera errore, superato il **Timer countdown**

### **1. Normal Mode**

- 7 domande fisse
- Score finale salvato automaticamente
- Risposte errate non terminano la partita
- Il Timer non termina la partita
- Streak che si azzera solo quando sbagli
- Schermata finale con: replay, profilo, leaderboard
- Messaggi celebrativi, se raggiunta prima posizione

### **2. Endless Mode (∞)**

- Round infiniti da 7 domande
- Il gioco termina al primo errore o timeout
- Superato il round, si puo' continuare o salvare
- Score cumulativo
- 14 messaggi motivazionali e celebrativi ciclici

---

## 🗄️ Data Architecture

### **localStorage**

| Storage key                   | Scopo              | Contenuto                          |
| ----------------------------- | ------------------ | ---------------------------------- |
| `pc-who-sings-global-scores`  | Classifica globale | Best score per giocatore           |
| `pc-who-sings-current-scores` | Storico personale  | Ultime 10 partite                  |
| `pc-who-sings-chart-tracks`   | Cache API          | Top 100 tracce (US/IT/ES), TTL 24h |
| `pc-who-sings-current-player` | Sessione Giocatore | Player che ha effettuato il login  |

### **sessionStorage**

| Storage key                      | Scopo                         | Contenuto                     |
| -------------------------------- | ----------------------------- | ----------------------------- |
| `pc-who-sings-quiz-mode`         | Modalita' di gioco scelta     | Normal / Endless              |
| `pc-who-sings-infinite-progress` | Dati per la modalita' endless | Score, streak, round corrente |

---

## 🎵 Quiz Engine

### **Generazione Domande**

- Fetch delle Top Chart (US, IT, ES)
- Selezione random di una traccia come risposta corretta
- Fetch di una riga del testo (cleaned)
- Generazione di 2 artisti alternativi
- Shuffle delle 3 opzioni
- Validazione unicità artisti

---

## 🏆 Badge & Achievements

| Badge          | Condizione            |
| -------------- | --------------------- |
| 🥉 First Play  | 1 partita             |
| 👑 High Roller | Score ≥ 9             |
| 🔥 Hot Streak  | ≥ 5 risposte corrette |

---

## 📊 Leaderboard

### Strategia: **bestScorePerPlayer**

- Una entry per giocatore (best score)
- Top 10
- Posizione con icone
- Nome, genere preferito, progress bar
- Titoli top 3:
  - **Legend of {genre}**
  - **Master of {genre}**
  - **Soul of {genre}**

---

## ☁️ Deploy

- Firebase Hosting
- CD aventitorio globale
- HTTPS auto-managed

---

## 📦 Installazione

```bash
git clone https://github.com/PaoloCaligiana/who-sings.git
cd who-sings
npm install
npm run dev
```
