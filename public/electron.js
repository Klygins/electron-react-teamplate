const electron = require("electron");
const {
  app,
  BrowserWindow
} = electron;

const path = require("path");
const isDev = require("electron-is-dev");
const { ipcMain } = require("electron");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 820,
    height: 680,
    icon: '../public/icon.ico',
    webPreferences: {
      backgroundThrottling: false,
      preload: path.join(__dirname, 'electron-preload.js')
    }
  });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}

app.setAppUserModelId("Your app name")

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


ipcMain.handle("say-hello", (event, arg) => {
  console.log("Argument for 'say-hello' function:", arg)

  return "Hello from the main process: The app version is: " + app.getVersion();
})