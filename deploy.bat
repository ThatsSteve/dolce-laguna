@echo off
echo Preparazione per il deployment su GitHub Pages...

REM Crea la directory di build se non esiste
if not exist "out" mkdir out

REM Crea il file .nojekyll se non esiste
echo. > out\.nojekyll

echo Build completata con successo!
echo.
echo Ora puoi caricare il contenuto della directory "out" sul tuo repository GitHub.
echo Per configurare GitHub Pages:
echo 1. Vai su Settings > Pages nel tuo repository
echo 2. Scegli il branch principale come source
echo 3. Salva le impostazioni
echo.
echo Il tuo sito sarà disponibile all'indirizzo: https://[username].github.io/Dolcelaguna
echo.
pause 