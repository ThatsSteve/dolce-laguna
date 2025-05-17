

Website for Dolce Laguna hotel.

## Tutorial per la pubblicazione su GitHub Pages

Segui questi passi per pubblicare automaticamente il sito su GitHub Pages:

### 1️⃣ Crea un repository su GitHub

1. Vai su [GitHub](https://github.com) e accedi al tuo account
2. Clicca sul pulsante "+" in alto a destra e seleziona "New repository"
3. Nome repository: `Dolcelaguna` (esattamente così, rispettando maiuscole/minuscole)
4. Scegli "Public" come visibilità
5. Clicca su "Create repository"

### 2️⃣ Carica il codice su GitHub

Apri il terminale nella cartella del progetto ed esegui:

```bash
# Inizializza git (se non già fatto)
git init

# Aggiungi tutti i file
git add .

# Crea il primo commit
git commit -m "Initial commit"

# Collega al repository remoto
git remote add origin https://github.com/TUO-USERNAME/Dolcelaguna.git

# Carica su GitHub
git push -u origin main
```

Sostituisci `TUO-USERNAME` con il tuo nome utente GitHub.

### 3️⃣ Configura GitHub Pages

1. Vai al tuo repository su GitHub
2. Clicca su "Settings" (in alto a destra)
3. Nella barra laterale, clicca su "Pages" (sotto la sezione "Code and automation")
4. Nella sezione "Build and deployment":
   - Source: seleziona "GitHub Actions"
5. Attendi che l'azione "Build e Deploy su GitHub Pages" venga completata

### ✅ Verifica

Il sito sarà disponibile all'indirizzo:
```
https://TUO-USERNAME.github.io/Dolcelaguna
```

### 📝 Note importanti

- Il workflow configurato in `.github/workflows/static.yml` si occupa automaticamente di:
  - Installare le dipendenze
  - Eseguire la build
  - Creare il file `.nojekyll`
  - Pubblicare il sito

- Per aggiornare il sito, basta modificare i file sorgente e fare push su GitHub:
  ```bash
  git add .
  git commit -m "Aggiornamento del sito"
  git push
  ```
  L'azione GitHub si occuperà automaticamente della build e del deployment. 