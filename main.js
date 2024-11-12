// main.js

const { app, BrowserWindow, Menu } = require('electron');

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false, // Enable access to Node.js APIs in your app
        }
    });

    Menu.setApplicationMenu(null);

    win.loadFile('index.html');
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit the app when all windows are closed (except on macOS).
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
