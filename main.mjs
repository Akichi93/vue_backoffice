// main.mjs
import { app, BrowserWindow } from 'electron';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
console.log('Directory name:', __dirname);
const isDev = process.env.NODE_ENV === 'development';

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, 'preload.js') // Vous pouvez créer un fichier preload.js si nécessaire
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); // Assurez-vous que le port correspond à celui utilisé par Vite
    mainWindow.webContents.openDevTools(); // Ouvrir les outils de développement en mode dev
  } else {
    const indexPath = `file://${join(__dirname, 'dist', 'index.html')}`;
    console.log('Index path:', indexPath); // Log the index path
    mainWindow.loadURL(indexPath);
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
