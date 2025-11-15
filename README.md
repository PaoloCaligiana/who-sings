# 🎵 Who Sings — Musixmatch React Engineering Test

Who Sings è un quiz game sviluppato in React che utilizza le API di Musixmatch.  
Il giocatore deve indovinare quale artista canta una determinata linea di testo, ottenuta dalle lyrics.  
Il gioco assegna punti, salva le ultime partite, e mostra anche una classifica dei punteggi migliori.

Live Demo: **[Coming soon..]**

---

## 🚀 Tecnologie utilizzate

- **React + Vite**
- **Tailwind CSS v4** (con tema personalizzato)
- **React Router**
- **Musixmatch API**
- **LocalStorage** per persistenza lato client
- **Firebase Hosting** per la demo

---

## 🎮 Funzionalità principali

### 🧩 Gameplay
- Visualizzazione di **una linea di lyrics**
- Scelta tra **3 artisti** (1 corretta + 2 random)
- Gestione punteggio
- Passaggio automatico alla domanda successiva
- Fine partita dopo **N domande**
- **Timer countdown** opzionale (Nice-to-have implementato)

### 👤 Utente
- Inserimento del nome prima di iniziare a giocare  
- Possibilità di fare **log-out** per cambiare giocatore  
- Storico delle ultime N partite giocate dall’utente  
- Persistenza in localStorage

### 🏆 Classifica (Highscores)
- Archivio locale dei punteggi migliori
- Classifica ordinata per punteggio
- UI ottimizzata per mobile

---

## 📚 Architettura del progetto

