const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');
const mime = require('mime-types') || { lookup: () => 'application/octet-stream' };

// Configurazione
const config = {
  port: 5501,
  root: path.join(__dirname, 'out'),
  defaultPage: 'index.html',
  baseRoute: '/Dolcelaguna'
};

// Log utili
const logInfo = (msg) => console.log(`\x1b[32m[INFO]\x1b[0m ${msg}`);
const logError = (msg) => console.log(`\x1b[31m[ERROR]\x1b[0m ${msg}`);

// Server HTTP
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  let pathname = parsedUrl.pathname;
  
  // Gestione dei redirect e delle rotte
  if (pathname === '/' || pathname === '/index.html') {
    pathname = `${config.baseRoute}/index.html`;
  } else if (pathname.startsWith(config.baseRoute)) {
    // Mantieni il percorso così com'è se già inizia con /Dolcelaguna
  } else if (!pathname.includes('.')) {
    // Se non è specificata un'estensione, trattalo come rotta e reindirizza a index.html
    pathname = `${config.baseRoute}${pathname}/index.html`;
  }
  
  // Rimuovi /Dolcelaguna dal percorso quando si cerca nel filesystem
  const fsPath = pathname.startsWith(config.baseRoute) 
    ? path.join(config.root, pathname.substr(config.baseRoute.length)) 
    : path.join(config.root, pathname);
  
  // Log della richiesta
  logInfo(`${req.method} ${pathname} => ${fsPath}`);

  // Verifica se il file esiste
  fs.stat(fsPath, (err, stats) => {
    if (err || !stats.isFile()) {
      // File non trovato, prova con index.html
      if (pathname.endsWith('/')) {
        const indexPath = path.join(fsPath, config.defaultPage);
        fs.stat(indexPath, (err, stats) => {
          if (err || !stats.isFile()) {
            // Fallback all'index principale
            serveFile(res, path.join(config.root, config.defaultPage));
          } else {
            serveFile(res, indexPath);
          }
        });
      } else {
        // Fallback all'index principale
        serveFile(res, path.join(config.root, config.defaultPage));
      }
    } else {
      // Servi il file
      serveFile(res, fsPath);
    }
  });
});

// Funzione per servire un file
function serveFile(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
      logError(`Errore nel leggere il file: ${err.message}`);
      return;
    }
    
    const mimeType = mime.lookup(filePath) || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mimeType });
    
    // Aggiungi header per prevenire la cache durante lo sviluppo
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    
    res.end(data);
  });
}

// Avvio del server
server.listen(config.port, () => {
  logInfo(`Server in esecuzione su http://localhost:${config.port}`);
  logInfo(`Servendo file dalla directory: ${config.root}`);
});